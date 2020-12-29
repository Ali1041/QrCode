from rest_framework import serializers
from .models import *


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        data = validated_data
        print(validated_data)
        pass1 = data.pop('password')
        print(pass1)
        user = MyUser.objects.create(email=validated_data['email'], username=validated_data['username'])
        user.set_password(pass1)
        user.save()
        return user


class QRSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'