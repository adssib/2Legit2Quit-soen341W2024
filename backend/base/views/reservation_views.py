from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from datetime import datetime
from base.models import Product, Reservation
from django.shortcuts import get_object_or_404
from base.serializers import ReservationSerializer
from base.generate_contract import generate_rental_agreement_pdf_and_send_email

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

            generate_rental_agreement_pdf_and_send_email(file_path, request.user, Reservation)

            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)


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

            # Generate rental agreement PDF and send email
            reservation_instance = serializer.instance  # Get the saved Reservation instance
            generate_rental_agreement_pdf_and_send_email(file_path, request.user, reservation_instance)

            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
