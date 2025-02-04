# backend/userManager/urls.py

from django.urls import path, re_path
from .views import userView, userDetailView

urlpatterns = [
    path('user/', userView.as_view()),
    re_path('user/(\d+)/', userDetailView.as_view()),
]
