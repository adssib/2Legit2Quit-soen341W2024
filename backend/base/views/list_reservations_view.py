from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response
from base.models import Reservation
from base.serializers import ReservationSerializer 

@api_view(['GET'])
def list_reservations(request):

    reservations = Reservation.objects.all()
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)