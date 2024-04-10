from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from base.models import Payment, UserAccount
from django.utils import timezone

class PaymentViewsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_account = UserAccount.objects.create(user_id=1, balance=100.0)  
        self.payment_data = {'amount': 50.0}  

     
