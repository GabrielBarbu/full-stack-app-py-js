from config import db
        
class List(db.Model):
    # Define the columns of the List table
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(240), unique=False, nullable=False)
    title = db.Column(db.String(240), unique=False, nullable=False)
    
    def to_json(self):
        # Convert the List object to a JSON representation
        return {
            "id": self.id,
            "text": self.text,
            "title": self.title
        }