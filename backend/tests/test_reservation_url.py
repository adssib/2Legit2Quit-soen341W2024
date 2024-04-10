from django.test import TestCase, Client
from django.urls import reverse
from base.models import Reservation
from base.views import reservation_views

class TestReservationURLs(TestCase):
    def setUp(self):
        self.reservation = Reservation.objects.create(
            product_id=1,
            start_date='2024-04-09',
            end_date='2024-04-12'
        )

        self.client = Client()
        
    def test_delete_reservation_url(self):
        response = self.client.delete(reverse('delete_reservation', args=[self.reservation.pk]))
        self.assertEqual(response.status_code, 204)  

