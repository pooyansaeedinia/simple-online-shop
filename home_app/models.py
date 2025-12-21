from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from product_app.models import Product


# Create your models here

class Banner(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='banners/', blank=True, null=True)
    description = models.TextField()
    small_description = models.TextField()
    link = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    expire_at = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.expire_at and self.expire_at <= timezone.now():
            self.is_active = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Discount(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='discount')
    new_price = models.IntegerField()
    expire_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if self.new_price > self.product.price:
            raise ValidationError("New price must be lower than product price")
        if self.expire_at and self.expire_at <= timezone.now():
            self.is_active = False
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.product.name
