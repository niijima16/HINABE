# backend/userManager/serializers.py

from rest_framework import serializers
from .models import User


# class couponSerializers(serializers.Serializer):
#     name = serializers.CharField(max_length=50)  # クーポン名
#     description = serializers.CharField()         # クーポンの詳細
#     usage_count = serializers.IntegerField(default=0)  # 使用回数
#     max_uses = serializers.IntegerField(default=100)   # 最大使用回数
#     probability = serializers.FloatField(default=0.33)  # 確率（調整可能）

#     def create(self, validated_data):
#         new_data = Coupon.objects.create(**self.validated_data)

#         return new_data

#     def update(self, instance, validated_data):
#         # チェック通過の場合データ更新
#         Coupon.objects.filter(pk=instance.pk).update(
#             **validated_data)
#         # インスタンスに更新値を付与
#         Updated_coupon = Coupon.objects.get(pk=instance.pk)
#         # 更新し値を返す

#         return Updated_coupon

class userSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"