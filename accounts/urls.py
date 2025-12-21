from django.urls import path

from .views import register_view, check_email_template, user_activation, email_verification_successful, \
    email_verification_failed, login_view, logout_view, CustomPasswordResetView, PasswordResetDone, \
    PasswordResetConfirm, PasswordResetComplete

app_name = 'accounts'

urlpatterns = [
    path('register/', register_view, name='register'),
    path('check-email/', check_email_template, name='check_email_template'),
    path('activate/<uidb64>/<token>/', user_activation, name='user_activation'),
    path('email-verification-successful/', email_verification_successful, name='email_verification_successful'),
    path('email-verification-failed/', email_verification_failed, name='email_verification_failed'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('password-reset-request/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('password-reset-done/', PasswordResetDone.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', PasswordResetConfirm.as_view(), name='password_reset_confirm'),
    path('password-reset-complete/', PasswordResetComplete.as_view(), name='password_reset_complete'),
]
