# backend/config/urls.py


from django.contrib import admin
from django.urls import path, re_path
from couponAPI import views
from rest_framework import routers


urlpatterns = [
    path('admin/', admin.site.urls),
    path('testapi/', views.couponView.as_view()),
    re_path('testapi/(\d+)/', views.couponDetailView.as_view()),
]
