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
@permission_classes([IsAuthenticated])
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
    product.branch_id = data.get('branch_id', product.branch_id)  
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
        image=data.get('image', '/placeholder.png'),  
        brand=data['brand'],
        category=data['category'],
        description=data['description'],
        price=data['price'],
        countInStock=data['countInStock'],
        branch_id=data.get('branch', None),  
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
    try:
        product = Product.objects.get(_id=pk, user=request.user)
        product.delete()
        return Response({'message': 'Product deleted'}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
       
        return Response({'detail': 'Error occurred while deleting the product'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def userAddProduct(request):
    user = request.user
    data = request.data

    
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

@api_view(['GET'])
def searchProducts(request, keyword):
    """Search products based on a keyword."""
    if keyword:
        products = Product.objects.filter(name__icontains=keyword)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    return Response({"message": "No keyword provided"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getProducts(request):
    query_params = request.query_params
    products = Product.objects.all()
    
    branch_id = request.query_params.get('branch')
    if branch_id:
        products = Product.objects.filter(branch_id=branch_id)
    else:
        products = Product.objects.all()
    
    brand = query_params.get('brand')
    if brand:
        products = products.filter(brand__iexact=brand)
    
    category = query_params.get('category')
    if category:
        products = products.filter(category__iexact=category)
    
    price_min = query_params.get('price_min')
    price_max = query_params.get('price_max')
    if price_min and price_max:
        products = products.filter(price__gte=price_min, price__lte=price_max)
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getFilterOptions(request):
    brands = Product.objects.values_list('brand', flat=True).distinct().order_by('brand')
    categories = Product.objects.values_list('category', flat=True).distinct().order_by('category')
    if not brands or not categories:
        return Response({'message': 'No brands or categories found'}, status=status.HTTP_404_NOT_FOUND)
    return Response({'brands': list(brands), 'categories': list(categories)})


