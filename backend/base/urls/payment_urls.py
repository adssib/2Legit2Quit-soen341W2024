from django.urls import path
from base.views.payment_views import create_payment, list_payments, delete_payment

urlpatterns = [
    path('create/', create_payment, name='create-payment'),
    path('list/', list_payments, name='list-payments'),
    path('delete/<int:pk>/', delete_payment, name='delete-payment'),
]
