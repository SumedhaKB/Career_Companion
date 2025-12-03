import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep
import os

# -------------------------------
# SELENIUM SETUP
# -------------------------------
options = Options()
options.add_argument("--headless=new")  # new stable mode

driver = webdriver.Chrome(options=options)
driver.get("https://www.indiabix.com/aptitude/problems-on-trains/")
sleep(3)

# -------------------------------
# SCRAPING
# -------------------------------
question_blocks = driver.find_elements(By.CLASS_NAME, "bix-div-container")

data = {
    "company": "Infosys",
    "category": "Aptitude",
    "questions": []
}

for idx, block in enumerate(question_blocks[:10]):  
    try:
        # Extract question
        question = block.find_element(By.CLASS_NAME, "bix-td-qtxt").text.strip()

        # Extract options
        options_list = [opt.text.strip() 
                        for opt in block.find_elements(By.CLASS_NAME, "bix-td-option-val")]

        # ---- CLICK “View Answer” ----
        try:
            ans_button = block.find_element(By.CLASS_NAME, "moremenu")
            driver.execute_script("arguments[0].click();", ans_button)
            sleep(0.5)
        except:
            pass

        # Extract correct answer
        try:
            answer = block.find_element(By.CLASS_NAME, "bix-ans").text.strip()
        except:
            answer = ""

        # ---- CLICK “View Explanation” ----
        try:
            exp_button = block.find_element(By.CLASS_NAME, "exdiv")
            driver.execute_script("arguments[0].click();", exp_button)
            sleep(0.5)
        except:
            pass

        # Extract explanation
        try:
            explanation = block.find_element(By.CLASS_NAME, "bix-ans-description").text.strip()
        except:
            explanation = ""

        # Save
        data["questions"].append({
            "id": idx + 1,
            "question": question,
            "options": options_list,
            "answer": answer,
            "explanation": explanation
        })

    except Exception as e:
        print("Skipping due to error:", e)

driver.quit()

# -------------------------------
# SAVE JSON
# -------------------------------
os.makedirs("questions", exist_ok=True)
filepath = "questions/infosys_aptitude.json"

with open(filepath, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4)

print(f"\nSaved 10 questions with answers + explanation → {filepath}")
