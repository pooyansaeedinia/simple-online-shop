from django.contrib.auth.models import AbstractUser
from django.db import models

from cart.models import Cart


class CustomUser(AbstractUser):
    email = models.EmailField(
        unique=True
    )

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username


    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            Cart.objects.create(user=self, is_active=True)
