# backend/couponAPI/models.py

from django.db import models
from django.db.models import JSONField
from userManager.models import User


class Coupon(models.Model):
    name = models.CharField(max_length=50)  # クーポン名
    description = models.TextField()         # クーポンの詳細
    usage_count = models.PositiveIntegerField(default=0)  # 使用回数
    max_uses = models.PositiveIntegerField(default=100)   # 最大使用回数
    probability = models.FloatField(default=0.33)  # 確率（将来調整可能）

    def __str__(self):
        return f"{self.name} - {self.probability}"

# クーポンの履歴


class CouponLotteryHistory(models.Model):
    """クーポン抽選履歴を記録するモデル"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # 抽選したユーザー
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE)  # 当選したクーポン
    draw_time = models.DateTimeField(auto_now_add=True)  # 抽選日時

    def __str__(self):
        return f"{self.user.phoneNum} - {self.coupon.name} - {self.draw_time}"

################################################################################


class Questionnaire(models.Model):
    """アンケートの内容を管理するモデル（管理者用）"""
    name = models.CharField(max_length=100)  # アンケート名
    questions = models.JSONField(default=dict)  # JSON形式で質問内容を保存

    def __str__(self):
        return self.name


''' # JSONデータの例
# {
#   "年齢": ["20代", "30代", "40代", "50代", "60代", "60代以上"],
#   "性別": ["男性", "女性", "その他"],
#   "興味": ["スポーツ", "映画", "読書"]
# }
# '''


class QuestionnaireResponse(models.Model):
    """ユーザーのアンケート回答を保存するモデル"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    questionnaire = models.ForeignKey(
        Questionnaire, on_delete=models.CASCADE)  # どのアンケートに回答したか
    responses = models.JSONField()  # { "age": "30代", "gender": "男性" } などの形式で保存
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.phoneNum} - {self.questionnaire.name}"
