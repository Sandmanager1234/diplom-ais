from django.db import models

from users.models import Recruiter
from dictionary.models import (
    EmploymentType,
    ScheduleType,
    Currency,
    Experience,
    JobTitle,
    FormatOfWork,
    Branch,
    Grade
)


class Vacancy(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    min_salary = models.DecimalField(max_digits=10, decimal_places=2)
    max_salary = models.DecimalField(max_digits=10, decimal_places=2)
    grade = models.ForeignKey(
        Grade, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    currency = models.ForeignKey(
        Currency, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    experience = models.ForeignKey(
        Experience, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    employment_type = models.ForeignKey(
        EmploymentType, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    schedule_type = models.ForeignKey(
        ScheduleType, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    created_by = models.ForeignKey(
        Recruiter, on_delete=models.DO_NOTHING, related_name='created_vacancies'
    )
    job_title = models.ForeignKey(
        JobTitle, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    format_of_work = models.ForeignKey(
        FormatOfWork, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    branch = models.ForeignKey(
        Branch, on_delete=models.DO_NOTHING, related_name='vacancies'
    )
    is_need_higher_education = models.BooleanField(default=False)
    is_open = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


