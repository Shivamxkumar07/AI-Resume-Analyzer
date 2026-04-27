from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

# Initialize Flask app
app = Flask(__name__)

# Enable CORS so your React app (port 5173) can access this API (port 5000)
CORS(app)

# Load the small English NLP model
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# --- MOCK JOB DATABASE ---
JOBS = [
    {"id": 1, "title": "MERN Stack Developer", "desc": "skills: react, nodejs, express, mongodb, javascript, rest api, tailwind"},
    {"id": 2, "title": "Python Data Scientist", "desc": "skills: python, machine learning, pandas, scikit-learn, numpy, data visualization"},
    {"id": 3, "title": "Frontend Engineer", "desc": "skills: html, css, tailwind, react, typescript, vite, redux"},
    {"id": 4, "title": "AI/ML Specialist", "desc": "skills: python, pytorch, tensorflow, nlp, deep learning, computer vision"},
    {"id": 5, "title": "Backend Specialist", "desc": "skills: node, java, spring boot, sql, docker, kubernetes, microservices"}
]

def clean_text(text):
    """Cleans text by removing stop words and punctuation using spaCy"""
    doc = nlp(text.lower())
    return " ".join([token.lemma_ for token in doc if not token.is_stop and not token.is_punct])

# --- ROUTE 1: Home (To verify server is live) ---
@app.route('/')
def home():
    return "Python ML Server is Running Successfully!"

# --- ROUTE 2: Recommendation Engine ---
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        resume_text = data.get('resume_text', '')

        if not resume_text:
            return jsonify({"error": "No resume text found"}), 400

        # 1. Clean the text for better matching
        cleaned_resume = clean_text(resume_text)
        job_texts = [clean_text(job['desc']) for job in JOBS]

        # 2. Convert text to Math Vectors using TF-IDF
        vectorizer = TfidfVectorizer()
        all_vectors = vectorizer.fit_transform([cleaned_resume] + job_texts)

        # 3. Calculate Raw Cosine Similarity
        raw_scores = cosine_similarity(all_vectors[0:1], all_vectors[1:]).flatten()

        # --- THE FIX: NORMALIZATION MATH ---
        # Find the highest raw score to use as our baseline
        max_raw_score = max(raw_scores) if max(raw_scores) > 0 else 1.0
        
        # Scale the best match to roughly 94% (realistic top ATS score)
        scale_factor = 94.0 / (max_raw_score * 100)

        # 4. Format the final list
        results = []
        for i, job in enumerate(JOBS):
            # Apply the scale factor to the raw percentage
            scaled_score = (raw_scores[i] * 100) * scale_factor
            
            # Cap the maximum possible score at 98.5%
            final_score = min(scaled_score, 98.5)

            results.append({
                "id": job['id'],
                "title": job['title'],
                "match_score": round(final_score, 1) 
            })

        # Sort jobs by highest match score first
        sorted_results = sorted(results, key=lambda x: x['match_score'], reverse=True)
        
        return jsonify(sorted_results)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- START THE SERVER ---
if __name__ == '__main__':
    # Running on port 5000
    app.run(port=5000, debug=True)