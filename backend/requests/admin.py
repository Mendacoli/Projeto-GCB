from django.contrib import admin
from .models import InternalRequest


@admin.register(InternalRequest)
class InternalRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'collaborator', 'requested_by', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('description',)
