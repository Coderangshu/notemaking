# Model: Represents a note created by a user with fields for the note’s content (body), creation and update timestamps (created, updated), and the type of note (type). Each note is linked to a specific user as its owner.
# Model: Manages permissions for shared notes, linking a note to a user and specifying the permission type (READ or READ_WRITE). Ensures that each note-user combination is unique.

from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes', null=True)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=50, null=True, blank=True)

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
