from rest_framework import serializers

from .models import (
    FavoriteResume,
    ResumeVacancy,
    FavoriteVacancy
)


class ResumeVacancySerializer(serializers.ModelSerializer):
    vacancy = 'vacancies.serializers.VacancySmallSerializer'
    resume = 'resumes.serializers.ResumeSmallSerializer'
    class Meta:
        model = ResumeVacancy
        fields = ('id', 'vacancy', 'resume', 'status', 'resume_id', 'vacancy_id')
        read_only_fields = ('vacancy', 'resume')


class FavoriteVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteVacancy
        fields = ('__all__')


class FavoriteResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteResume
        fields = ('__all__')