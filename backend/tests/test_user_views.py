from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User

class TestUserViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('token_obtain_pair')
        self.user = {
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'password123'
        }

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_profile(self):
        # Create a user
        user = User.objects.create_user(username='test_user', email='test@example.com', password='password123')
        # Authenticate
        self.client.login(username='test_user', password='password123')
        response = self.client.get(reverse('users-profile'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_users(self):
        # Create a user
        user = User.objects.create_user(username='test_user', email='test@example.com', password='password123')
        # Authenticate
        self.client.login(username='test_user', password='password123')
        response = self.client.get(reverse('users'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_by_id(self):
        # Create a user
        user = User.objects.create_user(username='test_user', email='test@example.com', password='password123')
        # Authenticate
        self.client.login(username='test_user', password='password123')
        response = self.client.get(reverse('user', kwargs={'pk': user.pk}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
