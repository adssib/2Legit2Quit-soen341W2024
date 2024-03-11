from django.urls import path
from base.views.reservation_views import create_reservation 

urlpatterns = [
    path('', create_reservation, name='create_reservation'),
]