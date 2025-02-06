# backend/couponAPI/admin

from django.contrib import admin
from .models import Coupon, Questionnaire, QuestionnaireResponse, CouponLotteryHistory

class CouponModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Coupon._meta.fields]  # すべてのフィールドを表示

admin.site.register(Coupon, CouponModelAdmin)

class QuestionnaireModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Questionnaire._meta.fields]  # すべてのフィールドを表示

admin.site.register(Questionnaire, QuestionnaireModelAdmin)

class QuestionnaireResponseModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in QuestionnaireResponse._meta.fields]  # すべてのフィールドを表示

admin.site.register(QuestionnaireResponse, QuestionnaireResponseModelAdmin)

class CouponLotteryHistoryModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in CouponLotteryHistory._meta.fields]  # すべてのフィールドを表示

admin.site.register(CouponLotteryHistory, CouponLotteryHistoryModelAdmin)


