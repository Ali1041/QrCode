from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from rest_framework import permissions


# Create your views here.

class CreateUser(generics.CreateAPIView):
    serializer_class = UserSerializers
    permission_classes = []

    @method_decorator(ensure_csrf_cookie)
    def post(self, request, *args, **kwargs):
        print(request.POST)
        return super().post(request, *args, **kwargs)


def csrf(request):
    return JsonResponse({'csrf': get_token(request)})


class Qr(generics.RetrieveAPIView):
    serializer_class = QRSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    lookup_field = 'pk'

    def get_queryset(self):
        return Course.objects.filter(pk=self.kwargs['pk'])


class User(APIView):
    def get(self, request):
        print(request.user)
        x = MyUser.objects.get(email=request.user)
        if x.is_staff:
            y = Course.objects.get(teacher=request.user)
            serialize_y = CourseSerializer(y)
            return Response({'Teacher':True,'Course':serialize_y.data})
        else:
            return Response({'Teacher': False})


class MarkAttendance(APIView):

    def get(self,request,**kwargs):
        print(request.user,self.request,request.GET)
        student = MyUser.objects.get(email=request.user)
        course = Course.objects.get(name=kwargs['name'])
        mark = CourseAttendance.objects.create(mark=True,student=student,course=course)
        return Response({'Attendance':'Marked'})


class Logout(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        refersh_token = request.data['refresh']
        print(refersh_token)
        token = RefreshToken(refersh_token)
        token.blacklist()
        return JsonResponse({'status': '200'})
