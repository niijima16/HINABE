# backend/couponAPI/serializers.py

from rest_framework import serializers
from .models import Coupon, Questionnaire, QuestionnaireResponse

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = "__all__"
        
class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['id', 'name', 'questions']  # フロントに質問内容を送る

class QuestionnaireResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireResponse
        fields = ['id', 'user', 'questionnaire', 'responses', 'submitted_at']