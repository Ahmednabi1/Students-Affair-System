from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('Student.urls')),
    path('admin/', admin.site.urls),
]

handler404="Student.views.handle_not_found"