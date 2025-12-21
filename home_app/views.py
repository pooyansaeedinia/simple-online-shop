from django.shortcuts import render
from django.utils import timezone

from home_app.models import Banner, Discount
from product_app.models import Product


# Create your views here.


def home_page(request):
    all_discounted_products = Discount.objects.all()
    products = Product.objects.all()
    new_products = Product.objects.all().order_by('-id')[:10]
    all_banners = Banner.objects.all()
    for banner in all_banners:
        if banner.expire_at < timezone.now():
            banner.is_active = False
    for product in all_discounted_products:
        if product.expire_at < timezone.now():
            product.is_active = False
    discounted_products = Discount.objects.filter(is_active=True)
    banners = Banner.objects.filter(is_active=True)

    context = {
        'discounted_products': discounted_products,
        'new_products': new_products,
        'banners': banners,
        'products': products,
    }
    return render(request, 'home_app/homepage.html', context)



