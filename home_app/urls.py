from django.urls import path

from home_app.views import home_page,send_email

app_name = 'home_app'

urlpatterns = [
    path('', home_page, name='home'),
    path('send_email/', send_email, name='send_email'),
]
