# backend/userManager/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
# JWT
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


class RegisterOrLoginView(APIView):
    """携帯番号でユーザー登録またはログイン"""

    def post(self, request):
        phone_number = request.data.get('phoneNum')

        if not phone_number:
            return Response({"error": "携帯番号が必要です"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(phoneNum=phone_number)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class AdminLoginView(APIView):
    """特定電話番号のユーザー用 管理者認証"""

    def post(self, request):
        phone = request.data.get('phoneNum')
        password = request.data.get('password')

        if phone != '88886666':
            return Response({'error': '管理者専用番号ではありません'}, status=status.HTTP_403_FORBIDDEN)

        if password != 'adminpass':  # ここは仮の固定パスワード
            return Response({'error': 'パスワードが違います'}, status=status.HTTP_403_FORBIDDEN)

        user, _ = User.objects.get_or_create(phoneNum=phone)
        return Response({
            'id': user.id,
            'phoneNum': user.phoneNum,
            'reg_time': user.reg_time,
            'isAdmin': True,
        })
    
class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer