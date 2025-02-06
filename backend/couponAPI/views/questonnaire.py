# backend/couponAPI/views/questonnaire.py

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from ..models import Coupon, Questionnaire
from ..serializers import CouponSerializer, QuestionnaireSerializer, QuestionnaireResponseSerializer
from userManager.models import User
from rest_framework.generics import ListAPIView, CreateAPIView

# クーポンの CRUD 操作を ViewSet で統一
class CouponViewSet(viewsets.ModelViewSet):
    """クーポンの一覧取得、作成、更新、削除 (管理者のみ)"""
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [IsAdminUser]  # 管理者のみ操作可能

# アンケートの作成・編集（管理者のみ）
class QuestionnaireViewSet(viewsets.ModelViewSet):
    """管理者のみアンケートを作成・編集可能"""
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAdminUser]

# ユーザーがアンケートを取得
class QuestionnaireListView(ListAPIView):
    """ユーザーが回答するためにアンケートの内容を取得する"""
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

# アンケートの回答を保存
class SubmitQuestionnaireView(CreateAPIView):
    serializer_class = QuestionnaireResponseSerializer

    def perform_create(self, serializer):
        phone_number = self.request.data.get("phoneNum")
        user, _ = User.objects.get_or_create(phoneNum=phone_number)
        serializer.save(user=user)