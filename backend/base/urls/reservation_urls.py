
from django.urls import path
from base.views import reservation_views  

urlpatterns = [
    path('', reservation_views.reservation_list_or_create, name='reservations'),
]