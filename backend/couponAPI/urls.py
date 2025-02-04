# back/couponAPI/urls.py

from django.urls import path, re_path
from . import views

urlpatterns = [
    path('testapi/', views.couponView.as_view()),
    re_path('testapi/(\d+)/', views.couponDetailView.as_view()),
    path('ank/', views.questionnaireView.as_view()),
    re_path('ank/(\d+)/', views.questionnaireDetailView.as_view()),
]
