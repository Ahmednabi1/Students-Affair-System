from django.urls import path
from . import views

urlpatterns = [
    path('', views.cover, name='cover'),
    path('home', views.home, name='home'),
    path('add_student/', views.add_student, name='add_student'),
    path('display_students/', views.display_students, name='display_students'),
    path('change_status/<str:student_id>/', views.change_status, name='change_status'),
    path('update_student/', views.update, name='update_student'),
    path('search_for_student/', views.search, name='search_for_student'),
    path('get_student_data/<int:student_id>/', views.get_student_data, name='get_student_data'),
    path('update_student/<str:student_id>/', views.update_student, name='update_student1'),
    path('delete_student/<str:student_id>/', views.delete_student, name='delete_student'),
    path('department_details/<int:student_id>/', views.department_details, name='department_details'),
]