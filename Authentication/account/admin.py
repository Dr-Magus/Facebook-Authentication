from django.contrib import admin
from .models import UserAccount, File

# Register your models here.

admin.site.register(UserAccount)
admin.site.register(File)