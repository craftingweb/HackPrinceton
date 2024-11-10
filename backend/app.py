from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import requests
import zipfile
import io
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app) 

MODEL_ZIP_URL = "https://github.com/craftingweb/HackPrinceton/blob/main/wait_model_final.pkl.zip"
MODEL_DIR = "backend/model"
MODEL_FILE_PATH = os.path.join(MODEL_DIR, "wait_model_final.pkl")

#load the trained model
def load_model():
    #check if model already exists to prevent re downloads
    if not os.path.exists(MODEL_FILE_PATH):
        response = requests.get(MODEL_ZIP_URL)
        if response.status_code != 200:
            raise Exception("Failed to download model zip file")

        #ensure the model directory exists
        os.makedirs(MODEL_DIR, exist_ok = True)
        
        #unzip the file 
        with zipfile.ZipFile(io.BytesIO(response.content)) as zip_ref:
            zip_ref.extractall(MODEL_DIR)
        
    #load the model from the extracted pkl file
    model = joblib.load(MODEL_FILE_PATH)
    return model
    
model = load_model()

#prediction endpoint
@app.route('/predict', methods=['POST'])

def predict():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    #extract latitude and longitude from the request
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    if latitude is None or longitude is None:
        return jsonify({"error": "Latitude and Longitude are required"}), 400
    
    #MARIA need to update input data - temp using long and lat
    input_data = pd.DataFrame([[latitude, longitude]], columns=['latitude', 'longitude'])

    #make a prediction
    try:
        prediction = model.predict(input_data)
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    #return the prediction as JSON
    return jsonify({"prediction": prediction[0]})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
