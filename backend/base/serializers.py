from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Reservation, User, Review, BranchAddress
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Payment


class BranchAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchAddress
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    branch = BranchAddressSerializer(read_only=True)  # Include this line if you want to nest branch address details

    class Meta:
        model = Product
        fields = '__all__'

        
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
        fields =  fields = ['id', 'user', 'product', 'start_date', 'end_date', 'created_at']
    
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


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'