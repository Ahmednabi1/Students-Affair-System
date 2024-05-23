from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Student(models.Model):
    ID = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    GPA = models.FloatField()
    birthDate = models.DateField()
    gender = models.CharField(max_length=1)
    level = models.IntegerField(validators=[MaxValueValidator(4), MinValueValidator(1)])
    status = models.CharField(max_length=8, default='Active')
    department = models.CharField(max_length=3)
    email = models.CharField(max_length=255)
    mobilePhone = models.CharField(max_length=255)