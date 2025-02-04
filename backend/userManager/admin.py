from django.contrib import admin
from .models import User

class UserModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'phoneNum', 'reg_time']


admin.site.register(User,UserModelAdmin)