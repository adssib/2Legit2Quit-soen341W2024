from django.test import TestCase
from django.urls import reverse, resolve
from base.views import payment_views

class TestPaymentURLs(TestCase):
    def test_process_payment_url(self):
        url = reverse('process-payment')
        resolver = resolve(url)
        self.assertEqual(resolver.func, payment_views.process_payment)

    def test_add_funds_url(self):
        url = reverse('add-funds', args=[1])  # Assuming user ID is 1 for testing
        resolver = resolve(url)
        self.assertEqual(resolver.func, payment_views.add_funds)

    def test_deduct_funds_url(self):
        url = reverse('deduct-funds', args=[1])  # Assuming user ID is 1 for testing
        resolver = resolve(url)
        self.assertEqual(resolver.func, payment_views.deduct_funds)

    def test_retrieve_payment_url(self):
        url = reverse('retrieve-payment', args=[1])  # Assuming payment ID is 1 for testing
        resolver = resolve(url)
        self.assertEqual(resolver.func, payment_views.retrieve_payment)
