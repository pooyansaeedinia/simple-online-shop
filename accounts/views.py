from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, \
    PasswordResetCompleteView
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.urls import reverse_lazy

from simple_shop.settings import EMAIL_HOST_USER
from .forms import SignupForm


def register_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()

            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            activation_link = request.build_absolute_uri(
                reverse('accounts:user_activation', args=[uidb64, token])
            )
            try:
                send_mail(
                    "Activate Your Account",
                    f"Click the link below to activate your account.\n{activation_link}",
                    EMAIL_HOST_USER,
                    [user.email],
                )
                print("Email sent")
                messages.success(request, "Check your email to activate your account.")
            except Exception as e:
                messages.error(request, f"Error sending activation email.\n{e}")
                print("Error sending activation email", e)

            return redirect("accounts:check_email_template")
    else:
        form = SignupForm()

    context = {'form': form}
    return render(request, 'accounts/register.html', context)


def check_email_template(request):
    return render(request, "accounts/check_email.html")


User = get_user_model()


def user_activation(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64)
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, "Your account has been activated.")
        return redirect("accounts:email_verification_successful")

    else:
        messages.error(request, "Activation link is invalid.")
        return redirect("accounts:email_verification_failed")


def email_verification_successful(request):
    return render(request, "accounts/email_verification_successful.html")


def email_verification_failed(request):
    return render(request, "accounts/email_verification_failed.html")


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "You are now logged in")
            print("logged in")
            return redirect('product_app:product_list', pk=0)
        else:
            for error in form.non_field_errors():
                form.add_error('username', error)

    else:
        form = AuthenticationForm()

    context = {'form': form}
    return render(request, "accounts/login.html", context)


def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out!')
    return redirect('accounts:login')


class CustomPasswordResetView(PasswordResetView):
    template_name = "accounts/password_reset_request.html"
    email_template_name = "accounts/password_reset_email.html"
    subject_template_name = "accounts/password_reset_subject.txt"
    success_url = reverse_lazy("accounts:password_reset_done")


class PasswordResetDone(PasswordResetDoneView):
    template_name = "accounts/password_reset_done.html"


class PasswordResetConfirm(PasswordResetConfirmView):
    template_name = "accounts/password_reset_process.html"
    success_url = reverse_lazy('accounts:password_reset_complete')


class PasswordResetComplete(PasswordResetCompleteView):
    template_name = "accounts/password_reset_complete.html"