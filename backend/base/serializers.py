from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
from .models import Reservation


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'