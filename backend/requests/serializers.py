from rest_framework import serializers
from .models import InternalRequest


class InternalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternalRequest
        fields = [
            'id',
            'title',
            'description',
            'status',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
