from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Collaborator


class CollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaborator
        fields = ['id', 'name', 'role', 'department', 'active']


class CollaboratorCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    role = serializers.CharField(max_length=100)
    department = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )

        collaborator = Collaborator.objects.create(
            user=user,
            **validated_data
        )

        return collaborator
