from django.test import TestCase, Client
from django.urls import reverse
from base.models import Product  # Import your Product model

class TestProductURLs(TestCase):
    def setUp(self):
        # Create a sample product for testing
        self.product = Product.objects.create(
            name='Test Product',
            price=100,
            brand='Test Brand',
            category='Test Category',
            description='Test Description',
            countInStock=10,
        )

        # Create a Django test client
        self.client = Client()

    def test_get_products_url(self):
        response = self.client.get(reverse('products'))
        self.assertEqual(response.status_code, 200)

    def test_create_product_url(self):
        response = self.client.post(reverse('product-create'))
        self.assertEqual(response.status_code, 401)  # Adjust status code as needed

    def test_get_product_url(self):
        response = self.client.get(reverse('product', args=[self.product.pk]))
        self.assertEqual(response.status_code, 200)

    def test_update_product_url(self):
        response = self.client.put(reverse('product-update', args=[self.product.pk]))
        self.assertEqual(response.status_code, 401)  # Adjust status code as needed

    def test_delete_product_url(self):
        response = self.client.delete(reverse('product-delete', args=[self.product.pk]))
        self.assertEqual(response.status_code, 401)  # Adjust status code as needed
