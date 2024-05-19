from flask import Flask, request, jsonify
app = Flask(__name__, static_folder='static')

# This will hold our expenses data
expenses = []

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/expenses', methods=['GET', 'POST'])
def handle_expenses():
    if request.method == 'POST':
        # Add a new expense
        expenses.append(request.json)
        return jsonify(success=True)
    else:
        # Get all expenses
        return jsonify(expenses)

@app.route('/expenses/<int:index>', methods=['DELETE'])
def handle_expense(index):
    try:
        # Delete an expense
        expenses.pop(index)
        return jsonify(success=True)
    except IndexError:
        return jsonify(success=False), 404

if __name__ == '__main__':
    app.run(debug=True)
