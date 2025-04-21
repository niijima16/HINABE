# backend/couponAPI/views/questonnaire.py

from rest_framework import viewsets, permissions, status
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
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
    permission_classes = [permissions.IsAdminUser]

    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        Questionnaire.objects.update(is_active=False)  # 全てのアンケートを非アクティブに
        questionnaire = self.get_object()
        questionnaire.is_active = True
        questionnaire.save()
        return Response({'status': 'activated'}, status=status.HTTP_200_OK)

# ユーザーがアンケートを取得
class QuestionnaireListView(ListAPIView):
    """ユーザーが回答するためにアクティブなアンケートの内容を取得する"""
    queryset = Questionnaire.objects.filter(is_active=True)
    serializer_class = QuestionnaireSerializer

# アンケートの回答を保存
class SubmitQuestionnaireView(CreateAPIView):
    serializer_class = QuestionnaireResponseSerializer

    def perform_create(self, serializer):
        phone_number = self.request.data.get("phoneNum")
        user, _ = User.objects.get_or_create(phoneNum=phone_number)
        serializer.save(user=user)