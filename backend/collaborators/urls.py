from rest_framework.routers import DefaultRouter
from .views import CollaboratorViewSet

router = DefaultRouter()
router.register(r'collaborators', CollaboratorViewSet)

urlpatterns = router.urls
