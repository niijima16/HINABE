# backend/userManager/urls.py

from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from couponAPI.views.questonnaire import QuestionnaireViewSet
from .views import RegisterOrLoginView, AdminLoginView

router = DefaultRouter()
router.register(r'questionnaires', QuestionnaireViewSet)

urlpatterns = [
    path('admin-auth/', AdminLoginView.as_view()),
    path('auth/', RegisterOrLoginView.as_view()),  # 携帯番号で認証・登録
    path('', include(router.urls)),                # /questionnaires/ など
]