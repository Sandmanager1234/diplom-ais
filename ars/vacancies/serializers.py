from rest_framework import serializers

from .models import Vacancy
from dictionary.models import (
    Grade, Currency, Experience, EmploymentType,
    ScheduleType, JobTitle, FormatOfWork, Branch
)

class VacancySerializer(serializers.ModelSerializer):
    grade = serializers.StringRelatedField(
        slug_field='name', read_only=True
    )
    currency = serializers.StringRelatedField(
        slug_field='name', read_only=True
    )
    experience = serializers.StringRelatedField(
        slug_field='name', read_only=True
    )
    employment_type = serializers.StringRelatedField(
        slug_field='name', read_only=True
    )
    schedule_type = serializers.StringRelatedField(
        slug_field='name', read_only=True
    )
    job_title = serializers.StringRelatedField(
        slug_field='name', read_only=True
    )
    format_of_work = serializers.StringRelatedField(
        slug_field='name', read_only=True
    )
    branch = serializers.StringRelatedField(
        slug_field='name', read_only=True
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
                  'created_at', 'updated_at', 'grade', 'branch', 
                  'candidate_count'
                  )


class VacancyDetailSerializer(VacancySerializer):
    resumes = 'relations.serializers.ResumeVacancySerializer'

    class Meta:
        model = Vacancy
        fields = ('id', 'title', 'description', 'min_salary',
                  'max_salary', 'grade', 'currency', 'experience',
                  'employment_type', 'schedule_type', 'created_by',
                  'job_title', 'format_of_work', 'branch',
                  'is_need_higher_education', 'is_open', 'is_deleted',
                  'deleted_at', 'created_at', 'updated_at',
                  'resumes' 
                  )
        read_only_fields = (
            'created_by', 'created_at', 'updated_at', 'is_deleted', 'deleted_at',
            'resumes'  
        )


class VacancySmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = ('id', 'title', 'grade', 'experience', 'employment_type', 'schedule_type', 'format_of_work', 'branch')