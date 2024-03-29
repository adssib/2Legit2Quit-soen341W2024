from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import PaymentViewSet

router = DefaultRouter()
router.register(r'payments', PaymentViewSet)

urlpatterns = [
     path('api/products/', include('base.urls.product_urls')),
]
