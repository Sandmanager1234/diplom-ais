from django.contrib import admin

from .models import (
    Resume, 
    ResumeLanguage, 
    ResumeContact, 
    ResumeEducation, 
    ResumeEmploymentType,
    ResumeExperience,
    ResumeScheduleType
)


admin.site.register(Resume)
admin.site.register(ResumeLanguage)
admin.site.register(ResumeContact)
admin.site.register(ResumeEducation)
admin.site.register(ResumeEmploymentType)
admin.site.register(ResumeExperience)
admin.site.register(ResumeScheduleType)