
# backend/couponAPI/admin

from django.contrib import admin
from .models import Coupon, Questionnaire


class CouponModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'probability']


admin.site.register(Coupon,CouponModelAdmin)

class QuestionnaireModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']


admin.site.register(Questionnaire,QuestionnaireModelAdmin)
