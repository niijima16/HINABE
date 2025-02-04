from rest_framework.views import APIView
from .models import User
from rest_framework.response import Response
from .serializers import userSerializers


class userView(APIView):
    def get(self, request):
        phoneList = User.objects.get(self, request)

        serializer = userSerializers(instance=phoneList, many=True)

        return Response(serializer.data)

    def post(self, request):
        print("data", request.data)

        serializer = userSerializers(data=request.data)
        if serializer.is_valid:
            serializer.save()
            return Response(serializer.data)

        else:
            return Response(serializer.errors)


class userDetailView(APIView):
    def get(self, request, id):
        a_phoneNum = User.objects.get(pk=id)

        serializer = userSerializers(instance=a_phoneNum, many=False)

        return Response(serializer.data)

    def put(self, request, id):
        update_phoneNum = User.objects.get(pk=id)

        serializer = userSerializers(
            instance=update_phoneNum, data=request.data)

        if serializer.is_valid:
            serializer.save()

            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    def delete(self, request, id):
        User.objects.get(pk=id).delete()

        return Response()