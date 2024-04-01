from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from datetime import datetime
from base.models import Product, Reservation
from base.serializers import ReservationSerializer
from django.shortcuts import get_object_or_404
from base.generate_contract import generate_rental_agreement_pdf_and_send_email
from rest_framework import status

file_path = "../static/receipt/rental_agreement.pdf"

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  
def reservation_list_or_create(request):
    if request.method == 'GET':
        # List all reservations
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
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

        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)

            # generate_rental_agreement_pdf_and_send_email(file_path, request.user, Reservation)

            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def single_reservation_detail(request, reservation_id):
    try:
        reservation = get_object_or_404(Reservation, pk=reservation_id)
        if request.method == 'GET':
            serializer = ReservationSerializer(reservation)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ReservationSerializer(reservation, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
@api_view(['DELETE'])
def delete_reservation(request, reservation_id):
    try:
        reservation = Reservation.objects.get(id=reservation_id)
    except Reservation.DoesNotExist:
        return Response({"error": "Reservation not found"}, status=status.HTTP_404_NOT_FOUND)

    reservation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)