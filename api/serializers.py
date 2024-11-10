from rest_framework.serializers import ModelSerializer, CharField
from .models import Note, NotePermission
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class NotePermissionSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = NotePermission
        fields = ['user', 'permission']

class NoteSerializer(ModelSerializer):
    owner = UserSerializer(read_only=True)
    permissions = NotePermissionSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'body', 'updated', 'created', 'owner', 'permissions']

class SignupSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

class LoginSerializer(ModelSerializer):
    username = CharField()
    password = CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'password']
