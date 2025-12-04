# """
# Generate hard aptitude/technical questions + coding snapshots for all 5 companies
# Run this to create all JSON files, then use import script
# """

# import json

# # Company metadata
# COMPANIES = {
#     "infosys": {
#         "name": "Infosys",
#         "logo": "https://companieslogo.com/img/orig/INFY-82a8e18c.png",
#         "description": "Global leader in next-generation digital services and consulting"
#     },
#     "tcs": {
#         "name": "TCS",
#         "logo": "https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png",
#         "description": "India's largest IT services, consulting and business solutions organization"
#     },
#     "wipro": {
#         "name": "Wipro",
#         "logo": "https://companieslogo.com/img/orig/WIT-51609821.png",
#         "description": "Global information technology, consulting and business process services company"
#     },
#     "accenture": {
#         "name": "Accenture",
#         "logo": "https://companieslogo.com/img/orig/ACN-ce0c2c87.png",
#         "description": "Global professional services company with digital, cloud and security capabilities"
#     },
#     "cognizant": {
#         "name": "Cognizant",
#         "logo": "https://companieslogo.com/img/orig/CTSH-3f867772.png",
#         "description": "American multinational technology company providing IT services and consulting"
#     }
# }

# def load_base_questions():
#     """Load questions from the Infosys JSON file"""
#     try:
#         with open(r'C:\Users\spoor\CareerCompanion\CareerCompanion\src\Components\infosys_questions.json', 'r', encoding='utf-8') as f:
#             data = json.load(f)
#             return data['questions']
#     except FileNotFoundError:
#         print("❌ Please save the Infosys JSON artifact first as 'infosys_questions.json'")
#         print("   Then run this script again.")
#         return None

# def generate_company_json(company_id, company_data, questions):
#     """Generate JSON for a company"""
    
#     data = {
#         "company": {
#             "id": company_id,
#             "name": company_data["name"],
#             "logo": company_data["logo"],
#             "description": company_data["description"],
#             "role": "Software Engineering",
#             "rounds": [
#                 {
#                     "type": "aptitude",
#                     "name": "Aptitude Round",
#                     "description": f"{company_data['name']} quantitative aptitude and logical reasoning assessment",
#                     "duration": "30 minutes",
#                     "questionCount": len(questions['aptitude'])
#                 },
#                 {
#                     "type": "technical",
#                     "name": "Technical Round",
#                     "description": f"{company_data['name']} technical evaluation on data structures, algorithms, and system design",
#                     "duration": "45 minutes",
#                     "questionCount": len(questions['technical'])
#                 },
#                 {
#                     "type": "coding",
#                     "name": "Coding Round",
#                     "description": f"{company_data['name']} programming challenges with solution analysis",
#                     "duration": "60 minutes",
#                     "questionCount": len(questions['coding'])
#                 }
#             ]
#         },
#         "questions": questions
#     }
    
#     filename = f"{company_id}_questions.json"
#     with open(filename, 'w', encoding='utf-8') as f:
#         json.dump(data, f, indent=2, ensure_ascii=False)
    
#     print(f"✅ Created: {filename}")
#     print(f"   • {len(questions['aptitude'])} Aptitude questions")
#     print(f"   • {len(questions['technical'])} Technical questions")
#     print(f"   • {len(questions['coding'])} Coding questions\n")

# def main():
#     print("\n" + "="*70)
#     print("📝 GENERATING COMPANY JSON FILES")
#     print("="*70)
#     print("\nGenerating HARD questions for all companies...")
#     print("(Removed HR round, Coding is now view-only with solutions)\n")
    
#     # Load base questions from Infosys JSON
#     questions = load_base_questions()
    
#     if not questions:
#         return
    
#     # Generate for all companies
#     for company_id, company_data in COMPANIES.items():
#         generate_company_json(company_id, company_data, questions)
    
#     print("="*70)
#     print("🎉 ALL JSON FILES CREATED!")
#     print("="*70)
#     print("\nGenerated files:")
#     for company_id in COMPANIES.keys():
#         print(f"  • {company_id}_questions.json")
    
