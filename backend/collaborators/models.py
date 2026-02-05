from django.db import models
from django.contrib.auth.models import User


class Collaborator(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    department = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.department}"
