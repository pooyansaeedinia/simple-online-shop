from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.shortcuts import render, redirect

from simple_shop.settings import EMAIL_HOST_USER
from .forms import ContactForm


@login_required(login_url='accounts:login')
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            try:
                send_mail(
                    f"Contact Form : {subject}",
                    f'From : {name} ({email})\n\n{message}',
                    EMAIL_HOST_USER,
                    ["amirhosseinfarahani470@gmail.com"],
                )
                messages.success(request, "Message received")
                return redirect("message_sent_success")
            except Exception as e:
                print("Error", e)
                messages.error(request, f"Error\n{e}")
                return redirect("message_sent_failed")
    else:
        form = ContactForm()

    context = {
        'form': form,
    }
    return render(request, "contact/contact_form.html", context)


def message_sent_success(request):
    return render(request, "contact/message_sent_successful.html")


def message_sent_failed(request):
    return render(request, "contact/message_sent_failed.html")
