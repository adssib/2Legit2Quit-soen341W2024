from django.test import TestCase
from django.apps import apps

class AppConfigTestCase(TestCase):
    def test_ready_method(self):
        app_config = apps.get_app_config('base')
        self.assertTrue(hasattr(app_config, 'ready'))
