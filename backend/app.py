from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")


products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 55000,
        "category": "Electronics",
        "description": "Powerful laptop for work and study"
    },
    {
        "id": 2,
        "name": "Smartphone",
        "price": 25000,
        "category": "Electronics",
        "description": "Modern smartphone with excellent performance"
    },
    {
        "id": 3,
        "name": "Headphones",
        "price": 2500,
        "category": "Accessories",
        "description": "Wireless headphones with clear sound"
    },
    {
        "id": 4,
        "name": "Smart Watch",
        "price": 4500,
        "category": "Wearables",
        "description": "Smart watch for everyday activities"
    }
]


# ================= FRONTEND =================

@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/frontend/<path:filename>")
def frontend_files(filename):
    return send_from_directory(FRONTEND_DIR, filename)


# ================= API =================

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })


@app.route("/api/products")
def get_products():
    return jsonify(products)


@app.route("/api/products/<int:product_id>")
def get_product(product_id):

    product = next(
        (
            product
            for product in products
            if product["id"] == product_id
        ),
        None
    )

    if product is None:
        return jsonify({
            "error": "Product not found"
        }), 404

    return jsonify(product)


@app.route("/api/orders", methods=["POST"])
def create_order():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Order data is required"
        }), 400

    return jsonify({
        "message": "Order placed successfully",
        "order": data
    }), 201


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )
