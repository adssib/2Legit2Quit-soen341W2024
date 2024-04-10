from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response
from base.models import Reservation
from base.serializers import ReservationSerializer 
from django.http import JsonResponse

@api_view(['GET'])
def list_reservations(request):

    reservations = Reservation.objects.all()
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def reservations_by_product(request, product_id):
    if product_id is not None:
        reservations = Reservation.objects.filter(product_id=product_id)
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "Missing product_id parameter"}, status=400)