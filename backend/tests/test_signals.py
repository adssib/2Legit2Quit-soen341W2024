from django.test import TestCase
from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from base.signals import updateUser


class TestUpdateUserSignal(TestCase):
    def test_updateUser(self):
        user = User.objects.create(username='testuser', email='test@example.com')

        updateUser(sender=User, instance=user)

        updated_user = User.objects.get(id=user.id)

        self.assertEqual(updated_user.username, updated_user.email)
