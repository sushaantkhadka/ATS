from flask import Flask, jsonify, request

import pickle
import re
import nltk 
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

from pdfminer.high_level import extract_text
import requests



nltk.download('punkt')
nltk.download('stopwords')

# loading models
clf = pickle.load(open('clf.pkl', 'rb'))
tfidf = pickle.load(open('tfidf.pkl', 'rb'))

def clean_text(txt):
    clean_text = re.sub('http\S+\s', ' ', txt)
    clean_text = re.sub('RT|cc', ' ', clean_text)
    clean_text = re.sub('#\S+\s', ' ', clean_text)
    clean_text = re.sub('@\S+', ' ', clean_text)
    clean_text = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', clean_text)
    clean_text = re.sub(r'[^\x00-\x7f]', ' ', clean_text)
    clean_text = re.sub('\s+', ' ', clean_text)
    return clean_text.strip()

app = Flask(__name__)

@app.route("/pdf", methods=['POST'])
def pdf():
    data = request.json
    resume = data["url"]
    req = requests.get(resume)
    # text = extract_text(resume)
    print(req)
    return


@app.route("/compare", methods=['POST'])
def main():
    data = request.json
    print(data)
    job_description = data["jd"]
    uploaded_file = data["resume"]
    print(type(data))

    if uploaded_file is not None and job_description:
                
        cleaned_resume = clean_text(uploaded_file)
        cleaned_jd = clean_text(job_description)
        
        input_text = tfidf.transform([cleaned_resume])
        jd_text = tfidf.transform([cleaned_jd])
        
        probability = clf.predict_proba(input_text)[0]
        match_percentage = (input_text @ jd_text.T).toarray()[0][0] * 100  # Similarity score
        
        prediction = clf.predict(input_text)[0]
        
        category_mapping = {
            6 : 'Data Science', 12 : 'HR', 0 : 'Advocate', 1 : 'Arts', 24 : 'Web Designing',
            16 : 'Mechanical Engineer', 22 : 'Sales', 14 : 'Health and fitness',
            5 : 'Civil Engineer', 15 : 'Java Developer', 4 : 'Business Analyst',
            21 : 'SAP Developer', 2 : 'Automation Testing', 11 : 'Electrical Engineering',
            18 : 'Operations Manager', 20 : 'Python Developer', 8 : 'DevOps Engineer',
            17 : 'Network Security Engineer', 19 : 'PMO', 7 : 'Database', 13 : 'Hadoop',
            10 : 'ETL Developer', 9 : 'DotNet Developer', 3 : 'Blockchain', 23 : 'Testing'
        }
        
        category_name = category_mapping.get(prediction, "Unknown")
    return jsonify({
        "category": category_name,
        "rating" : match_percentage
    })
    

if __name__ == "__main__":
    app.run(debug=True)