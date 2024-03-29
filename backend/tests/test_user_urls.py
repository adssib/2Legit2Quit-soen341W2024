from django.test import SimpleTestCase
from django.urls import reverse, resolve
from base.views import user_views as views
from backend.base.urls.urls import user_urls

class TestUserUrls(SimpleTestCase):

    def test_login_url_resolves(self):
        url = reverse('token_obtain_pair')
        self.assertEqual(resolve(url).func.view_class, views.MyTokenObtainPairView)

    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func, views.registerUser)

    def test_user_profile_url_resolves(self):
        url = reverse('users-profile')
        self.assertEqual(resolve(url).func, views.getUserProfile)

    def test_users_url_resolves(self):
        url = reverse('users')
        self.assertEqual(resolve(url).func, views.getUsers)
