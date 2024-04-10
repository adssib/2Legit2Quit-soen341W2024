from django.test import SimpleTestCase
from django.urls import reverse, resolve
from base.views import product_views as views
from base.urls import product_urls

class TestProductUrls(SimpleTestCase):

    def test_products_url_resolves(self):
        url = reverse('products')
        self.assertEqual(resolve(url).func, views.getProducts)

    def test_product_detail_url_resolves(self):
        url = reverse('product', args=['1']) 
        self.assertEqual(resolve(url).func, views.getProduct)

