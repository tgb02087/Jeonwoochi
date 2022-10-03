from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/recomm/', include('recommservice.urls')),
    path('v1/log/', include('logservice.urls')),
]
