# Generated by Django 4.1.3 on 2024-11-26 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_note_owner_notepermission'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='type',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
