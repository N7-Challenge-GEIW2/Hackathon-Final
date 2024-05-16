from flask import Flask, request, jsonify
import joblib
import pickle
import numpy as np
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 
# Charger les modèles et les tokenizers
email_model_path = "email.pkl"
url_model_path = "url.h5"
tfidf_vectorizer_path = "tfidf_vectorizer.pkl"

# Charger le modèle scikit-learn et le vectorizer
email_model = joblib.load(email_model_path)
with open(tfidf_vectorizer_path, 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

# Charger le modèle Keras
url_model = load_model(url_model_path)

def preprocess_text(text, tokenizer, maxlen=100):
    sequences = tokenizer.texts_to_sequences([text])
    padded_seq = pad_sequences(sequences, maxlen=maxlen)
    return padded_seq

@app.route('/email', methods=['POST'])
def classify_email():
    data = request.json
    text = data['text']
    text_transformed = tfidf_vectorizer.transform([text])
    prediction = email_model.predict(text_transformed)
    result = {'prediction': prediction.tolist()}
    return jsonify(result)

@app.route('/url', methods=['POST'])
def classify_url():
    data = request.json
    text = data['text']
    # Assurez-vous d'avoir une méthode de tokenization pour le modèle Keras
    padded_seq = preprocess_text(text, url_tokenizer)
    prediction = url_model.predict(padded_seq)
    result = {'prediction': prediction.tolist()}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
