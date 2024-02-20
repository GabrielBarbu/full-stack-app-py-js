# Import modules
from flask import request, jsonify
from config import app, db # Import the app and db objects from the config module
from models import List # Import the List model from the models module

# Route to get all lists
@app.route("/lists", methods=["GET"])
def get_lists():
    lists = List.query.all()
    json_lists = list(map(lambda x: x.to_json(), lists))
    return jsonify({"lists": json_lists})

# Route to create a new list
@app.route("/create_list", methods=["POST"])
def create_list():
    text = request.json.get("text")
    
    if not text:
        return jsonify({"message": "You must include some text"}), 400
    
    new_list = List(text=text)
    try:
        db.session.add(new_list)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400
    
    return jsonify({"message": "List created successfully!"}), 201

# Route to update an existing list
@app.route("/update_list/<int:list_id>", methods=["PATCH"])
def update_list(list_id):
    list = List.query.get(list_id)
    
    if not list:
        return jsonify({"message": "List not found"}), 404
    
    data = request.json
    list.text = data.get("text", list.text)
    
    db.session.commit()
    
    return jsonify({"message": "List updated successfully!"}), 200

# Route to delete a list
@app.route("/delete_list/<int:list_id>", methods=["DELETE"])
def delete_list(list_id):
    list = List.query.get(list_id)
    
    if not list:
        return jsonify({"message": "List not found"}), 404
    
    db.session.delete(list)
    db.session.commit()
    
    return jsonify({"message": "List deleted successfully!"}), 200

if __name__ == "__main__": # Run the application
    with app.app_context(): 
        db.create_all() # Create the database tables
    
    app.run(debug=True) # Run the application in debug mode