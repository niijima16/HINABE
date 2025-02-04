# backend/config/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('coupon/', include('couponAPI.urls')),
    path('user/', include('userManager.urls')),
]