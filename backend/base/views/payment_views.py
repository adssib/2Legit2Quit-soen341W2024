from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from base.models import Payment, UserAccount
from base.serializers import PaymentSerializer, UserAccountSerializer

@api_view(['POST'])
def process_payment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_funds(request, user_id):
    try:
        user_account = UserAccount.objects.get(user_id=user_id)
        amount = float(request.data.get('amount'))
        user_account.add_funds(amount)
        return Response({'message': f"Funds added successfully. New balance: {user_account.balance}"}, status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response({'message': 'User account not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def deduct_funds(request, user_id):
    try:
        user_account = UserAccount.objects.get(user_id=user_id)
        amount = float(request.data.get('amount'))
        if user_account.deduct_funds(amount):
            return Response({'message': f"Funds deducted successfully. New balance: {user_account.balance}"}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Insufficient funds.'}, status=status.HTTP_400_BAD_REQUEST)
    except UserAccount.DoesNotExist:
        return Response({'message': 'User account not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def list_all_payments(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_account_balance(request, user_id):
    try:
        user_account = UserAccount.objects.get(user_id=user_id)
        serializer = UserAccountSerializer(user_account)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response({'message': 'User account not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def retrieve_payment(request, payment_id):
    try:
        payment = Payment.objects.get(pk=payment_id)
        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Payment.DoesNotExist:
        return Response({'message': 'Payment not found.'}, status=status.HTTP_404_NOT_FOUND)
