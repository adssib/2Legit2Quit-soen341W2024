from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review, BranchAddress
from base.serializers import ProductSerializer, BranchAddressSerializer

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data

    product = Product.objects.create(
        user=user,
        name=data.get('name', 'Sample Name'),
        price=data.get('price', 0),
        brand=data.get('brand', 'Sample Brand'),
        countInStock=data.get('countInStock', 0),
        category=data.get('category', 'Sample Category'),
        description=data.get('description', ''),
        branch_id=data.get('branch_id') 
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.address = data.get('address', product.address)  
    product.branch_id = data.get('branch_id', product.branch_id)  # Update branch if provided
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')

@api_view(['GET'])
def getBranches(request):
    branches = BranchAddress.objects.all()
    serializer = BranchAddressSerializer(branches, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProductsByBranch(request, branch_id):
    try:
        # Correctly filter products by the branch's foreign key ID
        products = Product.objects.filter(branch_id=branch_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except BranchAddress.DoesNotExist:
        return Response({'message': 'Branch not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def userAddProduct(request):
    user = request.user
    data = request.data

    product = Product.objects.create(
        user=user,
        name=data['name'],
        image=data.get('image', '/placeholder.png'),  # Ensure you handle image uploads appropriately
        brand=data['brand'],
        category=data['category'],
        description=data['description'],
        price=data['price'],
        countInStock=data['countInStock'],
        branch_id=data.get('branch', None),  # Assume branch selection is optional
    )
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyListings(request):
    user = request.user
    products = Product.objects.filter(user=user)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMyProduct(request, pk):
    product = Product.objects.get(_id=pk, user=request.user)
    
    if product.user != request.user:
        return Response({'detail': 'Not authorized to delete this product'}, status=status.HTTP_400_BAD_REQUEST)

    product.delete()
    return Response('Product deleted')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def userAddProduct(request):
    user = request.user
    data = request.data

    # Get the branch object
    branch_id = data.get('branch')
    branch = None
    if branch_id:
        branch = BranchAddress.objects.get(_id=branch_id)

    product = Product.objects.create(
        user=user,
        name=data['name'],
        image=data.get('image', '/placeholder.png'),
        brand=data['brand'],
        category=data['category'],
        description=data['description'],
        price=data['price'],
        countInStock=data['countInStock'],
        branch=branch,
    )
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
