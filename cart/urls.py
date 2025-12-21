from django.urls import path

from cart.views import cart_page, delete_cart_item, add_to_cart, checkout_page, checkout_success

app_name = 'cart'
urlpatterns = [
    path('', cart_page, name='cart'),
    path('item/delete/<int:pk>', delete_cart_item, name='delete_cart_item'),
    path('item/add/<int:pk>', add_to_cart, name='add_to_cart'),
    path('checkout', checkout_page, name='checkout_page'),
    path('checkout/success', checkout_success, name='checkout_success'),
]