from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Reservation, User, Review, BranchAddress
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Payment
from .models import UserAccount

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'user', 'balance']

    def create(self, validated_data):
        return UserAccount.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.balance = validated_data.get('balance', instance.balance)
        instance.save()
        return instance

class BranchAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchAddress
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    branch = BranchAddressSerializer(read_only=True)  
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
        # Concatenate first name and last name
        name = f"{obj.first_name} {obj.last_name}".strip()
        if not name:
            name = obj.email
        return name

class ReservationSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d",])
    end_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d",])
    user = UserSerializer(read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    product_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Reservation
        fields = [
            'id', 'user', 'product', 'product_name', 'start_date', 'end_date', 'created_at',
            'UserArrivedAtLocation', 'UserInspectedTheCar', 'UserProvidedDriverLicense',
            'UserProvidedCreditCard', 'UserSignedAgreement', 'UserReturnedTheCar', 'NoDamages'
        ]

    def get_product_name(self, obj):
        return obj.product.name if obj.product else None
    
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
