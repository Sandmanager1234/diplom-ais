from django.contrib import admin
from .models import (
    Currency,
    Grade,
    EmploymentType,
    ScheduleType,
    Experience,
    Language,
    Country,
    Region,
    City,
    LanguageLevel,
    FormatOfWork,
    JobTitle,
    Branch
)


admin.site.register(Currency)
admin.site.register(Grade)
admin.site.register(EmploymentType)
admin.site.register(ScheduleType)
admin.site.register(Experience)
admin.site.register(Language)
admin.site.register(Country)
admin.site.register(Region)
admin.site.register(City)
admin.site.register(LanguageLevel)
admin.site.register(FormatOfWork)
admin.site.register(JobTitle)
admin.site.register(Branch)
