from django.urls import path

from home_app.views import home_page

app_name = 'home_app'

urlpatterns = [
    path('', home_page, name='home'),
]
