# base/urls/branch_urls.py
from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getBranches, name="branches"), 
    path('products/<int:branch_id>/', views.getProductsByBranch, name='products-by-branch')
]
