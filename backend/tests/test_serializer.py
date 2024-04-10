from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import Product, Reservation, Review
from base.serializers import ProductSerializer, ReservationSerializer, UserSerializer, UserSerializerWithToken, ReviewSerializer

class SerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password', email='test@example.com', first_name='Test')

        self.product = Product.objects.create(
            user=self.user,
            name='Test Product',
            brand='Test Brand',
            category='Test Category',
            description='Test Description',
            rating=4.5,
            numReviews=10,
            price=99.99,
            countInStock=20
        )

        self.reservation = Reservation.objects.create(
            user=self.user,
            product=self.product,
            start_date='2022-01-01',
            end_date='2022-01-05'
        )

        self.review = Review.objects.create(
            product=self.product,
            user=self   .user,
            rating=4,
            comment='Test Comment'
        )

    def test_product_serializer(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['name'], 'Test Product')

    def test_reservation_serializer(self):
        serializer = ReservationSerializer(instance=self.reservation)
        self.assertEqual(serializer.data['start_date'], '2022-01-01')

    def test_user_serializer_with_token(self):
        serializer = UserSerializerWithToken(instance=self.user)
        self.assertIn('token', serializer.data)

