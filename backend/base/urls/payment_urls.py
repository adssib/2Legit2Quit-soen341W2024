from django.urls import path
from base.views import payment_views

urlpatterns = [
    path('payments/', payment_views.process_payment, name='process-payment'),
    path('payments/add-funds/<int:user_id>/',payment_views.add_funds, name='add-funds'),
    path('payments/deduct-funds/<int:user_id>/', payment_views.deduct_funds, name='deduct-funds'),
    path('payments/', payment_views.list_all_payments, name='list-all-payments'),
    path('payments/<int:payment_id>/',  payment_views.retrieve_payment, name='retrieve-payment'),
]
