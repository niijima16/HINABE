# back/couponAPI/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from couponAPI.views.coupon import CouponLotteryView
from couponAPI.views.questonnaire import CouponViewSet, QuestionnaireViewSet, QuestionnaireListView, SubmitQuestionnaireView

router = DefaultRouter()
router.register(r'coupons', CouponViewSet)  # クーポンAPI
router.register(r'questionnaires', QuestionnaireViewSet)  # アンケートAPI

urlpatterns = [
    path('', include(router.urls)),  # ルーター経由でViewSetのエンドポイントを登録
    path('lottery/', CouponLotteryView.as_view()),  # クーポン抽選API
    path('questionnaires-list/', QuestionnaireListView.as_view()),  # ユーザー用アンケート取得
    path('submit-questionnaire/', SubmitQuestionnaireView.as_view()),  # アンケート回答
]


