# backend/couponAPI/views/coupon.py

import random
from datetime import timedelta
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import models
from couponAPI.models import Coupon, CouponLotteryHistory
from userManager.models import User

class CouponLotteryView(APIView):
    """
    クーポン抽選（ユーザーは1週間に1回のみ、必ず1つ当選）
    """
    def post(self, request):
        phone_number = request.data.get("phoneNum")

        # ユーザー取得またはエラーハンドリング
        try:
            user = User.objects.get(phoneNum=phone_number)
        except User.DoesNotExist:
            return Response({"error": "ユーザーが見つかりません"}, status=status.HTTP_404_NOT_FOUND)

        # 過去1週間以内の抽選履歴を確認
        one_week_ago = now() - timedelta(weeks=1)
        recent_draw = CouponLotteryHistory.objects.filter(user=user, draw_time__gte=one_week_ago)
        
        if recent_draw.exists():
            return Response({"message": "1週間に1回のみ抽選できます"}, status=status.HTTP_403_FORBIDDEN)
        
        # 利用可能なクーポンを取得（使用上限に達していないもの）
        available_coupons = Coupon.objects.filter(usage_count__lt=models.F('max_uses'))
        
        if not available_coupons.exists():
            return Response({"message": "現在利用可能なクーポンがありません"}, status=status.HTTP_200_OK)
        
        # 確率に基づいて抽選（必ず1つ当選）
        chosen_coupon = random.choices(
            available_coupons, weights=[c.probability for c in available_coupons]
        )[0]

        # クーポンの使用回数を更新
        chosen_coupon.usage_count += 1
        chosen_coupon.save()

        # 抽選履歴を保存
        CouponLotteryHistory.objects.create(user=user, coupon=chosen_coupon)
        
        return Response({
            "message": "当選しました！",
            "coupon": {"name": chosen_coupon.name, "description": chosen_coupon.description}
        }, status=status.HTTP_200_OK)
