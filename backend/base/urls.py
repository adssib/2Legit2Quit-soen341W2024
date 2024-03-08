from django.urls import path
from . import views
from .views import create_reservation

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>/', views.getProduct, name="product"),
        path('reservations/', views.create_reservation, name='create_reservation'),
]