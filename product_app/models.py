from itertools import product

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from accounts.models import CustomUser


# Create your models here.

class Brand(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='brand_images/')

    def __str__(self):
        return self.name

    def product_count(self):
        return Product.objects.filter(brand=self).count()



class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category_images/')

    def __str__(self):
        return self.name

    def product_count(self):
        return Product.objects.filter(category=self).count()



class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=10)
    rating = models.IntegerField(default=0,validators=[MaxValueValidator(5),MinValueValidator(0)])
    image = models.ImageField(upload_to='images/')
    description = models.TextField()

    def __str__(self):
        return self.name

    @property
    def final_price(self):
        if hasattr(self, "discount") and self.discount.is_active:
            return self.discount.new_price
        return self.price

    def rating_1_count(self):
        return self.objects.filter(rating=1).count()
    def rating_2_count(self):
        return self.objects.filter(rating=2).count()
    def rating_3_count(self):
        return self.objects.filter(rating=3).count()
    @staticmethod
    def rating_4_count():
        return Product.objects.filter(rating=4).count()
    @staticmethod
    def rating_5_count():
        return Product.objects.filter(rating=5).count()


class Comments(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    comment = models.TextField(blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0,validators=[MaxValueValidator(5),MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'user')

    def __str__(self):
        return self.comment