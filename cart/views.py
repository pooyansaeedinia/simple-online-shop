from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from product_app.models import Product
from .models import Cart, CartItem, Order


# Create your views here.

@login_required
def cart_page(request):
    cart = Cart.objects.get(user=request.user)
    cart_items = CartItem.objects.filter(cart=cart)
    products = Product.objects.exclude(id__in=cart_items.values_list('product_id', flat=True)).filter(quantity__gt=0)[
               :10]

    has_error = False

    if request.method == "POST":
        for item in cart_items:
            qty = int(request.POST.get(f"qty_{item.id}", item.quantity))
            product = item.product

            if qty > product.quantity:
                item.error_message = (
                    f"You requested {qty}, but only {product.quantity} left in stock."
                )
                has_error = True
            else:
                item.quantity = qty
                item.save()

        if has_error:
            return render(request, "cart/cart.html", {
                'cart': cart,
                'cart_items': cart_items,
                'products': products,
                'total_items': cart.total_items,
                'total_price': cart.total_price,
            })

        return redirect("cart:cart")

    return render(request, "cart/cart.html", {
        'cart': cart,
        'cart_items': cart_items,
        'products': products,
        'total_items': cart.total_items,
        'total_price': cart.total_price,
    })


@login_required
def add_to_cart(request, pk):
    product_to_add = Product.objects.get(id=pk)
    cart = Cart.objects.get(user=request.user)
    cart_item = CartItem.objects.get_or_create(cart=cart, product=product_to_add, quantity=1)
    return redirect('cart:cart')


def delete_cart_item(request, pk):
    cart_item = CartItem.objects.get(id=pk)
    cart_item.delete()
    return redirect('cart:cart')


@login_required
def checkout_page(request):
    cart = Cart.objects.get(user=request.user)


    if request.method == "POST":
        fullname = request.POST.get("fullname")
        address = request.POST.get("address")
        phone = request.POST.get("phone")
        payment_method = request.POST.get("payment")

        for item in cart.items.all():
            if item.quantity > item.product.quantity:
                return render(request, "cart/checkout.html", {
                    "cart": cart,
                    "cart_items": cart.items.all(),
                    "total_items": cart.total_items,
                    "total_price": cart.total_price,
                    "error": f"Product {item.product.name} has only {item.product.quantity} left in stock."
                })

        order = Order.objects.create(
            user=request.user,
            cart=cart,
            fullname=fullname,
            address=address,
            phone=phone,
            payment_method=payment_method,
            total_price=cart.total_price
        )

        for item in cart.items.all():
            product = item.product
            product.quantity -= item.quantity
            product.save()

        cart.items.all().delete()
        cart.is_active = False
        cart.save()

        return redirect("cart:checkout_success")

    return render(request, "cart/checkout.html", {
        "cart": cart,
        "cart_items": cart.items.all(),
        "total_items": cart.total_items,
        "total_price": cart.total_price,
    })


def checkout_success(request):
    return render(request, "cart/checkout_success.html")
