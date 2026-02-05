from rest_framework.routers import DefaultRouter
from .views import InternalRequestViewSet

router = DefaultRouter()
router.register(r'requests', InternalRequestViewSet)

urlpatterns = router.urls

