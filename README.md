Students Affair System
The Students Affair System is a web application designed to streamline and manage student affairs within educational institutions. Built using the Django framework, this system offers a comprehensive solution for handling student records, courses, attendance, grades, and more.

Features
Student Management: Add, update, and delete student records with ease.
Course Management: Manage courses, including adding, updating, and deleting course information.
Attendance Tracking: Keep track of student attendance and generate reports.
Grade Management: Record and manage student grades and generate performance reports.
User Authentication: Secure login and user management for different roles (e.g., admin, teacher, student).
Responsive Design: A user-friendly interface that works on various devices.

Installation
To run this project locally, follow these steps:

Clone the repository:
git clone https://github.com/Ahmednabi1/Students-Affair-System.git
cd Students-Affair-System

Create a virtual environment:
python -m venv venv
venv\Scripts\activate

Install dependencies:
pip install -r requirements.txt

Apply migrations:
python manage.py migrate

Create a superuser:
python manage.py createsuperuser

Run the development server:
python manage.py runserver

Access the application:
Open your web browser and go to http://127.0.0.1:8000/.

