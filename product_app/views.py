from django.conf.global_settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from django.core.paginator import Paginator
from django.shortcuts import render, redirect

from cart.models import Cart, CartItem
from home_app.models import Discount
from product_app.forms import CommentForm
from product_app.models import Product, Category, Comments
from django.db.models import Q
from .filters import ProductFilter


# Create your views here.
def product_list(request, pk):
    query = request.GET.get('q')
    discounts = Discount.objects.filter(is_active=True)
    discounted_products = [discount.product for discount in discounts]

    product_query = Product.objects.all()

    if query:
        product_query = product_query.filter(
            Q(name__icontains=query) |
            Q(brand__name__icontains=query) |
            Q(category__name__icontains=query)
        )

    if pk == 1:
        product_query = product_query.filter(discount__is_active=True)

    elif pk != 0 and pk != 1:
        product_query = product_query.filter(category=pk)

    query_params = request.GET.copy()
    if 'page' in query_params:
        query_params.pop('page')

    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')

    if min_price and max_price:
        try:
            min_val = float(min_price)
            max_val = float(max_price)
            if min_val > max_val:
                min_price = None
        except ValueError:
            pass

    filtered_products = ProductFilter(request.GET, queryset=product_query)

    star_5 = product_query[0].rating_5_count()
    print(star_5)

    paginator = Paginator(filtered_products.qs.distinct(), 20)
    page = request.GET.get('page')
    products = paginator.get_page(page)

    selected_categories = request.GET.getlist('category')
    selected_brands = request.GET.getlist('brand')


    context = {
        'products': products,
        'filter': filtered_products,
        'selected_categories': selected_categories,
        'selected_brands': selected_brands,
        'query': query,
        'pk': pk,
        'query_params': query_params.urlencode(),
        'discounted_products': discounted_products,
    }

    return render(request, 'product_app/Products_list.html', context)


def product_details(request, pk):
    user = request.user
    product = Product.objects.get(pk=pk)
    comments = Comments.objects.filter(product=product).order_by('-created_at')

    user_comment = None
    if request.user.is_authenticated:
        user_comment = Comments.objects.filter(product=product, user=request.user).first()

    if comments:
        ratings = []
        for comment in comments:
            ratings.append(comment.rating)

        average_rating = round((sum(ratings) / len(ratings)))
        product.rating = average_rating
        product.save()

    already_in_cart = False
    form = CommentForm()

    cart = None
    if user.is_authenticated:
        if request.method == 'POST':
            form = CommentForm(request.POST)
            if form.is_valid():
                new_comment = form.save(commit=False)
                new_comment.product = product
                new_comment.user = request.user
                new_comment.save()
                return redirect('product_app:product_details', pk=pk)

        cart = Cart.objects.filter(user=request.user).first()
        if cart:
            already_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

    # Cart sidebar: items and totals for product detail page
    cart_items = []
    cart_total = 0
    cart_items_count = 0
    if request.user.is_authenticated and cart:
        cart_items = list(cart.items.select_related('product').all())
        cart_total = cart.total_price
        cart_items_count = cart.total_items

    context = {
        'product': product,
        'comments': comments,
        'form': form,
        'user_comment': user_comment,
        'already_in_cart': already_in_cart,
        'cart_items': cart_items,
        'cart_total': cart_total,
        'cart_items_count': cart_items_count,
    }
    return render(request, 'product_app/Product_detail.html', context)



def category(request):
    categories = Category.objects.all()
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
                return render(request, 'product_app/category.html', {'categories': categories})
            except Exception as e:
                print(e)
                return render(request, 'product_app/category.html', {'categories': categories})
    return render(request, 'product_app/category.html', {'categories': categories})
