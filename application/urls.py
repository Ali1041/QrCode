from django.urls import path
from .views import *

app_name = 'application'

urlpatterns= [
    path('get-token/',csrf,name='csrf'),
    path('signup-user/',CreateUser.as_view(),name='signup'),
    path('to-qr-code/<int:pk>/',Qr.as_view(),name='qr'),
    path('logout/',Logout.as_view(),name='logout'),
    path('get-user/',User.as_view(),name='get-user'),
    path('<str:name>/',MarkAttendance.as_view(),name='mark-attendacne'),
]