# backend/userManager/serializers.py

from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'phoneNum', 'reg_time', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff or obj.is_superuser
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['phoneNum'] = user.phoneNum
        token['isAdmin'] = user.is_staff or user.is_superuser
        return token