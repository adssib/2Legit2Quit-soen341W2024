from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    # path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    # path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProduct, name="product"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
    path('branch/<int:branch_id>/', views.getProductsByBranch, name='products-by-branch'),

    path('user/add/', views.userAddProduct, name="user-add-product"),
    path('mylistings', views.getMyListings, name="my-listings"),
    path('products/delete/<str:pk>/', views.deleteMyProduct, name="delete-my-product"),
]