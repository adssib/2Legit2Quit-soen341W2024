from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime
from base.models import Product, Reservation
from base.serializers import ReservationSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Assuming you want both actions to be authenticated
def reservation_list_or_create(request):
    if request.method == 'GET':
        # List all reservations
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Existing logic for creating a reservation
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
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
