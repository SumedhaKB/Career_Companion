"""
FIXED UNIVERSAL INTERVIEW SCRAPER
- Improved HTML parsing with better selectors
- Added debugging output to see what's being parsed
- Multiple fallback strategies for different site structures
"""

import requests
from requests.adapters import HTTPAdapter, Retry
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore
import time
import re
import sys
import traceback
from urllib.parse import urljoin, urlparse

# -----------------------
# CONFIG
# -----------------------
DEFAULT_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
}
REQUEST_TIMEOUT = 20
SLEEP_BETWEEN_REQUESTS = 1.5
DEBUG = True  # Set to True to see detailed parsing info

# -----------------------
# SESSION WITH RETRIES
# -----------------------
session = requests.Session()
retries = Retry(total=3, backoff_factor=0.8,
                status_forcelist=(429, 500, 502, 503, 504),
                allowed_methods=frozenset(['GET', 'POST']))
session.mount("https://", HTTPAdapter(max_retries=retries))
session.mount("http://", HTTPAdapter(max_retries=retries))
session.headers.update(DEFAULT_HEADERS)


# -----------------------
# FIREBASE INIT (safe)
# -----------------------
db = None
try:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("✅ Firebase initialized")
except Exception as e:
    try:
        db = firestore.client()
        print("⚠ Firebase already initialized, client obtained")
    except Exception:
        db = None
        print("⚠ Firebase not available; running scraper without DB storage")


# -----------------------
# HELPERS
# -----------------------
def ensure_questions_url(url: str) -> str:
    """
    IndiaBIX uses 'questions-and-answers' or just shows questions on main page
    """
    if not url:
        return url
    parsed = urlparse(url)
    
    # If already has questions-and-answers, return as is
    if 'questions-and-answers' in parsed.path:
        return url
    
    # Otherwise, try adding it
    base = url.rstrip('/')
    return f"{base}/questions-and-answers/"


