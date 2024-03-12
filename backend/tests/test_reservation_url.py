from django.test import TestCase, Client
from django.urls import reverse

class URLPatternTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_create_reservation_url(self):
        url = reverse('create_reservation')

        data = {
            'start_date': '2023-01-01',  # Provide a valid start date
            'end_date': '2023-01-05',     # Provide a valid end date
        }

        response = self.client.post(url, data)

        # Assert that the response status code is 200 (OK) or 201 (Created) if appropriate
        self.assertIn(response.status_code, [200, 201])

