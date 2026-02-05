from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Collaborator
from .serializers import (
    CollaboratorSerializer,
    CollaboratorCreateSerializer
)


class CollaboratorViewSet(ModelViewSet):
    queryset = Collaborator.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return CollaboratorCreateSerializer
        return CollaboratorSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        collaborator = serializer.save()

        # 🔴 AQUI ESTÁ A CORREÇÃO
        response_serializer = CollaboratorSerializer(collaborator)

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED
        )
