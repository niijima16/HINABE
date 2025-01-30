# backend/couponAPI/serializers.py


from rest_framework import serializers
from .models import Coupon


class couponSerializers(serializers.Serializer):
    name = serializers.CharField(max_length=50)  # クーポン名
    description = serializers.CharField()         # クーポンの詳細
    usage_count = serializers.IntegerField(default=0)  # 使用回数
    max_uses = serializers.IntegerField(default=100)   # 最大使用回数
    probability = serializers.FloatField(default=0.33)  # 確率（調整可能）

    def create(self, validated_data):
        new_data = Coupon.objects.create(**self.validated_data)

        return new_data
