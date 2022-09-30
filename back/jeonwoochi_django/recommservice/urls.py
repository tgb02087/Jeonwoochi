from django.urls import path
from . import views

app_name = "recommservice"

urlpatterns = [
    path('r_cf/<int:user_id>/', views.get_snbr),
]
