
from django.urls import path
from base.views import reservation_views  

urlpatterns = [
    path('', reservation_views.reservation_list_or_create, name='reservations'),
    path('<int:reservation_id>/', reservation_views.edit_reservation, name='edit_reservation'),
    path('<int:reservation_id>/check-in/', reservation_views.check_in_reservation, name='check_in_reservation'),
]