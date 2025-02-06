# backend/userManager/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

class RegisterOrLoginView(APIView):
    """携帯番号でユーザー登録またはログイン"""

    def post(self, request):
        phone_number = request.data.get('phoneNum')

        if not phone_number:
            return Response({"error": "携帯番号が必要です"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(phoneNum=phone_number)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
