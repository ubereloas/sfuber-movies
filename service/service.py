from flask import Flask
from flask.ext.cors import CORS
from flask import jsonify
app = Flask(__name__)
CORS(app)

@app.route('/awesome-message')
def awesome_message():
    return jsonify(message='This is going to be an awesome app!')

if __name__ == '__main__':
    app.run()
