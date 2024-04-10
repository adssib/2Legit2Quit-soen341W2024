from django.test import TestCase
from django.contrib.auth.models import User
from base.models import Product, Review, BranchAddress, Order, OrderItem, Reservation, Payment, UserAccount
from datetime import datetime, timedelta

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

    def test_branch_address_creation(self):
        branch_address = BranchAddress.objects.create(
            branch_name='Test Branch',
            address='Test Address',
            city='Test City',
            postalCode='12345',
            country='Test Country'
        )
        self.assertEqual(branch_address.branch_name, 'Test Branch')

    def test_order_creation(self):
        order = Order.objects.create(
            user=self.user,
            paymentMethod='Test Payment Method',
            taxPrice=5.0,
            totalPrice=105.0,
            isPaid=True,
            paidAt=datetime.now()
        )
        self.assertTrue(order.isPaid)

    def test_order_item_creation(self):
        product = Product.objects.create(
            user=self.user,
            name='Test Product',
            price=99.99,
            countInStock=20
        )
        order = Order.objects.create(
            user=self.user,
            paymentMethod='Test Payment Method',
            taxPrice=5.0,
            totalPrice=105.0,
            isPaid=True,
            paidAt=datetime.now()
        )
        order_item = OrderItem.objects.create(
            product=product,
            order=order,
            name='Test Order Item',
            qty=2,
            price=product.price * 2
        )
        self.assertEqual(order_item.name, 'Test Order Item')

    def test_reservation_creation(self):
        product = Product.objects.create(
            user=self.user,
            name='Test Product',
            price=99.99,
            countInStock=20
        )
        reservation = Reservation.objects.create(
            user=self.user,
            product=product,
            start_date=datetime.now().date(),
            end_date=(datetime.now() + timedelta(days=5)).date(),
            UserArrivedAtLocation=True,
            UserInspectedTheCar=True,
            UserProvidedDriverLicense=True,
            UserProvidedCreditCard=True,
            UserSignedAgreement=True,
            UserReturnedTheCar=True,
            NoDamages=True
        )
        self.assertTrue(reservation.UserArrivedAtLocation)

    def test_payment_creation(self):
        payment = Payment.objects.create(
            card_name='Test Card',
            card_number='1234XXXXXXXX5678',
            exp_month='12',
            exp_year='2024',
            amount=100.0,
            date=datetime.now().date()
        )
        self.assertEqual(payment.amount, 100.0)

    def test_user_account_creation(self):
        user_account = UserAccount.objects.create(
            user=self.user,
            balance=500.0
        )
        self.assertEqual(user_account.balance, 500.0)
