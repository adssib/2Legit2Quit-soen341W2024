from django.urls import path
from base.views import reservation_views  

urlpatterns = [
    path('', reservation_views.reservation_list_or_create, name='reservations'),    
    path('<int:reservation_id>/', reservation_views.single_reservation_detail, name='single_reservation_detail'),
    path('<int:reservation_id>/delete/', reservation_views.delete_reservation, name='delete_reservation'),
]