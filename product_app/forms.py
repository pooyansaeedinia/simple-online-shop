from django import forms

from cart.models import CartItem
from product_app.models import Comments


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ('comment','rating')
        widgets = {
            'comment': forms.Textarea(attrs={
                'rows': 3,
                'class': "form-control",
                'placeholder': "Write your comment..."
            }),
            'rating': forms.HiddenInput(),
        }