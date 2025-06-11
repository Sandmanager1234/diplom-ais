from django.db import models

from dictionary.models import (
    Country, 
    City, 
    Region, 
    Language, 
    LanguageLevel, 
    EmploymentType, 
    ScheduleType,
    Currency,

)
from users.models import Recruiter


class Resume(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.DateField()
    gender = models.CharField(max_length=10, choices=[
        ('м', 'Мужской'),
        ('ж', 'Женский')
    ])
    country = models.ForeignKey(
        Country, on_delete=models.DO_NOTHING, related_name='resumes'
    )
    city = models.ForeignKey(
        City, on_delete=models.DO_NOTHING, related_name='resumes'
    )
    region = models.ForeignKey(
        Region, on_delete=models.DO_NOTHING, related_name='resumes'
    )
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.ForeignKey(
        Currency, on_delete=models.DO_NOTHING, related_name='currence_vacancy'
    )
    ready_to_relocate = models.BooleanField(default=False)
    ready_to_buisiness_trip = models.BooleanField(default=False)
    version = models.CharField(max_length=255, default='1')
    created_by = models.ForeignKey(
        Recruiter, on_delete=models.DO_NOTHING, related_name='created_resumes'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    

class ResumeEducation(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='educations'
    )
    
    institution_name = models.CharField(max_length=255)
    education_type = models.CharField(max_length=255, choices=[
        ('среднее', 'Среднее образование'),
        ('высшее', 'Высшее образование'),
        ('высшее_неоконченное', 'Высшее образование (неоконченное)'),
        ('профессиональное', 'Профессиональное образование'),
        ('дополнительное', 'Дополнительное образование'),
        ('курсы', 'Курсы повышения квалификации')
    ])
    end_year = models.IntegerField()











class ResumeExperience(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='experiences'
    )
    company_name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)


class ResumeLanguage(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='languages'
    )
    language = models.ForeignKey(
        Language, on_delete=models.CASCADE, related_name='resumes'
    )
    level = models.ForeignKey(
        LanguageLevel, on_delete=models.CASCADE, related_name='resumes'
    )


class ResumeContact(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='contacts'
    )
    contact_type = models.CharField(max_length=255, choices=[
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('linkedin', 'LinkedIn'),
        ('github', 'GitHub'),
        ('telegram', 'Telegram'),
        ('whatsapp', 'WhatsApp'),
        ('other', 'Other')
    ])
    contact_value = models.CharField(max_length=255)
    is_primary = models.BooleanField(default=False)


class ResumeScheduleType(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='schedule_types'
    )
    name = models.ForeignKey(
        ScheduleType, on_delete=models.CASCADE, related_name='resumes'
    )


class ResumeEmploymentType(models.Model):
    resume = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='employment_types'
    )
    name = models.ForeignKey(
        EmploymentType, on_delete=models.CASCADE, related_name='resumes'
    )

