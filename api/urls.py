from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('notes/', views.getNotes, name='notes'),
    path('notes/scribble/', views.postScribbles, name='postscribbles'),
    path('note/<str:pk>/', views.getNote, name='note'),
    path('notes/<str:pk>/share/', views.shareNote, name='share-note'),
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login, name='login'),
    path('auth/logout/', views.logout, name='logout'),
    path('token/refresh/', views.tokenRefresh, name='token-refresh'),
]
