# backend/couponAPI/models.py


from django.db import models


class Coupon(models.Model):
    name = models.CharField(max_length=50)  # クーポン名
    description = models.TextField()         # クーポンの詳細
    usage_count = models.PositiveIntegerField(default=0)  # 使用回数
    max_uses = models.PositiveIntegerField(default=100)   # 最大使用回数
    probability = models.FloatField(default=0.33)  # 確率（将来調整可能）

    def __str__(self):
        return f"{self.name} - {self.probability}"


class Questionnaire(models.Model):
    name = models.CharField(max_length=50)  # クーポン名
    description = models.TextField()         # クーポンの詳細

    def __str__(self):
        return f"{self.name} - {self.description}"
