from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('recomm/', include('recommservice.urls')),
    path('log/', include('logservice.urls')),
]
