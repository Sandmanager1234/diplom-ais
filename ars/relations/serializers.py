from rest_framework import serializers

from .models import (
    FavoriteResume,
    ResumeVacancy,
    FavoriteVacancy
)

from vacancies.serializers import VacancySmallSerializer
from resumes.serializers import ResumeSmallSerializer


class ResumeVacancySerializer(serializers.ModelSerializer):
    vacancy = VacancySmallSerializer(read_only=True)
    resume = ResumeSmallSerializer(read_only=True)
    class Meta:
        model = ResumeVacancy
        fields = ('id', 'vacancy', 'resume', 'status', 'resume_id', 'vacancy_id')


class FavoriteVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteVacancy
        fields = ('__all__')


class FavoriteResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteResume
        fields = ('__all__')