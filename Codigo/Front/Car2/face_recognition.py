import os
import time
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
import cv2

# Carregar variáveis de ambiente
load_dotenv()
face_endpoint = os.getenv('FACE_ENDPOINT')
face_api_key = os.getenv('FACE_APIKEY')

# Autenticação com a API do Azure
credentials = CognitiveServicesCredentials(face_api_key)
face_client = FaceClient(face_endpoint, credentials)

person_group_id = 'my-unique-person-group'

app = Flask(__name__)

# Criar um grupo de pessoas
@app.route('/create_person_group', methods=['POST'])
def create_person_group():
    try:
        face_client.person_group.create(person_group_id, name=person_group_id)
        return jsonify({"message": "Person group created successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Adicionar pessoas ao grupo
@app.route('/add_faces', methods=['POST'])
def add_faces_to_person_group():
    try:
        image_base_url = request.json['image_base_url']
        person_dictionary = request.json['person_dictionary']
        
        for name, images in person_dictionary.items():
            person = face_client.person_group_person.create(person_group_id, name=name)
            for image in images:
                url = f'{image_base_url}{image}'
                face_client.person_group_person.add_face_from_url(person_group_id, person.person_id, url)
                
        return jsonify({"message": "Faces added to person group successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Treinar o grupo de pessoas
@app.route('/train_person_group', methods=['POST'])
def train_person_group():
    try:
        face_client.person_group.train(person_group_id)
        while True:
            status = face_client.person_group.get_training_status(person_group_id)
            if status.status == 'succeeded':
                break
            elif status.status == 'failed':
                raise Exception('Training failed')
            time.sleep(1)
        return jsonify({"message": "Person group trained successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Identificar rostos em uma imagem
@app.route('/identify_faces', methods=['POST'])
def identify_faces():
    try:
        image_path = request.json['image_path']
        with open(image_path, 'rb') as image:
            detected_faces = face_client.face.detect_with_stream(image, detection_model='detection_03')
        face_ids = [face.face_id for face in detected_faces]

        if face_ids:
            results = face_client.face.identify(face_ids, person_group_id)
            identified_faces = []
            for result in results:
                if result.candidates:
                    person = face_client.person_group_person.get(person_group_id, result.candidates[0].person_id)
                    identified_faces.append({"person_name": person.name, "confidence": result.candidates[0].confidence})
                else:
                    identified_faces.append({"face_id": result.face_id, "message": "No person identified"})
            return jsonify({"identified_faces": identified_faces}), 200
        else:
            return jsonify({"message": "No faces detected."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
