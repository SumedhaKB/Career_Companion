import json
import os
import firebase_admin
from firebase_admin import credentials, firestore

# -------------------------------------------
# FIREBASE INITIALIZATION (ADMIN SDK)
# -------------------------------------------
# Try a few likely locations for the service account key and provide
# a clear error if none are found.
base_dir = os.path.dirname(__file__)
candidate_files = [
    os.path.join(base_dir, "serviceAccountKey.json"),
    os.path.join(base_dir, "serviceAccountKey.json"),
    os.path.join(base_dir, "..", "serviceAccountKey.json"),
    os.path.join(base_dir, "..", "serviceAccountKey.json"),
    os.path.join(os.getcwd(), "serviceAccountKey.json"),
]

key_path = None
for p in candidate_files:
    if os.path.exists(p):
        key_path = os.path.normpath(p)
        break

if not key_path:
    tried = '\n'.join(candidate_files)
    raise FileNotFoundError(
        "serviceAccountKey.json not found. Tried the following paths:\n" + tried
    )

cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)

db = firestore.client()

# -------------------------------------------
# LOAD JSON QUESTIONS
# -------------------------------------------
# Use questions file path relative to this script so it works from any cwd
questions_path = os.path.join(base_dir, "..", "questions", "infosys_aptitude.json")
questions_path = os.path.normpath(questions_path)

if not os.path.exists(questions_path):
    raise FileNotFoundError(f"Questions file not found at: {questions_path}")

with open(questions_path, "r", encoding="utf-8") as f:
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
