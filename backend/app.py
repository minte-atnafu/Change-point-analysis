from flask import Flask, jsonify, send_from_directory
import pandas as pd
import os

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NOTEBOOK_DIR = os.path.abspath(os.path.join(BASE_DIR, '../notebook'))

@app.route('/api/change_points')
def get_change_points():
    csv_path = os.path.join(NOTEBOOK_DIR, 'change_points.csv')
    df = pd.read_csv(csv_path)
    df.fillna('N/A', inplace=True)  # 👈 Replaces NaN with 'N/A'
    return jsonify(df.to_dict(orient='records'))

@app.route('/api/plot')
def get_plot():
    return send_from_directory(NOTEBOOK_DIR, 'price_with_change_points.png')

@app.route('/')
def home():
    return "Flask backend is running!"
    
if __name__ == '__main__':
    app.run(debug=True, port=8080)
