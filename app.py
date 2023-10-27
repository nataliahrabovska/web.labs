from flask import Flask, request, jsonify
from flask_cors import CORS , cross_origin

app = Flask(__name__)
CORS(app, origins="*")



laptops = [
    {
        "id": 1,
        "model": "HP",
        "screen_size": 15.6,
        "ram": 8,
        "storage": "256GB SSD",
        "priceUAH": 357
    },
    {
        "id": 2,
        "model": "Dell",
        "screen_size": 14,
        "ram": 16,
        "storage": "512GB SSD",
        "priceUAH": 899
    },
    {
        "id": 3,
        "model": "Lenovo",
        "screen_size": 13.3,
        "ram": 8,
        "storage": "128GB SSD",
        "priceUAH": 499
    },
    {
        "id": 4,
        "model": "Asus",
        "screen_size": 15.6,
        "ram": 12,
        "storage": "1TB HDD",
        "priceUAH": 599
    },
    {
        "id": 5,
        "model": "Acer",
        "screen_size": 17.3,
        "ram": 8,
        "storage": "256GB SSD",
        "priceUAH": 449
    }
]


@app.route('/laptops', methods=['GET'])
def get_laptops():
    response = jsonify(laptops)
    return response

@app.route('/laptops', methods=['POST'])
def create_laptop():
    new_laptop = request.json
    new_laptop["id"] = len(laptops) + 1
    laptops.append(new_laptop)
    response = jsonify(new_laptop)
    return  response,  201

@app.route('/laptops/<int:laptop_id>', methods=['GET'])
def get_laptop(laptop_id):
    for laptop in laptops:
        if laptop["id"] == laptop_id:
            response = jsonify(laptop)
            return response
    return jsonify({"message": "Ноутбук не знайдено"}), 404  

@app.route('/laptops/<int:laptop_id>', methods=['PUT'])
def update_laptop(laptop_id):
    for laptop in laptops:
        if laptop["id"] == laptop_id:
            updated_laptop = request.json
            laptop.update(updated_laptop)
            response = jsonify(laptop)
            return response
    return jsonify({"message": "Ноутбук не знайдено"}), 404

@app.route('/laptops/<int:laptop_id>', methods=['DELETE'])
def delete_laptop(laptop_id):
    for laptop in laptops:
        if laptop["id"] == laptop_id:
            laptops.remove(laptop)
            response = jsonify({"message": "Ноутбук було видалено"})
            return response , 200
    return jsonify({"message": "Ноутбук не знайдено"}), 404

if __name__ == '__main__':
    app.run(debug=True)
