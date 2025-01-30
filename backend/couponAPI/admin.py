# backend/couponAPI/admin


from django.contrib import admin
from .models import Coupon


class CouponModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'probability']


admin.site.register(Coupon, CouponModelAdmin)
