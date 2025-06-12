from rest_framework import serializers

from .models import (
    FavoriteResume,
    ResumeVacancy,
    FavoriteVacancy
)

# УДАЛЯЕМ этот импорт, так как он вызывает цикл:
# from vacancies.serializers import VacancySmallSerializer
from resumes.serializers import ResumeSmallSerializer # Этот импорт оставляем, он не вызывает проблем


class ResumeVacancySerializer(serializers.ModelSerializer):
    # ИСПРАВЛЕНИЕ: Убираем скобки '(...)' после строки.
    # read_only=True для 'vacancy' будет обеспечено через Meta.read_only_fields ниже,
    # или если VacancySmallSerializer сам по себе является read-only.
    vacancy = 'vacancies.serializers.VacancySmallSerializer'

    # Если ResumeSmallSerializer не участвует в цикле, его можно оставить как есть.
    # ResumeSmallSerializer(read_only=True) здесь корректно, так как это прямой вызов конструктора.
    resume = ResumeSmallSerializer(read_only=True)

    class Meta:
        model = ResumeVacancy
        fields = ('id', 'vacancy', 'resume', 'status', 'resume_id', 'vacancy_id')
        # Чтобы гарантировать, что 'vacancy' (и 'resume', если для него не указано read_only=True при определении)
        # будут только для чтения, когда они разрешаются из строки:
        read_only_fields = ('vacancy', 'resume') # Добавлено для явности


class FavoriteVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteVacancy
        fields = ('__all__')


class FavoriteResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteResume
        fields = ('__all__')