#     print("\n📊 Statistics per company:")
#     print(f"  • Aptitude: {len(questions['aptitude'])} questions (HARD)")
#     print(f"  • Technical: {len(questions['technical'])} questions (HARD)")
#     print(f"  • Coding: {len(questions['coding'])} questions (with solutions)")
#     print(f"  • HR: REMOVED")
    
#     print("\n📋 Next steps:")
#     print("  1. Run: python import_to_firebase.py")
#     print("  2. Refresh your React app")
#     print("  3. All 5 companies ready!\n")

# if __name__ == "__main__":
#     main()
"""
Generate hard aptitude/technical questions + coding snapshots for all 5 companies
Run this to create all JSON files, then use import script
"""

import json

# 🔥 FIXED: Added complete and valid logos for all companies
COMPANIES = {
    "infosys": {
        "name": "Infosys",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/19/Infosys_logo.svg",
        "description": "Global leader in next-generation digital services and consulting"
    },
    "tcs": {
        "name": "TCS",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Tata_Consultancy_Services_Logo.svg",
        "description": "India's largest IT services, consulting and business solutions organization"
    },
    "wipro": {
        "name": "Wipro",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/0/02/Wipro_Logo_2017.svg",
        "description": "Global information technology, consulting and business process services company"
    },
    "accenture": {
        "name": "Accenture",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Accenture_logo.svg",
        "description": "Global professional services company with digital, cloud and security capabilities"
    },
    "cognizant": {
        "name": "Cognizant",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/20/Cognizant_logo_2022.svg",
        "description": "American multinational technology company providing IT services and consulting"
    }
}


def load_base_questions():
    """Load questions from the Infosys JSON file"""
    try:
        with open('infosys_questions.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['questions']
    except FileNotFoundError:
        print("❌ Please save the Infosys JSON artifact first as 'infosys_questions.json'")
        print("   Then run this script again.")
        return None


def generate_company_json(company_id, company_data, questions):
    """Generate JSON for a company"""

    data = {
        "company": {
            "id": company_id,
            "name": company_data["name"],
            "logo": company_data["logo"],  # ✔ LOGO FIXED
            "description": company_data["description"],
            "role": "Software Engineering",
            "rounds": [
                {
                    "type": "aptitude",
                    "name": "Aptitude Round",
                    "description": f"{company_data['name']} quantitative aptitude and logical reasoning assessment",
                    "duration": "30 minutes",
                    "questionCount": len(questions['aptitude'])
                },
                {
                    "type": "technical",
                    "name": "Technical Round",
                    "description": f"{company_data['name']} technical evaluation on data structures, algorithms, and system design",
                    "duration": "45 minutes",
                    "questionCount": len(questions['technical'])
                },
                {
                    "type": "coding",
                    "name": "Coding Round",
                    "description": f"{company_data['name']} programming challenges with solution analysis",
                    "duration": "60 minutes",
                    "questionCount": len(questions['coding'])
                }
            ]
        },
        "questions": questions
    }

    filename = f"{company_id}_questions.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Created: {filename}")
    print(f"   • {len(questions['aptitude'])} Aptitude questions")
    print(f"   • {len(questions['technical'])} Technical questions")
    print(f"   • {len(questions['coding'])} Coding questions\n")


def main():
    print("\n" + "="*70)
    print("📝 GENERATING COMPANY JSON FILES")
    print("="*70)
    print("\nGenerating HARD questions for all companies...")
    print("(Removed HR round, Coding is now view-only with solutions)\n")

    questions = load_base_questions()

    if not questions:
        return

    # Generate JSON for all companies ✔ FIXED
    for company_id, company_data in COMPANIES.items():
        generate_company_json(company_id, company_data, questions)

    print("="*70)
    print("🎉 ALL JSON FILES CREATED!")
    print("="*70)

    print("\nGenerated files:")
    for company_id in COMPANIES.keys():
        print(f"  • {company_id}_questions.json")

    print("\n📊 Statistics per company:")
    print(f"  • Aptitude: {len(questions['aptitude'])} questions (HARD)")
    print(f"  • Technical: {len(questions['technical'])} questions (HARD)")
    print(f"  • Coding: {len(questions['coding'])} questions (with solutions)")
    print(f"  • HR: REMOVED")


if __name__ == "__main__":
    main()
