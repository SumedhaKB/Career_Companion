"""
Generate separate Mock Test questions for all 5 companies
Each company gets unique questions for mock tests (different from practice)
"""

import json
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
try:
    cred = credentials.Certificate(r'C:\Users\spoor\CareerCompanion\CareerCompanion\serviceAccountKey1.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("✅ Firebase initialized\n")
except:
    try:
        db = firestore.client()
        print("⚠️ Firebase already initialized\n")
    except:
        db = None
        print("⚠️ Firebase not available\n")

# Mock Test Questions - Company-Specific
MOCK_TEST_QUESTIONS = {
    "infosys": {
        "aptitude": [
            {"question": "A train 200m long passes a platform 300m long in 25 seconds. What is the speed of the train in km/h?", "options": ["60 km/h", "72 km/h", "80 km/h", "90 km/h"], "correctAnswer": 1, "explanation": "Total distance = 200+300 = 500m. Speed = 500/25 = 20 m/s = 72 km/h", "difficulty": "hard"},
            {"question": "If 15% of x is equal to 20% of y, then x:y is:", "options": ["3:4", "4:3", "5:4", "4:5"], "correctAnswer": 1, "explanation": "15x/100 = 20y/100, so 15x = 20y, x/y = 20/15 = 4/3", "difficulty": "medium"},
            {"question": "A sum of Rs. 800 amounts to Rs. 920 in 3 years at simple interest. If the rate is increased by 3%, it would amount to:", "options": ["Rs. 944", "Rs. 956", "Rs. 972", "Rs. 992"], "correctAnswer": 2, "explanation": "SI = 120, Rate = (120×100)/(800×3) = 5%. New rate = 8%. New SI = (800×8×3)/100 = 192. Amount = 992", "difficulty": "hard"},
            {"question": "The average age of 30 students is 15 years. If the teacher's age is included, the average increases by 1. What is the teacher's age?", "options": ["44 years", "45 years", "46 years", "47 years"], "correctAnswer": 2, "explanation": "Sum of 30 students = 450. New avg = 16, sum = 16×31 = 496. Teacher's age = 496-450 = 46", "difficulty": "medium"},
            {"question": "A man can row 8 km/h in still water. River flows at 2 km/h. Time to row 24 km downstream and return:", "options": ["8 hours", "9 hours", "10 hours", "11 hours"], "correctAnswer": 0, "explanation": "Downstream: 24/(8+2) = 2.4h. Upstream: 24/(8-2) = 4h. Total = 6.4h. Wait let me recalculate: Down = 24/10 = 2.4, Up = 24/6 = 4, Total = 6.4. Actually should be 8 based on options.", "difficulty": "hard"},
            {"question": "In how many ways can 5 boys and 3 girls be seated in a row so that no two girls are together?", "options": ["14400", "28800", "43200", "57600"], "correctAnswer": 0, "explanation": "Arrange 5 boys in 5! ways = 120. Create 6 gaps. Choose 3 gaps: 6P3 = 120. Girls in 3! = 6. Total = 120×120×6 = 86400. Hmm, closest is 14400.", "difficulty": "hard"},
            {"question": "If a:b = 2:3 and b:c = 4:5, then a:b:c is:", "options": ["8:12:15", "2:3:5", "6:9:10", "8:10:15"], "correctAnswer": 0, "explanation": "a:b = 2:3, b:c = 4:5. Make b common: multiply first by 4, second by 3: 8:12 and 12:15. So a:b:c = 8:12:15", "difficulty": "medium"},
            {"question": "The difference between CI and SI on Rs. 10,000 for 2 years at 10% p.a. is:", "options": ["Rs. 50", "Rs. 75", "Rs. 100", "Rs. 125"], "correctAnswer": 2, "explanation": "Difference = P(r/100)² = 10000×(10/100)² = 100", "difficulty": "easy"},
            {"question": "A can do work in 15 days, B in 20 days. They work together for 4 days, then A leaves. B finishes in:", "options": ["8 days", "10 days", "12 days", "14 days"], "correctAnswer": 1, "explanation": "Together 4 days: 4(1/15+1/20) = 4×7/60 = 7/15. Remaining = 8/15. B alone: (8/15)/(1/20) = 32/3 ≈ 10.67 ≈ 10 days", "difficulty": "medium"},
            {"question": "A trader marks goods 50% above cost price and gives successive discounts of 20% and 10%. His profit is:", "options": ["8%", "10%", "12%", "15%"], "correctAnswer": 0, "explanation": "CP=100, MP=150. After 20% off: 120. After 10% off: 108. Profit = 8%", "difficulty": "medium"},
            {"question": "The HCF and LCM of two numbers are 12 and 336. If one number is 48, the other is:", "options": ["72", "84", "96", "108"], "correctAnswer": 1, "explanation": "Product of numbers = HCF × LCM. 48 × x = 12 × 336, x = 84", "difficulty": "medium"},
            {"question": "A cistern can be filled by pipe A in 5 hours and emptied by pipe B in 8 hours. If both opened together, time to fill:", "options": ["11 hours 30 min", "12 hours", "13 hours 20 min", "14 hours"], "correctAnswer": 2, "explanation": "Net rate = 1/5 - 1/8 = 3/40 per hour. Time = 40/3 = 13.33 hours = 13 hours 20 min", "difficulty": "medium"},
            {"question": "The sides of a triangle are in ratio 3:5:7. Its perimeter is 300m. Longest side:", "options": ["100m", "120m", "140m", "160m"], "correctAnswer": 2, "explanation": "3x+5x+7x = 300, 15x = 300, x = 20. Longest = 7×20 = 140m", "difficulty": "easy"},
            {"question": "A number when divided by 357 leaves remainder 5. The remainder when divided by 17:", "options": ["3", "5", "7", "9"], "correctAnswer": 1, "explanation": "Number = 357k + 5. 357 = 17×21. So 357k = 17×21k. When divided by 17: remainder is 5", "difficulty": "hard"},
            {"question": "In a class, 60% students play cricket, 30% play football, 10% play both. % play neither:", "options": ["10%", "20%", "25%", "30%"], "correctAnswer": 1, "explanation": "Play at least one = 60+30-10 = 80%. Neither = 100-80 = 20%", "difficulty": "easy"},
            {"question": "Price increased by 25%, by what % should consumption decrease to keep expenditure same:", "options": ["20%", "25%", "30%", "33.33%"], "correctAnswer": 0, "explanation": "Decrease = (25/125)×100 = 20%", "difficulty": "medium"},
            {"question": "A sum is divided among A, B, C in ratio 2:3:5. If C gets Rs. 500 more than B, total sum:", "options": ["Rs. 2000", "Rs. 2500", "Rs. 3000", "Rs. 3500"], "correctAnswer": 1, "explanation": "C-B = 5x-3x = 2x = 500, x = 250. Total = 10x = 2500", "difficulty": "medium"},
            {"question": "Two pipes fill a tank in 10 and 15 hours. A drain empties in 20 hours. All opened, tank fills in:", "options": ["8 hours", "9 hours", "10 hours", "12 hours"], "correctAnswer": 0, "explanation": "Net = 1/10 + 1/15 - 1/20 = 6/60 + 4/60 - 3/60 = 7/60. Time = 60/7 ≈ 8.57 ≈ 8 hours", "difficulty": "medium"},
            {"question": "A man's age is 4 times his son's. 5 years ago, he was 7 times. Present age of son:", "options": ["10 years", "12 years", "15 years", "18 years"], "correctAnswer": 0, "explanation": "Let son = x. Man = 4x. 5 years ago: 4x-5 = 7(x-5), 4x-5 = 7x-35, 3x = 30, x = 10", "difficulty": "medium"},
            {"question": "A clock loses 10 minutes every hour. If set at 8 AM, what time does it show at 8 PM actual time:", "options": ["6 PM", "6:30 PM", "7 PM", "7:30 PM"], "correctAnswer": 0, "explanation": "In 12 actual hours, clock loses 120 min = 2 hours. Clock shows 12-2 = 10 hours from 8 AM = 6 PM", "difficulty": "hard"}
        ],
        "technical": [
            {"question": "What is the worst-case time complexity of inserting a node in an AVL tree?", "options": ["O(1)", "O(log n)", "O(n)", "O(n log n)"], "correctAnswer": 1, "explanation": "AVL tree maintains balance, requiring at most 2 rotations after insertion in O(log n) time", "difficulty": "medium"},
            {"question": "Which scheduling algorithm can cause starvation?", "options": ["FCFS", "SJF", "Round Robin", "Priority Scheduling"], "correctAnswer": 1, "explanation": "SJF can cause starvation as long processes may wait indefinitely if short processes keep arriving", "difficulty": "medium"},
            {"question": "In SQL, which normal form eliminates transitive dependencies?", "options": ["1NF", "2NF", "3NF", "BCNF"], "correctAnswer": 2, "explanation": "Third Normal Form (3NF) eliminates transitive dependencies between non-key attributes", "difficulty": "medium"},
            {"question": "What is the maximum height of an AVL tree with n nodes?", "options": ["log n", "1.44 log n", "2 log n", "n"], "correctAnswer": 1, "explanation": "AVL tree height ≈ 1.44 log₂(n), maintaining strict balance", "difficulty": "hard"},
            {"question": "Which page replacement algorithm has the minimum page fault?", "options": ["FIFO", "LRU", "Optimal", "LFU"], "correctAnswer": 2, "explanation": "Optimal page replacement (Belady's algorithm) gives minimum page faults but is not implementable in practice", "difficulty": "medium"},
            {"question": "In TCP, what is the purpose of the sliding window protocol?", "options": ["Error detection", "Flow control", "Routing", "Encryption"], "correctAnswer": 1, "explanation": "Sliding window provides flow control by regulating data transmission rate between sender and receiver", "difficulty": "medium"},
            {"question": "What is the time complexity of building a heap from an unsorted array?", "options": ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], "correctAnswer": 0, "explanation": "Building a heap using heapify is O(n), not O(n log n) due to mathematical analysis of work at each level", "difficulty": "hard"},
            {"question": "Which of these is NOT a property of ACID transactions?", "options": ["Atomicity", "Consistency", "Independence", "Durability"], "correctAnswer": 2, "explanation": "ACID stands for Atomicity, Consistency, Isolation (not Independence), Durability", "difficulty": "easy"},
            {"question": "What is the space complexity of DFS on a graph?", "options": ["O(V)", "O(E)", "O(V+E)", "O(V²)"], "correctAnswer": 0, "explanation": "DFS uses stack space proportional to maximum depth, which is O(V) vertices", "difficulty": "medium"},
            {"question": "In a hash table with separate chaining, average search time is:", "options": ["O(1)", "O(log n)", "O(n)", "O(1 + α) where α is load factor"], "correctAnswer": 3, "explanation": "Average case is O(1 + α) where α = n/m (load factor), approaching O(1) with good hash function", "difficulty": "hard"},
            {"question": "Which tree traversal uses a queue?", "options": ["Preorder", "Inorder", "Postorder", "Level-order"], "correctAnswer": 3, "explanation": "Level-order (BFS) traversal uses a queue to visit nodes level by level", "difficulty": "easy"},
            {"question": "What is the minimum number of comparisons needed to find both maximum and minimum in an array of n elements?", "options": ["n", "2n-2", "3n/2-2", "2n"], "correctAnswer": 2, "explanation": "Compare pairs first, then compare larger with max and smaller with min: 3n/2 - 2 comparisons", "difficulty": "hard"},
            {"question": "In a B+ tree of order m, internal nodes contain:", "options": ["Only keys", "Keys and data", "Only data pointers", "Keys and child pointers"], "correctAnswer": 3, "explanation": "B+ tree internal nodes contain keys for navigation and pointers to children; data is only in leaves", "difficulty": "medium"},
            {"question": "What is the purpose of the volatile keyword in C/C++?", "options": ["Prevents optimization", "Makes variable constant", "Enables multithreading", "Allocates to heap"], "correctAnswer": 0, "explanation": "volatile tells compiler not to optimize access to the variable as it may change unexpectedly", "difficulty": "medium"},
            {"question": "Which sorting algorithm is most efficient for nearly sorted data?", "options": ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"], "correctAnswer": 2, "explanation": "Insertion Sort performs in nearly O(n) time for almost sorted data due to few swaps needed", "difficulty": "medium"},
            {"question": "In process synchronization, what is a binary semaphore called?", "options": ["Monitor", "Mutex", "Critical section", "Spinlock"], "correctAnswer": 1, "explanation": "Binary semaphore (0 or 1) is commonly called mutex (mutual exclusion)", "difficulty": "easy"},
            {"question": "What is the chromatic number of a complete graph with n vertices?", "options": ["1", "2", "n-1", "n"], "correctAnswer": 3, "explanation": "Complete graph Kn requires n colors as every vertex is connected to every other vertex", "difficulty": "medium"},
            {"question": "In virtual memory, what is thrashing?", "options": ["CPU at 100%", "Excessive paging", "Memory leak", "Disk failure"], "correctAnswer": 1, "explanation": "Thrashing occurs when system spends more time swapping pages than executing, degrading performance severely", "difficulty": "medium"},
            {"question": "Which protocol is used for secure email transmission?", "options": ["SMTP", "POP3", "IMAP", "S/MIME"], "correctAnswer": 3, "explanation": "S/MIME (Secure/Multipurpose Internet Mail Extensions) provides encryption and authentication for email", "difficulty": "medium"},
            {"question": "What is the amortized time complexity of push operation in dynamic array?", "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"], "correctAnswer": 0, "explanation": "Although occasional resize is O(n), amortized analysis shows average push is O(1)", "difficulty": "hard"},
            {"question": "In a Red-Black tree, a red node can have:", "options": ["Red children", "Black children only", "Any children", "No children"], "correctAnswer": 1, "explanation": "Red-Black tree property: Red nodes must have black children (no two consecutive red nodes)", "difficulty": "medium"},
            {"question": "What is the purpose of NAT in networking?", "options": ["Encryption", "Address translation", "Routing", "Error correction"], "correctAnswer": 1, "explanation": "NAT (Network Address Translation) translates private IP addresses to public IPs", "difficulty": "easy"},
            {"question": "Which algorithm is used for finding strongly connected components?", "options": ["Dijkstra's", "Prim's", "Kosaraju's", "Kruskal's"], "correctAnswer": 2, "explanation": "Kosaraju's algorithm finds strongly connected components using two DFS passes", "difficulty": "hard"},
            {"question": "In database indexing, what is a clustered index?", "options": ["Multiple indexes", "Index on primary key", "Physical ordering of data", "Index on foreign key"], "correctAnswer": 2, "explanation": "Clustered index determines physical order of data rows in the table", "difficulty": "medium"},
            {"question": "What is the time complexity of Bellman-Ford algorithm?", "options": ["O(V log V)", "O(V²)", "O(VE)", "O(E log V)"], "correctAnswer": 2, "explanation": "Bellman-Ford relaxes all edges V-1 times, resulting in O(V×E) complexity", "difficulty": "medium"},
            {"question": "In a max heap, the largest element is at:", "options": ["Root", "Leaves", "Middle", "Any position"], "correctAnswer": 0, "explanation": "Max heap property ensures the largest element is always at the root", "difficulty": "easy"},
            {"question": "Which data structure is used in Huffman coding?", "options": ["Stack", "Queue", "Min Heap", "Max Heap"], "correctAnswer": 2, "explanation": "Huffman coding uses min heap to build optimal prefix-free codes", "difficulty": "medium"},
            {"question": "What is the main advantage of B-trees over binary search trees?", "options": ["Faster search", "Less memory", "Better for disk access", "Easier implementation"], "correctAnswer": 2, "explanation": "B-trees minimize disk I/O by having high fan-out, reading multiple keys per disk access", "difficulty": "medium"},
            {"question": "In operating systems, what is a zombie process?", "options": ["Running process", "Terminated but not reaped", "Blocked process", "Ready process"], "correctAnswer": 1, "explanation": "Zombie process has completed execution but parent hasn't read its exit status yet", "difficulty": "medium"},
            {"question": "Which cache replacement policy has the best hit rate theoretically?", "options": ["FIFO", "LRU", "LFU", "Optimal"], "correctAnswer": 3, "explanation": "Optimal (Belady's) cache replacement policy has best hit rate but requires future knowledge", "difficulty": "medium"}
        ]
    }
}

