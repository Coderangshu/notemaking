from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Note, NotePermission
from .serializers import NoteSerializer, NotePermissionSerializer, UserSerializer, SignupSerializer, LoginSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'Endpoint': '/notes/', 'method': 'GET', 'description': 'Returns notes accessible by the user'},
        {'Endpoint': '/notes/', 'method': 'POST', 'description': 'Creates a new note for the user'},
        {'Endpoint': '/notes/scribble/', 'method': 'POST', 'description': 'Creates a new scribble for the user'},
        {'Endpoint': '/note/<id>/', 'method': 'GET', 'description': 'Returns a single note if user has access'},
        {'Endpoint': '/note/<id>/', 'method': 'PUT', 'description': 'Updates a note if the user is the owner'},
        {'Endpoint': '/note/<id>/', 'method': 'DELETE', 'description': 'Deletes a note if the user is the owner'},
        {'Endpoint': '/note/<id>/share/', 'method': 'POST', 'description': 'Shares a note with a user'},
        {'Endpoint': '/token/refresh/', 'method': 'POST', 'description': 'Return new access token for a given refresh token'},
        {'Endpoint': '/auth/signup/', 'method': 'POST', 'description': 'Registers a new user'},
        {'Endpoint': '/auth/login/', 'method': 'POST', 'description': 'Logs in the user'},
        {'Endpoint': '/auth/logout/', 'method': 'POST', 'description': 'Logs out the user'},
    ]
    return Response(routes)

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator

@api_view(['POST'])
@permission_classes([AllowAny])  # Allows any user to access the endpoint
def tokenRefresh(request):
    refresh_token = request.data.get("refresh")
    if refresh_token is None:
        return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        token = RefreshToken(refresh_token)
        # token.access_token['username'] = refresh_token['username']
        access_token = str(token.access_token)
        return Response({"access": access_token}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            # refresh['username'] = user.username
            access = refresh.access_token
            access['username'] = user.username
            return Response({'refresh': str(refresh), 'access': str(access)}, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"detail": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    if request.method == 'GET':
        notes = Note.objects.filter(owner=request.user)
        shared_notes_permissions = NotePermission.objects.filter(user=request.user)
        shared_notes = Note.objects.filter(id__in=shared_notes_permissions.values('note_id'))
        all_notes = notes.union(shared_notes).order_by('-updated')
        serializer = NoteSerializer(all_notes, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = request.data
        note = Note.objects.create(owner=request.user, body=data['body'])
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postScribbles(request):    
    if request.method == 'POST':
        data = request.data
        note = Note.objects.create(owner=request.user, body=data, type="scribble3847261930")
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    permissions = NotePermission.objects.filter(note=note, user=request.user).first()

    if not (note.owner == request.user or (permissions and permissions.permission == NotePermission.READ_WRITE)):
        return Response({"detail": "Not authorized to access this note"}, status=403)

    if request.method == 'GET':
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)

    if request.method == 'PUT':
        if note.owner != request.user:
            return Response({"detail": "Only the owner can edit this note"}, status=403)
        note.body = request.data['body']
        note.save()
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)

    if request.method == 'DELETE':
        if note.owner != request.user:
            return Response({"detail": "Only the owner can delete this note"}, status=403)
        note.delete()
        return Response('Note Deleted Successfully')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shareNote(request, pk):
    note = Note.objects.get(id=pk)
    if note.owner != request.user:
        return Response({"detail": "Only the owner can share this note"}, status=403)
    data = request.data
    shared_user = User.objects.get(username=data['username'])
    permission = data['permission']
    note_permission, created = NotePermission.objects.get_or_create(note=note, user=shared_user)
    note_permission.permission = permission
    note_permission.save()
    serializer = NotePermissionSerializer(note_permission)
    return Response(serializer.data)
