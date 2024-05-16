from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline

app = Flask(__name__)

# Charger les modèles et les tokenizers
email_model_name = "email.pkl"
url_model_name = "url.h5"

email_tokenizer = AutoTokenizer.from_pretrained(email_model_name)
email_model = AutoModelForSequenceClassification.from_pretrained(email_model_name)

url_tokenizer = AutoTokenizer.from_pretrained(url_model_name)
url_model = AutoModelForSequenceClassification.from_pretrained(url_model_name)

email_classifier = pipeline("text-classification", model=email_model, tokenizer=email_tokenizer)
url_classifier = pipeline("text-classification", model=url_model, tokenizer=url_tokenizer)
    
@app.route('/email', methods=['POST'])
def classify_email():
    data = request.json
    text = data['text']
    result = email_classifier(text)
    return jsonify(result)

@app.route('/url', methods=['POST'])
def classify_url():
    data = request.json
    text = data['text']
    result = url_classifier(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
