import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample data storage
attendance_records = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_attendance():
    data = request.json
    record = {
        'name': data.get('name'),
        'date': data.get('date'),
        'status': data.get('status')
    }
    attendance_records.append(record)
    return jsonify({'success': True, 'records': attendance_records})

@app.route('/records', methods=['GET'])
def get_records():
    return jsonify(attendance_records)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
