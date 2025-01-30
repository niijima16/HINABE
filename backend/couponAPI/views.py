# backend/couponAPI/views.py


from rest_framework.views import APIView
from .models import Coupon
from rest_framework.response import Response
from .serializers import couponSerializers


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

    # 特定のIDの内容を修正
    def put(self, request, id):
        # 更新にするデータを獲得
        print(request.data)
        # serializerの構築
        UpdateCoupon = Coupon.objects.get(pk=id)
        serializer = couponSerializers(instance=UpdateCoupon,data=request.data)
        if serializer.is_valid():
            Coupon.objects.filter(pk=id).update(**serializer.validated_data)
        else:
            return Response(serializer.errors) 
    
    # 特定のIDの内容を削除
    def delete(self, request, id):
        Coupon.objects.get(pk=id).delete()
        return Response()
