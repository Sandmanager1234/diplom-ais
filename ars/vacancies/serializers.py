from rest_framework import serializers

from .models import Vacancy
# УДАЛЯЕМ этот импорт, так как он вызывает цикл:
# from relations.serializers import ResumeVacancyVSerializer # или ResumeVacancySerializer
from dictionary.models import (
    Grade, Currency, Experience, EmploymentType,
    ScheduleType, JobTitle, FormatOfWork, Branch
)

class VacancySerializer(serializers.ModelSerializer):
    grade = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Grade.objects.all(),
        allow_null=True, # Добавлено, если поле может быть пустым
        required=False   # Добавлено, если поле необязательно
    )
    currency = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Currency.objects.all(),
        allow_null=True,
        required=False
    )
    experience = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Experience.objects.all(),
        allow_null=True,
        required=False
    )
    employment_type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=EmploymentType.objects.all(),
        allow_null=True,
        required=False
    )
    schedule_type = serializers.SlugRelatedField(
        slug_field='name',
        queryset=ScheduleType.objects.all(),
        allow_null=True,
        required=False
    )
    job_title = serializers.SlugRelatedField(
        slug_field='name',
        queryset=JobTitle.objects.all(),
        allow_null=True,
        required=False
    )
    format_of_work = serializers.SlugRelatedField(
        slug_field='name',
        queryset=FormatOfWork.objects.all(),
        allow_null=True,
        required=False
    )
    branch = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Branch.objects.all(),
        allow_null=True,
        required=False
    )
    # Если у вас есть ManyToMany поля 'grades', 'skills', 'branches' в модели Vacancy
    # и вы хотите их представлять как список имен/slugs, их нужно определить здесь или в дочерних сериализаторах.
    # Например:
    # grades = serializers.SlugRelatedField(slug_field='name', queryset=Grade.objects.all(), many=True, required=False)
    # skills = serializers.SlugRelatedField(slug_field='name', queryset=Skill.objects.all(), many=True, required=False) # Skill - ваша модель скиллов
    # branches = serializers.SlugRelatedField(slug_field='name', queryset=Branch.objects.all(), many=True, required=False)

    class Meta:
        model = Vacancy
        fields = '__all__'


class VacancyListSerializer(VacancySerializer):
    candidate_count = serializers.IntegerField(read_only=True)
    # Убедитесь, что поля 'grades', 'skills', 'branches' корректно обрабатываются.
    # Если они являются ManyToMany полями и вы хотите специфичное представление (например, имена),
    # их лучше определить явно здесь или в VacancySerializer.
    # Если они уже есть в VacancySerializer.__all__ и их стандартное представление (PrimaryKeyRelatedField) вас устраивает,
    # то можно оставить так.
    # Для примера, если grades и branches - ManyToMany поля:
    grades = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Grade.objects.all(),
        many=True,
        required=False
    )
    # skills = serializers.SlugRelatedField( # Пример для skills
    #     slug_field='name',
    #     queryset=YourSkillModel.objects.all(), # Замените YourSkillModel на вашу модель скиллов
    #     many=True,
    #     required=False
    # )
    branches = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Branch.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Vacancy
        fields = ('id', 'title',
                  'experience', 'employment_type', 'schedule_type',
                  'created_by', 'job_title', 'format_of_work', 'is_open',
                  'created_at', 'updated_at', 'grades', 'skills', # 'skills' здесь оставлено, предположим, что оно есть в модели
                  'candidate_count', 'branches'
                  )



class VacancyDetailSerializer(VacancySerializer):
    # ИСПРАВЛЕНИЕ: Убираем скобки '(...)' после строки.
    # DRF должен сам обработать many=True из отношения модели (если Vacancy.resumes - это to-many).
    # read_only=True для 'resumes' уже указано в Meta.read_only_fields ниже.
    resumes = 'relations.serializers.ResumeVacancySerializer'

    class Meta:
        model = Vacancy
        fields = ('id', 'title', 'description', 'min_salary',
                  'max_salary', 'grade', 'currency', 'experience',
                  'employment_type', 'schedule_type', 'created_by',
                  'job_title', 'format_of_work', 'branch',
                  'is_need_higher_education', 'is_open', 'is_deleted',
                  'deleted_at', 'created_at', 'updated_at',
                  'resumes'  # Поле 'resumes' здесь
                  )
        read_only_fields = (
            'created_by', 'created_at', 'updated_at', 'is_deleted', 'deleted_at',
            'resumes'  # 'resumes' здесь явно указано как read_only
        )


class VacancySmallSerializer(serializers.ModelSerializer): # Рекомендуется наследоваться от ModelSerializer напрямую для "легких" сериализаторов
    # Если наследовать от VacancySerializer, он унаследует все его поля, включая SlugRelatedField с их querysets.
    # Для "маленького" сериализатора лучше определить поля явно и сделать их read_only, если они только для чтения.
    grade = serializers.SlugRelatedField(slug_field='name', read_only=True)
    experience = serializers.SlugRelatedField(slug_field='name', read_only=True)
    employment_type = serializers.SlugRelatedField(slug_field='name', read_only=True)
    schedule_type = serializers.SlugRelatedField(slug_field='name', read_only=True)
    format_of_work = serializers.SlugRelatedField(slug_field='name', read_only=True)
    branch = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Vacancy
        fields = ('id', 'title', 'grade', 'experience', 'employment_type', 'schedule_type', 'format_of_work', 'branch')