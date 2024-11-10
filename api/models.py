from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes', null=True)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[:50]

class NotePermission(models.Model):
    READ = 'read'
    READ_WRITE = 'read_write'
    PERMISSION_CHOICES = [
        (READ, 'Read'),
        (READ_WRITE, 'Read/Write'),
    ]

    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='permissions')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_notes')
    permission = models.CharField(max_length=10, choices=PERMISSION_CHOICES, default=READ)

    class Meta:
        unique_together = ('note', 'user')

    def __str__(self):
        return f"{self.user.username} - {self.permission} on {self.note}"
