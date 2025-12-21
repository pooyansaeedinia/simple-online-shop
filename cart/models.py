from django.db import models


# Create your models here.


class Cart(models.Model):
    user = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total_price(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    def __str__(self):
        return f"Cart({self.user.username})"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'is_active'], name='unique_active_cart')
        ]


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey("product_app.Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    @property
    def unit_price(self):
        if hasattr(self.product, "discount"):
            discount = self.product.discount
            if discount.is_active:
                return discount.new_price
        return self.product.price

    @property
    def total_price(self):
        return self.unit_price * self.quantity

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class Order(models.Model):
    user = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    payment_method = models.CharField(
        max_length=20,
        choices=[("online", "Online"), ("cash on delivery", "Cash on delivery")]
    )
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order({self.user.username}, {self.total_price})"
