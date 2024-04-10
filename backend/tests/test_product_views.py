from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from base.models import Product
from base.serializers import ProductSerializer


class TestProductViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.products_url = reverse('products')
        
        self.product1 = Product.objects.create(
            name='Product 1',
            description='Description for product 1',
            price=20.00,
        )
        self.product2 = Product.objects.create(
            name='Product 2',
            description='Description for product 2',
            price=30.00,
        )

    def test_get_products(self):
        response = self.client.get(self.products_url)
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_product(self):
        product_url = reverse('product', kwargs={'pk': self.product1._id})
        response = self.client.get(product_url)
        product = Product.objects.get(_id=self.product1._id)  
        serializer = ProductSerializer(product)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

