from django.urls import path

from .views import contact, message_sent_success, message_sent_failed

app_name = 'contact'

urlpatterns = [
    path('contact-form/', contact, name='contact'),
    path('message_sent_success/', message_sent_success, name='message_sent_success'),
    path('message_sent_failed/', message_sent_failed, name='message_sent_failed'),
]
