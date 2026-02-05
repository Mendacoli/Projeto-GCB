from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import InternalRequest
from .serializers import InternalRequestSerializer
from collaborators.models import Collaborator


class InternalRequestViewSet(ModelViewSet):
    queryset = InternalRequest.objects.all().order_by('-created_at')
    serializer_class = InternalRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        collaborator = get_object_or_404(
            Collaborator,
            user=self.request.user
        )

        serializer.save(
            collaborator=collaborator,
            requested_by=self.request.user
        )
