from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import pytesseract
from PIL import Image
import io
import base64
import cv2
import numpy as np
import re
from pytesseract import Output

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    img_np = np.frombuffer(file.read(), np.uint8)
    file.seek(0) 
    img = cv2.imdecode(img_np, cv2.IMREAD_UNCHANGED)

    height, width, _ = img.shape
    config = r'--psm 6'
    boxes = pytesseract.image_to_data(img, config=config, output_type=Output.DICT)
    words = []
    for i in range(len(boxes['text'])):
        if int(boxes['conf'][i]) > 0:
            x, y, w, h = boxes['left'][i], boxes['top'][i], boxes['width'][i], boxes['height'][i]
            word = boxes['text'][i]
            if re.match(r'^\[\d,.-\]+', word):
                words.append((word, (x, y, w, h), 'number'))
            else:
                words.append((word, (x, y, w, h), 'text'))
    for word, (x, y, w, h), word_type in words:
        if word_type == 'number':
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
        else:
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(img, word, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Extraire le texte de l'image originale
    extracted_text = pytesseract.image_to_string(Image.open(io.BytesIO(file.read())))

    # Encoder l'image modifiée en base64
    _, img_encoded = cv2.imencode('.png', img)
    image_base64 = base64.b64encode(img_encoded).decode('utf-8')

    return jsonify({'extracted_text': extracted_text, 'image_base64': image_base64}), 200

if __name__ == '__main__':
    app.run(debug=True)