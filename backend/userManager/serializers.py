# backend/userManager/serializers.py

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'phoneNum', 'reg_time', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff or obj.is_superuser