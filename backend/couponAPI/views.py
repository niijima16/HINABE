# backend/couponAPI/views.py

from rest_framework.views import APIView
from .models import Coupon
from rest_framework.response import Response
from .serializers import couponSerializers

# 機能１：クーポンViews
class couponView(APIView):
    # GET request
    def get(self, request):
        '''
        クーポン情報取得
        '''
        coupon_list = Coupon.objects.all()
        # 「オブジェクト」から「JSON」に整形
        serializer = couponSerializers(instance=coupon_list, many=True)

        return Response(serializer.data)

    # POST request
    def post(self, request):
        '''
        クーポン情報追加
        '''
        # 「JSON」から「オブジェクト」に整形
        print("data", request.data)
        serializer = couponSerializers(data=request.data)
        # 入ってくるJSONのデータをチェック
        if serializer.is_valid():
            # serializer更新
            serializer.save()

            return Response(serializer.data)  # 検証通過⇒DB更新
        else:
            return Response(serializer.errors)  # エラー⇒エラー内容を返す


class couponDetailView(APIView):
    # 特定のIDを調べる
    def get(self, request, id):
        coupon = Coupon.objects.get(pk=id)
        # 「オブジェクト」から特定のIDを「JSON」に整形
        serializer = couponSerializers(instance=coupon, many=False)

        return Response(serializer.data)

    # 修正
    def put(self, request, id):
        print(request.data)
        # 更新項目ID取得
        update_coupon = Coupon.objects.get(pk=id)
        # serializer設定の取得、整形は2回わたる
        serializer = couponSerializers(
            instance=update_coupon, data=request.data)

        # serializerでデータをチェック
        if serializer.is_valid():
            # チェック通過の場合データ更新
            serializer.save()
            return Response(serializer.data)

        else:
            return Response(serializer.errors)

    # 削除
    def delete(self, request, id):
        Coupon.objects.get(pk=id).delete()

        return Response()

# 機能２：アンケートViews
class questionnaireView(APIView):
    pass

class questionnaireDetailView(APIView):
    pass
