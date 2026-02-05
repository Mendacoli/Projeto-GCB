from django.contrib import admin
from .models import Collaborator


@admin.register(Collaborator)
class CollaboratorAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'department', 'role', 'active')
    search_fields = ('name', 'department', 'user__username')
    list_filter = ('active', 'department')
