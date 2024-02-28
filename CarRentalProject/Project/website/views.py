from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import Record

# request: you request the information, then it gets sent back to you

def home(request):
    records =Record.objects.all() # grab all the records
        #check to see if logging in
    if request.method == 'POST':
        username = request.POST['username'] #grab the username the user entered 
        password = request.POST['password'] # grab password
        
        #authenticate
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request,user)
            messages.success(request, "Login successful!")
            return redirect('home')
        else:
            messages.success(request, "Error, Username or password is incorrect.")
            return redirect('home')
    
    else:
        return render(request, 'home.html', {'records':records}) # if the user is logged in, it passes the records
        
def logout_user(request):
    logout(request)#imported logout function form django
    messages.success(request,"Successfully logged out.")
    return redirect('home')
    pass

# Create your views here.
