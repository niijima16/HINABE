from django.db import models

class User(models.Model):
    phoneNum = models.SmallIntegerField(max_length=20)  # 携帯番号
    reg_time = models.DateTimeField(verbose_name="登録日時", auto_now_add=True)         # クーポンの詳細


    def __str__(self):
        return f"{self.phoneNum} - {self.reg_time}"
