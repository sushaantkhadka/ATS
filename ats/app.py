import streamlit as st
import pickle
import re
import nltk 

nltk.download('punkt')
nltk.download('stopwords')

# loading models

clf = pickle.load(open('clf', 'rb'))
tfidf = pickle .load(open('clf', 'rb'))


def main():
    st.title("Resume Screening App")