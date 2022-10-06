from django.urls import path
from . import views

app_name = "recommservice"

urlpatterns = [
    path('r_cf/', views.get_snbr),
]
