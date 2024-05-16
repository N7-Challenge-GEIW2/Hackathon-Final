from flask import Flask, request, jsonify
import joblib
import pickle
from keras.models import load_model
from flask_cors import CORS
from urllib.parse import urlparse
import string
import re

app = Flask(__name__)
CORS(app)

# Paths to models and scalers
email_model_path = "./EmailSavingModel/email.pkl"
tfidf_vectorizer_path = "./EmailSavingModel/tfidf_vectorizer.pkl"
url_model_path = "./UrlSavingModel/url.h5"
url_scaler_path = "./UrlSavingModel/scaler.pkl"

# Load email model and vectorizer
email_model = joblib.load(email_model_path)
with open(tfidf_vectorizer_path, 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

# Load URL model and scaler
url_model = load_model(url_model_path)
with open(url_scaler_path, 'rb') as f:
    url_scaler = pickle.load(f)

# URL preprocessing functions
def host_length(url):
    parsed_url = urlparse(url)
    return len(parsed_url.netloc)

def count_slashes(url):
    return url.count('/')

def count_dots_in_host(url):
    parsed_url = urlparse(url)
    host_name = parsed_url.netloc
    return host_name.count('.')

def count_host_terms(url):
    parsed_url = urlparse(url)
    host_name = parsed_url.netloc
    return len(host_name.split('.'))

def has_special_characters(url):
    special_characters = set(string.punctuation.replace('/', '').replace('.', '').replace("-", ""))
    for char in url:
        if char in special_characters:
            return 1
    return 0

def has_ip_address(url):
    ip_pattern = r"\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b|\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b"
    return int(bool(re.search(ip_pattern, url)))

def has_unicode(url):
    for char in url:
        if ord(char) > 127:
            return 1
    return 0

def has_http(url):
    return int("http" in url)

def has_subdomain(url):
    parsed_url = urlparse(url)
    if parsed_url.hostname:
        parts = parsed_url.hostname.split('.')
        return int(len(parts) > 2)
    return 0

def tld_exists(url):
    parsed_url = urlparse(url)
    if parsed_url.hostname:
        parts = parsed_url.hostname.split('.')
        if len(parts) > 1:
            tld = parts[-1]
            recognized_tlds = {'com', 'net', 'org', 'edu', 'gov'}
            return int(tld.lower() in recognized_tlds)
    return 0

def count_dots_in_path(url):
    parsed_url = urlparse(url)
    path = parsed_url.path
    return path.count('.')

def count_hyphens_in_host(url):
    parsed_url = urlparse(url)
    host = parsed_url.hostname
    if host:
        return host.count('-')
    else:
        return 0

def url_length(url):
    return len(url)

def preprocess_url(url):
    features = []
    features.append(host_length(url))
    features.append(count_slashes(url))
    features.append(count_dots_in_host(url))
    features.append(count_host_terms(url))
    features.append(has_special_characters(url))
    features.append(has_ip_address(url))
    features.append(has_unicode(url))
    features.append(has_http(url))
    features.append(has_subdomain(url))
    features.append(tld_exists(url))
    features.append(count_dots_in_path(url))
    features.append(count_hyphens_in_host(url))
    features.append(url_length(url))
    return features

# Email classification endpoint
@app.route('/email', methods=['POST'])
def classify_email():
    data = request.json
    text = data['text']
    text_transformed = tfidf_vectorizer.transform([text])
    prediction = email_model.predict(text_transformed)
    result = {'prediction': prediction.tolist()}
    return jsonify(result)

# URL classification endpoint
@app.route('/url', methods=['POST'])
def predict_url():
    data = request.json
    url = data['text']
    features = preprocess_url(url)
    scaled_features = url_scaler.transform([features])
    prediction = url_model.predict(scaled_features)
    result = {
        'prediction': 'malicious' if prediction > 0.5 else 'benign'
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