def fetch_soup(url):
    """Fetch URL and return BeautifulSoup object"""
    time.sleep(SLEEP_BETWEEN_REQUESTS)
    resp = session.get(url, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    
    if DEBUG:
        print(f"   Status: {resp.status_code}, Length: {len(resp.text)} chars")
    
    return BeautifulSoup(resp.text, "html.parser")


def debug_print(msg):
    """Print debug messages if DEBUG is enabled"""
    if DEBUG:
        print(f"   DEBUG: {msg}")


# -----------------------
# IMPROVED INDIA BIX PARSER
# -----------------------
def scrape_indiabix_page(url, limit=10):
    """
    Scrape IndiaBIX question page with improved parsing logic
    """
    url = ensure_questions_url(url)
    print(f"\n🔍 Fetching IndiaBIX: {url}")

    try:
        soup = fetch_soup(url)
    except Exception as e:
        print(f"❌ Request failed for {url}: {e}")
        return []

    mcqs = []
    
    # Save HTML for debugging if needed
    if DEBUG:
        with open('debug_page.html', 'w', encoding='utf-8') as f:
            f.write(soup.prettify())
        print("   Saved debug_page.html for inspection")

    # Strategy 1: Look for table-based structure (common in IndiaBIX)
    question_tables = soup.find_all('table', class_=re.compile(r'.*'))
    debug_print(f"Found {len(question_tables)} tables")
    
    # Strategy 2: Look for div-based questions
    question_divs = soup.find_all('div', class_=re.compile(r'(question|bix)', re.I))
    debug_print(f"Found {len(question_divs)} question divs")
    
    # Strategy 3: Look for any container with multiple paragraphs and inputs
    all_containers = soup.find_all(['div', 'table', 'section'], recursive=True)
    potential_questions = []
    
    for container in all_containers:
        # Check if container has both text content and radio inputs
        inputs = container.find_all('input', {'type': 'radio'})
        paragraphs = container.find_all(['p', 'td', 'div'], recursive=False)
        
        if len(inputs) >= 4 and len(paragraphs) >= 1:
            potential_questions.append(container)
    
    debug_print(f"Found {len(potential_questions)} potential question containers")
    
    # Combine all possible question containers
    containers = potential_questions if potential_questions else (question_divs + question_tables)
    
    print(f"➡ Processing {min(len(containers), limit)} question blocks")

    for idx, block in enumerate(containers[:limit], 1):
        try:
            debug_print(f"\n--- Processing block {idx} ---")
            
            # FIND QUESTION TEXT
            question = None
            
            # Try multiple strategies to find question
            q_elem = (
                block.find('td', class_='bix-td-qtxt') or
                block.find('div', class_='bix-ques') or
                block.find('p', class_=re.compile(r'question', re.I)) or
                block.find('td', class_=re.compile(r'qtxt|question', re.I)) or
                block.find('div', class_=re.compile(r'qtxt|question', re.I))
            )
            
            # If no specific question element, try first paragraph or td
            if not q_elem:
                q_elem = block.find('p') or block.find('td')
            
            if q_elem:
                question = q_elem.get_text(separator=" ", strip=True)
                # Clean up question text
                question = re.sub(r'\s+', ' ', question)
                question = question.strip()
                debug_print(f"Question: {question[:80]}...")
            
            if not question or len(question) < 10:
                debug_print("Skipping - no valid question found")
                continue

            # FIND OPTIONS
            options = []
            
            # Strategy 1: Find by option class
            opt_containers = block.find_all(['div', 'td', 'label'], 
                                           class_=re.compile(r'option|choice', re.I))
            
            for opt in opt_containers:
                text = opt.get_text(strip=True)
                # Clean option text
                text = re.sub(r'^[A-D][\.\)\-\:]\s*', '', text, flags=re.I)
                text = re.sub(r'\s+', ' ', text).strip()
                
                # Skip invalid options
                if not text or len(text) < 1:
                    continue
                if re.search(r'(answer|explanation|show|view|workspace)', text, re.I):
                    continue
                
                options.append(text)
            
            # Strategy 2: Find by radio inputs
            if len(options) < 4:
                debug_print("Trying radio input strategy")
                radio_inputs = block.find_all('input', {'type': 'radio'})
                
                for inp in radio_inputs[:6]:
                    # Try to find associated label
                    label_text = None
                    
                    # Try finding label by 'for' attribute
                    if inp.get('id'):
                        label = block.find('label', {'for': inp.get('id')})
                        if label:
                            label_text = label.get_text(strip=True)
                    
                    # Try finding next sibling
                    if not label_text:
                        sibling = inp.find_next_sibling(text=True)
                        if sibling:
                            label_text = str(sibling).strip()
                        else:
                            # Try parent's text
                            parent = inp.parent
                            if parent:
                                label_text = parent.get_text(strip=True)
                    
                    if label_text:
                        label_text = re.sub(r'^[A-D][\.\)\-\:]\s*', '', label_text, flags=re.I)
                        label_text = re.sub(r'\s+', ' ', label_text).strip()
                        
                        if label_text and len(label_text) > 1:
                            if not re.search(r'(answer|explanation|show|view)', label_text, re.I):
                                options.append(label_text)
            
            # Strategy 3: Look for list items
            if len(options) < 4:
                debug_print("Trying list item strategy")
                list_items = block.find_all('li')
                for li in list_items[:6]:
                    text = li.get_text(strip=True)
                    text = re.sub(r'^[A-D][\.\)\-\:]\s*', '', text, flags=re.I)
                    text = re.sub(r'\s+', ' ', text).strip()
                    if text and len(text) > 1:
                        options.append(text)
            
            # Deduplicate options while preserving order
            seen = set()
            clean_options = []
            for opt in options:
                opt_lower = opt.lower()
                if opt_lower not in seen and len(opt) > 1:
                    seen.add(opt_lower)
                    clean_options.append(opt)
            
            options = clean_options[:4]  # Take only first 4
            
            debug_print(f"Found {len(options)} options")
            for i, opt in enumerate(options):
                debug_print(f"  {chr(65+i)}. {opt[:60]}")
            
            if len(options) < 4:
                debug_print(f"Skipping - only {len(options)} options found")
                continue

            # FIND CORRECT ANSWER
            correct_index = 0
            
            # Look for answer in hidden input
            answer_input = (
                block.find('input', {'id': re.compile(r'answer', re.I)}) or
                block.find('input', {'name': re.compile(r'answer', re.I)}) or
                block.find('input', {'class': re.compile(r'answer', re.I)})
            )
            
            if answer_input:
                value = answer_input.get('value', '')
                debug_print(f"Found answer value: {value}")
                
                # Try to parse answer
                if value:
                    # Check if it's a letter (A, B, C, D)
                    letter_match = re.search(r'[A-D]', str(value), re.I)
                    if letter_match:
                        correct_index = ord(letter_match.group(0).upper()) - ord('A')
                    # Check if it's a number (1, 2, 3, 4)
                    elif value.isdigit():
                        correct_index = max(0, min(3, int(value) - 1))
            
            # Look for answer in divs
            if not answer_input:
                answer_div = block.find(['div', 'span'], 
                                       class_=re.compile(r'answer|correct', re.I))
                if answer_div:
                    answer_text = answer_div.get_text(strip=True)
                    debug_print(f"Found answer text: {answer_text}")
                    letter_match = re.search(r'[A-D]', answer_text, re.I)
                    if letter_match:
                        correct_index = ord(letter_match.group(0).upper()) - ord('A')
            
            debug_print(f"Correct answer index: {correct_index}")

            # FIND EXPLANATION
            explanation = "No explanation available"
            exp_elem = block.find(['div', 'td', 'p'], 
                                 class_=re.compile(r'(explanation|answer.*desc|explain)', re.I))
            
            if exp_elem:
                explanation = exp_elem.get_text(separator=" ", strip=True)
                explanation = re.sub(r'\s+', ' ', explanation).strip()
                if len(explanation) > 500:
                    explanation = explanation[:500] + "..."
                debug_print(f"Explanation: {explanation[:80]}...")

            # Create MCQ object
            mcq = {
                "question": question,
                "options": options,
                "correctAnswer": int(correct_index),
                "explanation": explanation,
                "difficulty": "medium"
            }
            
            mcqs.append(mcq)
            print(f"✓ Parsed question {len(mcqs)}: {question[:60]}...")

        except Exception as e:
            print(f"⚠ Parse error for block {idx}: {e}")
            if DEBUG:
                traceback.print_exc()
            continue

    print(f"✅ Total Parsed: {len(mcqs)}")
    return mcqs


# -----------------------
# IMPROVED PREPINSTA CODING SCRAPER
# -----------------------
def scrape_prepinsta_coding(company_url, limit=8):
    """
    Scrape PrepInsta coding questions with better text extraction
    """
    print(f"\n💻 PrepInsta: {company_url}")
    try:
        soup = fetch_soup(company_url)
    except Exception as e:
        print(f"❌ PrepInsta fetch failed: {e}")
        return []

    if DEBUG:
        with open('debug_prepinsta.html', 'w', encoding='utf-8') as f:
            f.write(soup.prettify())
        print("   Saved debug_prepinsta.html for inspection")

    problems = []
    
    # Find all headings
    headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5'])
    debug_print(f"Found {len(headings)} headings")

    for h in headings:
        title = h.get_text(strip=True)
        title_lower = title.lower()
        
        # Check if heading looks like a problem title
        is_problem = any(keyword in title_lower for keyword in 
                        ['program', 'question', 'write', 'problem', 'code',
                         'find', 'print', 'check', 'calculate', 'reverse'])
        
        if is_problem:
            debug_print(f"Found problem: {title}")
            
            # Collect description from next siblings
            description_parts = []
            current = h.find_next_sibling()
            
            while current and len(description_parts) < 5:
                # Stop if we hit another heading
                if current.name and current.name.lower() in ['h1', 'h2', 'h3', 'h4', 'h5']:
                    break
                
                # Get text from paragraphs, divs, or lists
                if current.name in ['p', 'div', 'ul', 'ol']:
                    text = current.get_text(separator=" ", strip=True)
                    # Skip very short or meta text
                    if text and len(text) > 20:
                        if not re.search(r'(read more|share|comment|subscribe)', text, re.I):
                            description_parts.append(text)
                
                current = current.find_next_sibling()
            
            description = "\n".join(description_parts)[:800]
            
            if description:
                problems.append({
                    "title": title,
                    "description": description,
                    "type": "coding",
                    "difficulty": "medium"
                })
                print(f"✓ Found coding: {title[:60]}...")
            
            if len(problems) >= limit:
                break

    print(f"✅ PrepInsta problems found: {len(problems)}")
    return problems


# -----------------------
# HR QUESTIONS (curated)
# -----------------------
def get_hr_questions(company_name='Company'):
    """Return curated HR questions"""
    return [
        {
            "question": f"Why do you want to join {company_name}?",
            "options": [
                f"Because {company_name} matches my career goals and offers growth",
                "I just want any job",
                "Heavy salary is the only reason",
                "My friends are there"
            ],
            "correctAnswer": 0,
            "explanation": "Show alignment with company goals, culture and learning opportunities.",
            "difficulty": "easy",
            "type": "hr"
        },
        {
            "question": "Tell me about yourself.",
            "options": [
                "Share professional background, skills, and career goals concisely",
                "Tell your entire life story",
                "Just mention hobbies",
                "Say you're looking for any job"
            ],
            "correctAnswer": 0,
            "explanation": "Focus on professional aspects relevant to the role.",
            "difficulty": "easy",
            "type": "hr"
        },
        {
            "question": "What are your strengths?",
            "options": [
                "Mention relevant skills with examples from past experience",
                "Say you have no weaknesses",
                "List generic traits without examples",
                "Avoid answering directly"
            ],
            "correctAnswer": 0,
            "explanation": "Always back up strengths with concrete examples.",
            "difficulty": "easy",
            "type": "hr"
        }
    ]


# -----------------------
# FIREBASE STORAGE
# -----------------------
def store_company_data(company_config):
    """Store company metadata in Firestore"""
    if not db:
        print("⚠ Firebase not initialized; skipping company store")
        return
    try:
        doc_ref = db.collection('companies').document(company_config['id'])
        doc_ref.set(company_config)
        print(f"✅ Stored company metadata: {company_config['name']}")
    except Exception as e:
        print(f"❌ Error storing company: {e}")


def store_questions(company_id, questions_by_type):
    """Store questions in Firestore"""
    if not db:
        print("⚠ Firebase not initialized; skipping question store")
        return 0

    total = 0
    for qtype, questions in questions_by_type.items():
        if not questions:
            print(f"⚠ No {qtype} questions to store")
            continue
        try:
            for idx, q in enumerate(questions, start=1):
                q['companyId'] = company_id
                doc_id = f"{qtype}_{idx}"
                doc_ref = db.collection('questions').document(company_id).collection(qtype).document(doc_id)
                doc_ref.set(q)
                total += 1
            print(f"✅ Stored {len(questions)} {qtype} questions")
        except Exception as e:
            print(f"❌ Error storing {qtype}: {e}")
    return total


# -----------------------
# MAIN SCRAPE FOR A COMPANY
# -----------------------
def scrape_company(company_config, aptitude_limit_per_category=5, 
                   technical_limit_per_topic=5, coding_limit=6):
    """Main function to scrape all question types for a company"""
    cid = company_config['id']
    cname = company_config['name']
    print("\n" + "=" * 60)
    print(f"🏢 Scraping: {cname}")
    print("=" * 60)

    store_company_data(company_config)

    questions_by_type = {}

    # Aptitude (IndiaBIX categories)
    if company_config.get('scrape_aptitude', True):
        print("\n📊 Scraping Aptitude (IndiaBIX)...")
        aptitude_urls = company_config.get('aptitude_urls') or {
            'number-series': 'https://www.indiabix.com/logical-reasoning/number-series/',
            'problems-on-numbers': 'https://www.indiabix.com/aptitude/problems-on-numbers/',
            'percentage': 'https://www.indiabix.com/aptitude/percentage/',
        }
        apt_all = []
        for name, url in aptitude_urls.items():
            print(f"   📂 Category: {name}")
            questions = scrape_indiabix_page(url, limit=aptitude_limit_per_category)
            apt_all += [
                {**q, "type": "aptitude", "category": name}
                for q in questions
            ]
        questions_by_type['aptitude'] = apt_all

    # Technical (IndiaBIX technical topics)
    if company_config.get('scrape_technical', True):
        print("\n💻 Scraping Technical (IndiaBIX)...")
        technical_topics = company_config.get('technical_topics') or {
            'c-basics': 'https://www.indiabix.com/c-programming/declarations-and-initializations/',
            'c-functions': 'https://www.indiabix.com/c-programming/functions/',
            'dbms': 'https://www.indiabix.com/database/',
        }
        tech_all = []
        for name, url in technical_topics.items():
            print(f"   📂 Topic: {name}")
            questions = scrape_indiabix_page(url, limit=technical_limit_per_topic)
            tech_all += [
                {**q, "type": "technical", "topic": name}
                for q in questions
            ]
        questions_by_type['technical'] = tech_all

    # Coding (PrepInsta)
    if company_config.get('coding_url'):
        print("\n🧩 Scraping Coding (PrepInsta)...")
        code = scrape_prepinsta_coding(company_config['coding_url'], limit=coding_limit)
        coding_with_meta = [{**c, "company": cname} for c in code]
        questions_by_type['coding'] = coding_with_meta

    # HR
    if company_config.get('scrape_hr', True):
        print("\n👔 Adding HR questions...")
        questions_by_type['hr'] = get_hr_questions(cname)

    # Store
    print("\n💾 Storing to Firebase (if initialized)...")
    total = store_questions(cid, questions_by_type)

    print("\n📊 Summary:")
    for k, v in questions_by_type.items():
        print(f"   {k}: {len(v)}")
    print(f"\n🎉 Total stored: {total}")
    return questions_by_type


# -----------------------
# RUN CLI
# -----------------------
if __name__ == "__main__":
    companies = {
        'infosys': {
            'id': 'infosys',
            'name': 'Infosys',
            'logo': 'https://companieslogo.com/img/orig/INFY-82a8e18c.png',
            'description': 'Global leader in next-generation digital services and consulting',
            'rounds': [],
            'coding_url': 'https://prepinsta.com/infosys/coding/',
            'scrape_aptitude': True,
            'scrape_technical': True,
            'scrape_hr': True
        },
        'tcs': {
            'id': 'tcs',
            'name': 'TCS',
            'logo': '',
            'description': '',
            'rounds': [],
            'coding_url': 'https://prepinsta.com/tcs/coding/',
            'scrape_aptitude': True,
            'scrape_technical': True,
            'scrape_hr': True
        }
    }

    print("\nAvailable companies:")
    for i, (k, c) in enumerate(companies.items(), start=1):
        print(f"  {i}. {c['name']}")

    print(f"  {len(companies)+1}. All companies")

    try:
        choice = input(f"\nEnter choice (1-{len(companies)+1}): ").strip()
    except KeyboardInterrupt:
        print("\nAborted.")
        sys.exit(0)

    if choice == str(len(companies)+1):
        for k, cfg in companies.items():
            scrape_company(cfg)
            time.sleep(3)
    else:
        try:
            idx = int(choice) - 1
            key = list(companies.keys())[idx]
            scrape_company(companies[key])
        except Exception:
            print("❌ Invalid choice or error")
            traceback.print_exc()
            sys.exit(1)

    print("\n✅ SCRAPING COMPLETE")
    print("\nCheck debug_page.html and debug_prepinsta.html for HTML structure inspection")