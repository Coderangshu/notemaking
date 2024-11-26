# Imports the Django admin module, which provides a built-in interface for managing models in a web-based dashboard.
# Imports the Note model from the current app's models.py file.
# Registers the Note model with the admin site.

from django.contrib import admin
from .models import Note

admin.site.register(Note)
