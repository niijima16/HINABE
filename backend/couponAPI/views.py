# backend/couponAPI/views.py

from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from .models import Coupon
from rest_framework.response import Response
from rest_framework import serializers


class couponSerializers(serializers.Serializer):
    name = serializers.CharField(max_length=50)  # クーポン名
    description = serializers.CharField()         # クーポンの詳細
    usage_count = serializers.IntegerField(default=0)  # 使用回数
    max_uses = serializers.IntegerField(default=100)   # 最大使用回数
    probability = serializers.FloatField(default=0.33)  # 確率（将来調整可能）


class couponView(APIView):

    def get(self, request):
        coupon_list = Coupon.objects.all()

        serializer = couponSerializers(instance=coupon_list, many=True)

        return Response(serializer.data)
