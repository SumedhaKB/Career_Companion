# """
# Import all company questions to Firebase
# Handles: Aptitude (MCQ), Technical (MCQ), Coding (View-only with solutions)
# """

# import json
# import firebase_admin
# from firebase_admin import credentials, firestore

# # Initialize Firebase
# try:
#     cred = credentials.Certificate(r'C:\Users\spoor\CareerCompanion\CareerCompanion\serviceAccountKey1.json')
#     firebase_admin.initialize_app(cred)
#     db = firestore.client()
#     print("Firebase initialized\n")
# except:
#     try:
#         db = firestore.client()

#         print(" Firebase already initialized\n")
#     except:
#         print(" Firebase not available")
#         exit(1)

# def load_json_file(filename):
#     """Load questions from JSON file"""
#     try:
#         with open(filename, 'r', encoding='utf-8') as f:
#             return json.load(f)
#     except FileNotFoundError:
#         print(f"⚠️  File not found: {filename}")
#         return None
#     except json.JSONDecodeError as e:
#         print(f"❌ JSON error in {filename}: {e}")
#         return None

# def store_company(company_data):
#     """Store company metadata"""
#     try:
#         doc_ref = db.collection('companies').document(company_data['id'])
#         doc_ref.set(company_data)
#         print(f"✅ Stored company: {company_data['name']}")
#         return True
#     except Exception as e:
#         print(f"❌ Error storing company: {e}")
#         return False

# def store_questions(company_id, questions_data):
#     """Store all questions for a company"""
#     total = 0
    
#     for round_type in ['aptitude', 'technical', 'coding']:
#         if round_type in questions_data.get('questions', {}):
#             questions = questions_data['questions'][round_type]
            
#             for idx, question in enumerate(questions, 1):
#                 try:
#                     question['companyId'] = company_id
#                     doc_id = f"{round_type}_{idx}"
#                     doc_ref = db.collection('questions').document(company_id).collection(round_type).document(doc_id)
#                     doc_ref.set(question)
#                     total += 1
#                 except Exception as e:
#                     print(f"   ❌ Error storing question {doc_id}: {e}")
            
#             print(f"   ✓ {len(questions)} {round_type} questions")
    
#     return total

# def import_company(company_id, filename):
#     """Import one company"""
#     print(f"\n{'='*70}")
#     print(f"📁 IMPORTING: {company_id.upper()}")
#     print(f"{'='*70}\n")
#     print(f"File: {filename}")
    
#     data = load_json_file(filename)
    
#     if data:
#         if store_company(data['company']):
#             print()
#             total = store_questions(company_id, data)
#             print(f"\n✅ Total questions stored: {total}")
#             return total
    
#     return 0

# def import_all_companies():
#     """Import all companies"""
#     print("\n" + "="*70)
#     print("🚀 IMPORTING ALL COMPANIES TO FIREBASE")
#     print("="*70)
#     print("\nQuestion Types:")
#     print("  • Aptitude: MCQ format (4 options)")
#     print("  • Technical: MCQ format (4 options)")
#     print("  • Coding: View-only (question + solution)")
#     print("  • HR: REMOVED\n")
    
#     companies = {
#         'infosys': 'infosys_questions.json',
#         'tcs': 'tcs_questions.json',
#         'wipro': 'wipro_questions.json',
#         'accenture': 'accenture_questions.json',
#         'cognizant': 'cognizant_questions.json'
#     }
    
#     grand_total = 0
#     success_count = 0
    
#     for company_id, filename in companies.items():
#         total = import_company(company_id, filename)
#         if total > 0:
#             grand_total += total
#             success_count += 1
    
#     print("\n" + "="*70)
#     print("🎉 IMPORT COMPLETE!")
#     print("="*70)
#     print(f"\n📊 Summary:")
#     print(f"   Companies imported: {success_count}/{len(companies)}")
#     print(f"   Total questions: {grand_total}")
#     print(f"   Question types: Aptitude, Technical, Coding")
#     print(f"   HR questions: Removed as requested")
#     print("\n🎯 Your React app is now ready!")
#     print("   Refresh and start practicing!\n")

# def main():
#     print("\nOptions:")
#     print("1. Import all companies")
#     print("2. Import specific company")
    
#     choice = input("\nChoice (1 or 2): ").strip()
    
#     if choice == "1":
#         import_all_companies()
#     elif choice == "2":
#         print("\nCompanies:")
#         print("1. Infosys")
#         print("2. TCS")
#         print("3. Wipro")
#         print("4. Accenture")
#         print("5. Cognizant")
        
#         comp_choice = input("\nSelect company (1-5): ").strip()
#         companies = ['infosys', 'tcs', 'wipro', 'accenture', 'cognizant']
#         files = [f'{c}_questions.json' for c in companies]
        
#         try:
#             idx = int(comp_choice) - 1
#             import_company(companies[idx], files[idx])
#         except:
#             print("❌ Invalid choice")
#     else:
#         print("❌ Invalid choice")

# if __name__ == "__main__":
#     main()

import json
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate(r"C:\Users\spoor\CareerCompanion\CareerCompanion\serviceAccountKey1.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


COMPANY_IDS = ["infosys", "tcs", "wipro", "accenture", "cognizant"]


def upload_company(company_id):
    print(f"\n📤 Uploading: {company_id}")

    # Load JSON file
    filename = f"{company_id}_questions.json"
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    company_meta = data["company"]
    questions = data["questions"]

    # Upload company metadata
    db.collection("companies").document(company_id).set(company_meta)
    print("   ✔ Uploaded company metadata")

    # Upload questions in React-compatible structure
    questions_ref = db.collection("questions").document(company_id)
    for round_type, round_questions in questions.items():
        round_subcol = questions_ref.collection(round_type)
        for i, q in enumerate(round_questions):
            round_subcol.document(str(i)).set(q)
        print(f"   ✔ Uploaded {len(round_questions)} questions for {round_type}")

    print("   🎉 Completed company upload")



def main():
    print("\n============================================")
    print("🔥 STARTING FIREBASE IMPORT")
    print("============================================\n")

    for company_id in COMPANY_IDS:
        upload_company(company_id)

    print("\n============================================")
    print("🎉 ALL COMPANIES IMPORTED SUCCESSFULLY!")
    print("============================================\n")


if __name__ == "__main__":
    main()
