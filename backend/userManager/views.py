from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import UserSerializer, MyTokenObtainPairSerializer


class RegisterOrLoginView(APIView):
    def post(self, request):
        phone_number = request.data.get('phoneNum')
        if not phone_number:
            return Response({"error": "携帯番号が必要です"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(phoneNum=phone_number)

        # トークン生成
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        serializer = UserSerializer(user)
        return Response({
            **serializer.data,
            'access': str(access),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class AdminLoginView(APIView):
    """特定電話番号のユーザー用 管理者JWTログイン"""

    def post(self, request):
        phone = request.data.get('phoneNum')
        password = request.data.get('password')

        if phone != '88886666':
            return Response({'error': '管理者専用番号ではありません'}, status=status.HTTP_403_FORBIDDEN)

        if password != 'adminpass':  # 仮のパスワード
            return Response({'error': 'パスワードが違います'}, status=status.HTTP_403_FORBIDDEN)

        user, _ = User.objects.get_or_create(phoneNum=phone)

        # JWTトークン発行
        refresh = RefreshToken.for_user(user)
        serializer = UserSerializer(user)

        return Response({
            'user': serializer.data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })


class MyTokenView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer