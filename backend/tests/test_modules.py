from django.test import TestCase
from django.contrib.auth.models import User
from base.models import Product, Review
from datetime import datetime

class ModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')

    def test_product_creation(self):
        product = Product.objects.create(
            user=self.user,
            name='Test Product',
            image='/test/image.jpg',
            brand='Test Brand',
            category='Test Category',
            description='Test Description',
            rating=4.5,
            numReviews=10,
            price=99.99,
            countInStock=20
        )
        self.assertEqual(product.name, 'Test Product')

    def test_review_creation(self):
        product = Product.objects.create(
            user=self.user,
            name='Test Product',
            image='/test/image.jpg',
            brand='Test Brand',
            category='Test Category',
            description='Test Description',
            rating=4.5,
            numReviews=10,
            price=99.99,
            countInStock=20
        )
        review = Review.objects.create(
            product=product,
            user=self.user,
            name='Test Review',
            rating=4,
            comment='Test Comment'
        )
        self.assertEqual(review.name, 'Test Review')

