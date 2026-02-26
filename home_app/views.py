from django.shortcuts import render, redirect
from django.utils import timezone

from home_app.models import Banner, Discount
from product_app.models import Product

from django.conf.global_settings import EMAIL_HOST_USER
from django.core.mail import send_mail

# Create your views here.


def home_page(request):
    all_discounted_products = Discount.objects.all()
    products = Product.objects.all()
    new_products = Product.objects.all().order_by('-id')[10:20]
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



def send_email(request):
    previous_page = request.META.get('HTTP_REFERER', '')
    if request.method == 'POST':
        user_email = request.POST.get('email')
        your_message = "A Django-based e-commerce web application for managing and selling products online.\nThis project provides a complete shopping experience with user authentication, product catalog, shopping cart, and order management."
        subject = "Zentrix updates"

        if user_email and your_message:
            try:
                send_mail(
                    subject,
                    your_message,
                    EMAIL_HOST_USER,
                    [user_email],
                    fail_silently=False,
                )
                print("email sent")
            except Exception as e:
                print(e)
    if "products" in previous_page and "category" in previous_page:
        return redirect('product_app:category')
    elif "products" in previous_page and "product" in previous_page:
        return redirect('product_app:product_details', pk=previous_page[-2])
    elif "products" in previous_page:
        return redirect('product_app:product_list',pk=1)
    elif "cart" in previous_page:
        return redirect('cart:cart')
    elif "checkout" in previous_page:
        return redirect('cart:checkout_page')
    else:
        return redirect('home_app:home')


