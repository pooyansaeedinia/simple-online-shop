import django_filters
from .models import Product, Brand, Category


class ProductFilter(django_filters.FilterSet):
    brand = django_filters.ModelMultipleChoiceFilter(
        queryset=Brand.objects.all(),
    )
    category = django_filters.ModelMultipleChoiceFilter(
        queryset=Category.objects.all(),
    )
    min_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="gte",
    )
    max_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="lte",
    )
    class Meta:
        model = Product
        fields = ['brand', 'category', 'min_price', 'max_price']
