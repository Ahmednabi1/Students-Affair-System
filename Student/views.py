from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import Student
from django.views.decorators.csrf import csrf_exempt
import json
from django.template import loader
from django.shortcuts import render, redirect
from django.template import RequestContext
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

@csrf_exempt
def home(request):
    return render(request, 'HomePage.html')

@csrf_exempt
def add_student(request):
    if request.method == 'POST':
        ID = request.POST.get('fname2')

        # Check if student with the given ID already exists
        if Student.objects.filter(ID=ID).exists():
            # Handle the case when a student with the same ID already exists
            return render(request, 'AddaNewStudent.html', {'error': 'A student with this ID already exists!'})

        # Rest of your code for creating a new student
        name = request.POST.get('fname9')
        GPA = request.POST.get('fname3')
        birth_date = request.POST.get('dob')
        gender = request.POST.get('gender')
        level = request.POST.get('student-level')
        status = request.POST.get('status')
        department = request.POST.get('department')
        email = request.POST.get('fname8')
        mobile_phone = request.POST.get('phone number')


        if (level < '3'):
            department = '-'

        student = Student(
            name=name,
            ID=ID,
            GPA=GPA,
            birthDate=birth_date,
            gender=gender,
            level=level,
            status=status,
            department=department,
            email=email,
            mobilePhone=mobile_phone
        )
        student.save()
        return redirect('home')

    return render(request, 'AddaNewStudent.html')

@csrf_exempt
def change_status(request, student_id):
    if request.method == 'POST':
        student = Student.objects.get(ID=student_id)
        status = request.POST.get('status')
        student.status = status
        student.save()

    students = Student.objects.all()
    return render(request, 'DisplayAllStudents.html', {'students': students})

@csrf_exempt
def display_students(request):
    students = Student.objects.all()
    return render(request, 'DisplayAllStudents.html', {'students': students})

@csrf_exempt
def update(request):
    students = Student.objects.all().values()
    template = loader.get_template('Update.html')
    context = {
    'students': students
    }
    return HttpResponse(template.render(context, request))

@csrf_exempt
def search(request):
    students = []
    if request.method == 'POST':
        searched = request.POST['searched']
        students = Student.objects.filter(name__contains=searched, status='Active')
    return render(request, 'Search.html', {'students': students})


@csrf_exempt
def department_details(request, student_id):
    print(student_id)
    student = Student.objects.get(ID=student_id)
    departments = ['CS', 'IS', 'IT', 'DS', 'AI']
    if request.method == 'POST':
        selected_department = request.POST.get('department')
        student.department = selected_department
        student.save()
        return redirect('search_for_student')
    return render(request, 'DepartmentAssignment.html', {
        'student': student,
        'departments': departments
    })

@csrf_exempt
def cover(request):
    return render(request, 'cover.html')

def error(request):
    return render(request, 'error.html')

@csrf_exempt
def get_student_data(request, student_id):
    student = get_object_or_404(Student, ID=student_id)
    student_data = {
        'name': student.name,
        'ID': student.ID,
        'GPA': student.GPA,
        'birthDate': student.birthDate,
        'gender': student.gender,
        'level': student.level,
        'status': student.status,
        'department': student.department,
        'email': student.email,
        'mobilePhone': student.mobilePhone,
    }
    return JsonResponse(student_data)


@csrf_exempt
def update_student(request, student_id):
    if request.method == 'PUT':
        student = get_object_or_404(Student, ID=student_id)

        # Get the updated data from the request
        updated_data = json.loads(request.body)
        student.name = updated_data['name']
        student.GPA = updated_data['GPA']
        student.birthDate = updated_data['birthDate']
        student.gender = updated_data['gender']
        student.level = updated_data['level']
        student.status = updated_data['status']
        student.department = updated_data['department']
        student.email = updated_data['email']
        student.mobilePhone = updated_data['mobilePhone']
        
        # Save the updated student record
        student.save()

        # Return a success response
        return JsonResponse({'message': 'Student data updated successfully'})

    # If the request method is not PUT, return an error response
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_student(request, student_id):
    if request.method == 'DELETE':
        student = get_object_or_404(Student, ID=student_id)
        student.delete()
        return JsonResponse({'message': 'Student deleted successfully'})

    return JsonResponse({'error': 'Invalid request method'}, status=405)


def handle_not_found(request, exception):
    return render(request, '404.html', status=404)