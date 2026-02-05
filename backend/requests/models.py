from django.db import models
from django.contrib.auth.models import User
from collaborators.models import Collaborator


class InternalRequest(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Aberta'),
        ('IN_PROGRESS', 'Em andamento'),
        ('DONE', 'Concluída'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='OPEN'
    )

    collaborator = models.ForeignKey(
        Collaborator,
        on_delete=models.CASCADE,
        related_name='requests'
    )

    requested_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='internal_requests'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Request #{self.id} - {self.get_status_display()}"
