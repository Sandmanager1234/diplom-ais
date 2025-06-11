from rest_framework import serializers

from .models import (
    ScheduleType,
    ResumeStatus,
    Region,
    Country, 
    City,
    Currency,
    Branch,
    FormatOfWork,
    JobTitle,
    LanguageLevel, 
    Language,
    Experience,
    EmploymentType,
    Grade
)
        

class ScheduleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleType
        fields = ('__all__')


class ResumeStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeStatus
        fields = ('__all__')


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('__all__')


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('__all__')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('__all__')


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('__all__')


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('name',)


class FormatOfWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormatOfWork
        fields = ('__all__')


class JobTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobTitle
        fields = ('__all__')


class LanguageLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageLevel
        fields = ('__all__')


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('__all__')


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ('__all__')


class EmploymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentType
        fields = ('__all__')


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('__all__')

