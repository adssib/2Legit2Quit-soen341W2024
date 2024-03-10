from django.test import TestCase
from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from base.signals import updateUser


class TestUpdateUserSignal(TestCase):
    def test_updateUser(self):
        # Create a user with a username and email
        user = User.objects.create(username='testuser', email='test@example.com')

        # Trigger the signal to update the user
        updateUser(sender=User, instance=user)

        # Retrieve the user again from the database to get the updated version
        updated_user = User.objects.get(id=user.id)

        # Check if the username has been updated to match the email
        self.assertEqual(updated_user.username, updated_user.email)
