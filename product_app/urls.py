from django.urls import path

from product_app.views import product_list, category, product_details

app_name = 'product_app'

urlpatterns = [
    path('<int:pk>/', product_list, name='product_list'),
    path('product/<int:pk>/', product_details, name='product_details'),
    path('category/', category, name='category'),
]
