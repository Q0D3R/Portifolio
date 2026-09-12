from flask import render_template, Blueprint

views_bp = Blueprint('views', __name__, template_folder='templates')

@views_bp.route('/')
def index():
    return render_template('index.html')

