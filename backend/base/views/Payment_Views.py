# In your Django app's views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from models import Payment  # Assuming models is in the same directory
from serializers import PaymentSerializer  # Assuming serializers is in the same directory

@api_view(['POST'])
def process_payment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
