from django.db import models
# Create your models here.

class Record(models.Model):
    create_at = models.DateTimeField(auto_now_add=True) # keep a time stamp of when a new record has been created
    
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    city=models.CharField(max_length=50)
    country=models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    
    car_model = models.CharField(max_length=50)
    car_type =models.CharField(max_length=50)
    car_color = models.CharField(max_length=50)
    car_transmission = models.CharField(max_length=50)
    fuel_type = models.CharField(max_length=50)
    number_of_seats = models.CharField(max_length=50)

    def __str__(self):
        return (f"{self.city} {self.car_model} {self.car_type}") # this will be the title of the record



