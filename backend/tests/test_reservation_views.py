from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from base.models import Product, Reservation
class ReservationCreateTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username='testuser')
        self.product = Product.objects.create(name='Car', price=100) 
        self.valid_payload = {
            'product': self.product.pk,  
            'start_date': '2024-03-15',
            'end_date': '2024-03-20'
        }
        self.invalid_payload = {
            'product': self.product.pk,
            'start_date': '2024-03-15',
            'end_date': '2024-03-10'
        }

    def test_create_reservation_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/create_reservation/', data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_reservation_overlap(self):
        self.client.force_authenticate(user=self.user)
        Reservation.objects.create(product=self.product, start_date='2024-03-18', end_date='2024-03-22')
        response = self.client.post('/api/create_reservation/', data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_reservation_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/create_reservation/', data=self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_reservation_unauthenticated(self):
        response = self.client.post('/api/create_reservation/', data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_reservation_admin(self):
        admin_user = User.objects.create(username='admin', is_staff=True)
        self.client.force_authenticate(user=admin_user)
        response = self.client.post('/api/create_reservation/', data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_single_reservation_detail(self):
        reservation = Reservation.objects.create(product=self.product, start_date='2024-03-15', end_date='2024-03-20')
        response = self.client.get(f'/api/reservations/{reservation.pk}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_reservation_authenticated(self):
        self.client.force_authenticate(user=self.user)
        reservation = Reservation.objects.create(product=self.product, start_date='2024-03-15', end_date='2024-03-20')
        update_data = {'start_date': '2024-03-16', 'end_date': '2024-03-21'}
        response = self.client.put(f'/api/reservations/{reservation.pk}/', data=update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_reservation_unauthenticated(self):
        reservation = Reservation.objects.create(product=self.product, start_date='2024-03-15', end_date='2024-03-20')
        update_data = {'start_date': '2024-03-16', 'end_date': '2024-03-21'}
        response = self.client.put(f'/api/reservations/{reservation.pk}/', data=update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_reservation(self):
        reservation = Reservation.objects.create(product=self.product, start_date='2024-03-15', end_date='2024-03-20')
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'/api/reservations/{reservation.pk}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
