# backend/userManager/models.py

from django.db import models

class User(models.Model):
    phoneNum = models.CharField(max_length=15, unique=True)  # 携帯番号（SmallIntegerField だと先頭の0が消える可能性があるため、CharFieldを推奨）
    reg_time = models.DateTimeField(auto_now_add=True)  # 登録時間

    def __str__(self):
        return f"{self.phoneNum} - {self.reg_time}"

