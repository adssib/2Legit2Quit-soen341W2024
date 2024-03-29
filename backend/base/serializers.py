from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Reservation, User, Review
from rest_framework_simplejwt.tokens import RefreshToken



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class ReservationSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d",])
    end_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d",])
    user = UserSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = ['id', 'user', 'product', 'start_date', 'end_date', 'created_at',
                  'arrived_location', 'provided_license', 'provided_credit_card',
                  'signed_agreement', 'payment_received']
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user')
