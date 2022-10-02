from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/recomm-service/', include('recommservice.urls')),
    path('api/log-service/', include('logservice.urls')),
]
