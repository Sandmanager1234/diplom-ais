from django.db import models

from vacancies.models import Vacancy
from resumes.models import Resume
from users.models import Recruiter
from dictionary.models import ResumeStatus


class ResumeVacancy(models.Model):
    vacancy_id = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE, related_name='resumes'
    )
    resume_id = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='vacancies'
    )
    status = models.ForeignKey(
        ResumeStatus, on_delete=models.DO_NOTHING, related_name='resumevacancies'
        
    )


class FavoriteResume(models.Model):
    recruiter_id = models.ForeignKey(
        Recruiter, on_delete=models.CASCADE, related_name='resumes'
    )
    resume_id = models.ForeignKey(
        Resume, on_delete=models.CASCADE, related_name='favorite_recrutiers'
    )


class FavoriteVacancy(models.Model):
    recruiter_id = models.ForeignKey(
        Recruiter, on_delete=models.CASCADE, related_name='vacancies'
    )
    vacancy_id = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE, related_name='favorite_recrutiers'
    )
    
