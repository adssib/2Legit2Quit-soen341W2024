from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from base.models import Product, Reservation
from base.serializers import ProductSerializer, ReservationSerializer

@api_view(['POST'])
def create_reservation(request):
    product_id = request.data.get('product')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')

    start_date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
    end_date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()

    overlapping_reservations = Reservation.objects.filter(
        product_id=product_id,
        end_date__gte=start_date_obj,  
        start_date__lte=end_date_obj 
    ).exists()

    if overlapping_reservations:
        # Car is not available
        return Response({"error": "This car is not available for the selected dates."}, status=400)

    # Car is available, proceed to create the reservation
    serializer = ReservationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)