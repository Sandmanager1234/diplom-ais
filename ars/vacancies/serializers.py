from rest_framework import serializers

from .models import Vacancy
from dictionary.models import (
    Grade, Currency, Experience, EmploymentType,
    ScheduleType, JobTitle, FormatOfWork, Branch
)

class VacancySerializer(serializers.ModelSerializer):
    grade = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Grade.objects.all()
    )
    currency = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Currency.objects.all()
    )
    experience = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Experience.objects.all()
    )
    employment_type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=EmploymentType.objects.all()
    )
    schedule_type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=ScheduleType.objects.all()
    )
    job_title = serializers.SlugRelatedField(
        slug_field='name',
        queryset=JobTitle.objects.all()
    )
    format_of_work = serializers.SlugRelatedField(
        slug_field='name',
        queryset=FormatOfWork.objects.all()
    )
    branch = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Branch.objects.all()
    )

    class Meta:
        model = Vacancy
        fields = '__all__'


class VacancyListSerializer(VacancySerializer):
    candidate_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Vacancy
        fields = ('id', 'title',
                  'experience', 'employment_type', 'schedule_type',
                  'created_by', 'job_title', 'format_of_work', 'is_open',
                  'created_at', 'updated_at', 'grades', 'skills', 
                  'candidate_count', 'branches'
                  ) 


class VacancyDetailSerializer(VacancySerializer):
    # resumes = ResumeVacancyVSerializer(many=True, read_only=True)
    class Meta:
        model = Vacancy
        fields = ('id', 'title', 'description', 'min_salary',
                  'max_salary', 'grade', 'currency', 'experience',
                  'employment_type', 'schedule_type', 'created_by',
                  'job_title', 'format_of_work', 'branch',
                  'is_need_higher_education', 'is_open', 'is_deleted',
                  'deleted_at', 'created_at', 'updated_at'
                  )
        read_only_fields = (
            'created_by', 'created_at', 'updated_at', 'is_deleted', 'deleted_at', 'resumes'
        )


class VacancySmallSerializer(VacancySerializer):
    class Meta:
        model = Vacancy
        fields = ('id', 'title', 'grade', 'experience', 'employment_type', 'schedule_type', 'format_of_work', 'branch')


