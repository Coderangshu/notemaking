# Django React Notes App

## Overview
A modern notes application built with **Django REST Framework** and **React.js**, styled using **Tailwind CSS**.
The app supports text and scribble notes, user authentication, and theme toggling.


## About the Project
This project provides a secure, easy-to-use notes application with the following features:

- User authentication (signup, login, logout).
- Persistent login using JWT-based tokens.
- Create, edit, and manage notes (text and scribble).
- Dark and light theme toggle.
- Secure API endpoints with CSRF protection.
- Features Screenshots


## Built With
Django: Backend framework for API development.
Django REST Framework: Simplifies API creation.
React: Frontend library for building a single-page application.
Tailwind CSS: Utility-first CSS framework for styling.
SQLite3: Lightweight database for development.


## Setting Up the Backend API
1. Clone the project repository:
```bash
git clone https://github.com/coderangshu/notemaking
```

2. Navigate to the project directory:
```bash
cd notemaking
```

3. Create a virtual environment:
```bash
python -m venv venv
```

4. Activate the virtual environment:
- On Linux/Mac:
```bash
source venv/bin/activate
```
- On Windows:
```bash
venv\Scripts\activate
```

5. Install dependencies:
```bash
pip install -r requirements.txt
```

6. Apply migrations to set up the database:
```bash
python manage.py migrate
```

7. Create a superuser:
```bash
python manage.py createsuperuser
```

8. Start the backend server:
```bash
python manage.py runserver
```
The API will be available at http://127.0.0.1:8000.


## Setting Up the Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```
The application will be available at http://127.0.0.1:3000.


## Contributing
Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m "Add YourFeature").
4. Push to the branch (git push origin feature/YourFeature).
5. Open a Pull Request.
