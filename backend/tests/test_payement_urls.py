from django.test import SimpleTestCase
from django.urls import reverse, resolve
from base.views.payment_views import create_payment, list_payments, delete_payment

class TestPaymentUrls(SimpleTestCase):
    def test_create_payment_url_resolves(self):
        url = reverse('create-payment')
        self.assertEqual(resolve(url).func, create_payment)

    def test_list_payments_url_resolves(self):
        url = reverse('list-payments')
        self.assertEqual(resolve(url).func, list_payments)

  