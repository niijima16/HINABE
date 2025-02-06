# backend/userManager/urls.py

from django.urls import path, re_path
from .views import RegisterOrLoginView

urlpatterns = [
    path('auth/', RegisterOrLoginView.as_view()),  # 携帯番号で認証・登録
]