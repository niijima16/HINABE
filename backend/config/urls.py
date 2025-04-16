# backend/config/urls.py

from django.contrib import admin
from django.urls import path, include
from userManager.views import MyTokenView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # アプリ別ルーティング
    path('coupon/', include('couponAPI.urls')),
    path('user/', include('userManager.urls')),

    # API共通エンドポイント（ユーザーAPI + クーポンAPI）
    path('api/user/', include('userManager.urls')),
    path('api/coupon/', include('couponAPI.urls')),

    # JWT 認証エンドポイント（SimpleJWT）
    path('api/jwt/token/', MyTokenView.as_view(), name='token_obtain_pair'),  # カスタムビュー
    path('api/jwt/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]