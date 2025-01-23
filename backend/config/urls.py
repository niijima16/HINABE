# backend/config/urls.py

from django.contrib import admin
from django.urls import path
from couponAPI import views
from rest_framework import routers

urlpatterns = [
    path('admin/', admin.site.urls),
    path('testapi/', views.couponView.as_view())
]
