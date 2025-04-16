# backend/userManager/models.py

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, phoneNum, password=None, **extra_fields):
        if not phoneNum:
            raise ValueError("電話番号は必須です")
        user = self.model(phoneNum=phoneNum, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phoneNum, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(phoneNum, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    phoneNum = models.CharField(max_length=20, unique=True)
    reg_time = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'phoneNum'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.phoneNum
