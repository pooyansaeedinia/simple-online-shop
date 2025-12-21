from cart.models import Cart, CartItem


def header_context(request):
    cart_count = 0

    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user).first()
        if cart:
            cart_count = CartItem.objects.filter(cart=cart).count()

    return {'cart_count': cart_count}
