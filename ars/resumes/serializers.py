from rest_framework import serializers
from .models import (
    Resume, 
    ResumeContact, 
    ResumeEducation,
    ResumeExperience,
    ResumeEmploymentType,
    ResumeLanguage,
    ResumeScheduleType
)


from rest_framework import serializers
from resumes.models import (
    Resume, ResumeEducation, ResumeExperience, ResumeLanguage,
    ResumeContact, ResumeScheduleType, ResumeEmploymentType
)
from dictionary.models import (
    Country, City, Region, Language, LanguageLevel, EmploymentType, ScheduleType, Currency
)
from dictionary.serializers import (
    CountrySerializer, CitySerializer, RegionSerializer,
    LanguageSerializer, LanguageLevelSerializer,
    EmploymentTypeSerializer, ScheduleTypeSerializer, CurrencySerializer
)


class ResumeEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeEducation
        exclude = ['resume']


class ResumeExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeExperience
        exclude = ['resume']


class ResumeLanguageSerializer(serializers.ModelSerializer):
    language = LanguageSerializer()
    level = LanguageLevelSerializer()

    class Meta:
        model = ResumeLanguage
        exclude = ['resume']


class ResumeContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeContact
        exclude = ['resume']


class ResumeScheduleTypeSerializer(serializers.ModelSerializer):
    name = ScheduleTypeSerializer()

    class Meta:
        model = ResumeScheduleType
        exclude = ['resume']


class ResumeEmploymentTypeSerializer(serializers.ModelSerializer):
    name = EmploymentTypeSerializer()

    class Meta:
        model = ResumeEmploymentType
        exclude = ['resume']


class ResumeSerializer(serializers.ModelSerializer):
    country = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Country.objects.all(),
        required=False
    )
    city = serializers.SlugRelatedField(
        slug_field='name',
        queryset=City.objects.all(),
        required=False
    )
    region = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Region.objects.all(),
        required=False
    )
    currency = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Currency.objects.all(),
        required=False
    )
    educations = ResumeEducationSerializer(many=True, required=False)
    experiences = ResumeExperienceSerializer(many=True, required=False)
    languages = ResumeLanguageSerializer(many=True, required=False)
    contacts = ResumeContactSerializer(many=True, required=False)
    schedule_types = ResumeScheduleTypeSerializer(many=True, required=False)
    employment_types = ResumeEmploymentTypeSerializer(many=True, required=False)

    class Meta:
        model = Resume
        fields = ('__all__')
        read_only_fields = ['created_at', 'updated_at']


class ResumeSmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ('id', 'last_name', 'first_name', 'middle_name')