How to build

# Django
cd backend/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# React
cd ../frontend/hinabe-frontend/
npm install
npm run dev