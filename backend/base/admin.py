from django.contrib import admin
from .models import *
from django.contrib import admin
from .models import Payment

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(BranchAddress)
admin.site.register(Reservation)
admin.site.register(Payment)