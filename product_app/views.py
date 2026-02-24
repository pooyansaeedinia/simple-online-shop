from django.core.paginator import Paginator
from django.shortcuts import render, redirect

from cart.models import Cart, CartItem
from home_app.models import Discount
from product_app.forms import CommentForm
from product_app.models import Product, Category, Comments
from django.db.models import Q


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

    paginator = Paginator(product_query.distinct(), 20)
    page = request.GET.get('page')
    products = paginator.get_page(page)

    context = {
        'products': products,
        'query': query,
        'pk': pk,
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
    return render(request, 'product_app/category.html', {'categories': categories})
