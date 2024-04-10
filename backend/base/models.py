from django.db import models
from django.contrib.auth.models import User

class BranchAddress(models.Model):
    branch_name = models.CharField(max_length=200, unique=True, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.branch_name or self.address
    
class Product(models.Model):
    user= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name= models.CharField(max_length=200, null=True, blank=True)
    image=models.ImageField(null=True, blank=True,  default='/placeholder.png')
    brand=models.CharField(max_length=200, null=True, blank=True)
    category=models.CharField(max_length=200, null=True, blank=True)
    description=models.TextField(null=True, blank=True)
    rating=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews=models.IntegerField(null=True, blank=True, default=0)
    price=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock=models.IntegerField(null=True, blank=True, default=0)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.AutoField(primary_key=True, editable=False)
    address = models.CharField(max_length=255, null=True, blank=True)
    branch = models.ForeignKey(BranchAddress, on_delete=models.SET_NULL, null=True, related_name='products')

    def __str__(self):
        return self.name
    

class Review (models.Model):
        product=models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
        user=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
        name=models.CharField(max_length=200, null=True, blank=True)
        rating=models.IntegerField(null=True, blank=True, default=0)
        comment=models.TextField(null=True, blank=True)
        _id=models.AutoField(primary_key=True, editable=False)

        def __str__(self):
            return str(self.rating)
        
class Order(models.Model):
     user=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
     paymentMethod=models.CharField(max_length=200, null=True, blank=True)
     taxPrice=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
     totalPrice=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
     isPaid=models.BooleanField(default=False)
     paidAt=models.DateTimeField(auto_now_add=False, null=True, blank=True)
     createdAt=models.DateTimeField(auto_now_add=True)
     _id=models.AutoField(primary_key=True, editable=False)

     def __str__(self):
         return str(self.createdAt)


class OrderItem(models.Model):
    product= models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order=models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name=models.CharField(max_length=200, null=True, blank=True)
    qty=models.IntegerField(null=True, blank=True, default=0) #number of days
    price=models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image=models.CharField(max_length=200, null=True, blank=True)
    _id=models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
    


    
class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

        
    UserArrivedAtLocation = models.BooleanField(default=False)
    UserInspectedTheCar = models.BooleanField(default=False)
    UserProvidedDriverLicense = models.BooleanField(default=False)
    UserProvidedCreditCard = models.BooleanField(default=False)
    UserSignedAgreement = models.BooleanField(default=False)
    UserReturnedTheCar = models.BooleanField(default=False)
    NoDamages = models.BooleanField(default=False)
    
    def __str__(self):
        product_name = self.product.name if self.product else "Unknown Product"
        
        return f"{product_name} from {self.start_date} to {self.end_date}"

class Payment(models.Model):
    card_name = models.CharField(max_length=255)
    card_number = models.CharField(max_length=255) 
    exp_month = models.CharField(max_length=2)
    exp_year = models.CharField(max_length=4)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.card_name} - {self.date}"
    
    

class UserAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.user.username

    def add_funds(self, amount):
        self.balance += amount
        self.save()

    def deduct_funds(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.save()
            return True
        return False

    @staticmethod
    def deduct_from_user(user, amount):
        try:
            user_account = UserAccount.objects.get(user=user)
            if user_account.balance >= amount:
                user_account.balance -= amount
                user_account.save()
                return True
        except UserAccount.DoesNotExist:
            pass
        return False

    @staticmethod
    def list_all_payments():
        return Payment.objects.all()