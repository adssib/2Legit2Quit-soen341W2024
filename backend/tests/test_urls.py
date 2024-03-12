from django.test import TestCase
from django.urls import reverse


class TestUrls(TestCase):
    def test_admin_url_resolves(self):
        url = reverse('admin:index')
        self.assertEqual(url, '/admin/')

