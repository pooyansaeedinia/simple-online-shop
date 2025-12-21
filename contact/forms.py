from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your name', 'class': 'form-control'})
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'placeholder': 'Enter your email', 'class': 'form-control'})
    )
    subject = forms.CharField(
        max_length=150,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Enter subject', 'class': 'form-control'})
    )
    message = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={'placeholder': 'Enter your message', 'class': 'form-control', 'rows': 5})
    )
