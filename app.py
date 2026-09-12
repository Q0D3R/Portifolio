import os
from flask import Flask, request, jsonify, redirect
from dotenv import load_dotenv
from datetime import datetime
from pymongo import MongoClient
from view import views_bp
load_dotenv()

MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.environ.get('MONGO_DB_NAME', 'portfolio_db')

def get_db_connection():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    return client, db

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'super_secret_omniremit_key')

app.register_blueprint(views_bp)

@app.before_request
def check_subscription():
    allowed_endpoints = ['static']
    if request.endpoint in allowed_endpoints:
        return
        
    client = None
    try:
        client, db = get_db_connection()
        # Fetch the first company settings document
        company = db.company_settings.find_one(sort=[("_id", 1)])
        if company and company.get('subscription_end_date'):
                sub_end = company['subscription_end_date']
                if isinstance(sub_end, str):
                    for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%d', '%d/%m/%Y', '%m/%d/%Y', '%Y-%m-%d %H:%M:%S.%f'):
                        try:
                            sub_end = datetime.strptime(sub_end, fmt)
                            break
                        except ValueError:
                            pass
                
                if isinstance(sub_end, datetime) and datetime.now() > sub_end:
                    if request.path.startswith('/api/'):
                        return jsonify({"error": "Subscription Expired", "redirect": "/subscription-expired"}), 403
                    return redirect('/subscription-expired')
    except Exception as e:
        print(f"Subscription check error: {e}")
    finally:
        if client:
            client.close()

@app.template_filter('social_url')
def social_url_filter(username, platform):
    if not username:
        return '#'
    urls = {
        'facebook': f'https://facebook.com/{username}',
        'twitter': f'https://twitter.com/{username}',
        'instagram': f'https://instagram.com/{username}',
        'linkedin': f'https://linkedin.com/in/{username}',
        'github': f'https://github.com/{username}'
    }
    return urls.get(platform, '#')

@app.context_processor
def inject_year():
    from datetime import datetime
    return {'current_year': datetime.now().year}


# Route 5: Display the HTML form for the Dashboard page

if __name__ == '__main__':
    # Railway provides the port via the PORT environment variable
    port = int(os.environ.get("PORT", 5000))
    # Bind to 0.0.0.0 so the outside world can connect, and turn off debug in production
    app.run(host='0.0.0.0', port=port, debug=True)
