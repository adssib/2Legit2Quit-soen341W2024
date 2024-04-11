from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Payment
from base.serializers import PaymentSerializer
from rest_framework import status

@api_view(['GET'])
def list_payments(request):
    """
    List all payment records in the database.
    """
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_payment(request):
    """
    Create a payment record in the database.
    """
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_payment(request, pk):
    """
    Delete a payment record from the database.
    """
    try:
        payment = Payment.objects.get(pk=pk)
        payment.delete()
        return Response({'message': 'Payment Deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Payment.DoesNotExist:
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