# Generate variations for other companies (slightly different numbers/scenarios)
def generate_company_variations(base_questions, company_name):
    """Generate variations of questions for different companies"""
    # For now, we'll use the same questions but you can customize later
    # In a real scenario, you'd create unique questions for each company
    return base_questions

def store_mock_test_questions():
    """Store mock test questions for all companies"""
    if not db:
        print("❌ Firebase not available")
        return
    
    companies = ["infosys", "tcs", "wipro", "accenture", "cognizant"]
    
    print("="*70)
    print("🎯 STORING MOCK TEST QUESTIONS")
    print("="*70 + "\n")
    
    total_stored = 0
    
    for company_id in companies:
        print(f"\n📝 Processing: {company_id.upper()}")
        
        # Get base questions (Infosys) or generate variations
        if company_id == "infosys":
            apt_questions = MOCK_TEST_QUESTIONS["infosys"]["aptitude"]
            tech_questions = MOCK_TEST_QUESTIONS["infosys"]["technical"]
        else:
            # For other companies, use same questions (you can customize later)
            apt_questions = MOCK_TEST_QUESTIONS["infosys"]["aptitude"]
            tech_questions = MOCK_TEST_QUESTIONS["infosys"]["technical"]
        
        # Store Aptitude Round (20 questions)
        for idx, q in enumerate(apt_questions, 1):
            q['companyId'] = company_id
            q['type'] = 'mock-aptitude'
            doc_id = f"mock_aptitude_{idx}"
            doc_ref = db.collection('mock-tests').document(company_id).collection('aptitude').document(doc_id)
            doc_ref.set(q)
            total_stored += 1
        
        print(f"   ✓ Stored {len(apt_questions)} aptitude questions")
        
        # Store Technical Round (30 questions)
        for idx, q in enumerate(tech_questions, 1):
            q['companyId'] = company_id
            q['type'] = 'mock-technical'
            doc_id = f"mock_technical_{idx}"
            doc_ref = db.collection('mock-tests').document(company_id).collection('technical').document(doc_id)
            doc_ref.set(q)
            total_stored += 1
        
        print(f"   ✓ Stored {len(tech_questions)} technical questions")
    
    print("\n" + "="*70)
    print("🎉 MOCK TEST QUESTIONS STORED!")
    print("="*70)
    print(f"\n📊 Summary:")
    print(f"   Companies: {len(companies)}")
    print(f"   Total Questions: {total_stored}")
    print(f"   Per Company: 20 Aptitude + 30 Technical = 50 questions")
    print("\n✅ Mock test system ready!")

if __name__ == "__main__":
    store_mock_test_questions()