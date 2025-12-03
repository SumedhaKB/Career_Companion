import json
import firebase_admin
from firebase_admin import credentials, firestore

# -------------------------------------------
# FIREBASE INITIALIZATION (ADMIN SDK)
# -------------------------------------------
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# -------------------------------------------
# LOAD JSON QUESTIONS
# -------------------------------------------
with open("questions/infosys_aptitude.json", "r", encoding="utf-8") as f:
    data = json.load(f)

questions = data["questions"]

# Firestore path:
# questions → infosys → aptitude → aptitude_X
root = db.collection("questions").document("infosys").collection("aptitude")

print(f"Uploading {len(questions)} questions...\n")

for q in questions:
    doc_id = f"aptitude_{q['id']}"   # aptitude_1, aptitude_2 ...

    root.document(doc_id).set({
        "companyId": "infosys",
        "category": "aptitude",
        "question": q["question"],
        "options": q["options"],
        "correctAnswer": q["answer"],
        "difficulty": "medium",
        "explanation": "No explanation available"
    })

    print("Uploaded:", doc_id)

print("\n✔ DONE — All questions uploaded successfully!")
