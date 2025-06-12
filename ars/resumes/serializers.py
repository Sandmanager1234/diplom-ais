from rest_framework import serializers
from .models import (
    Resume, ResumeEducation, ResumeExperience, ResumeLanguage, ResumeContact,
    ResumeScheduleType, ResumeEmploymentType
)

class ResumeEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeEducation
        fields = ['id', 'institution_name', 'education_type', 'end_year']


class ResumeExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeExperience
        fields = ['id', 'company_name', 'title', 'start_date', 'end_date', 'is_current', 'description']


class ResumeLanguageSerializer(serializers.ModelSerializer):
    language = serializers.StringRelatedField()  
    level = serializers.StringRelatedField()   

    class Meta:
        model = ResumeLanguage
        fields = ['id', 'language', 'level']


class ResumeContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeContact
        fields = ['id', 'contact_type', 'contact_value', 'is_primary']


class ResumeScheduleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeScheduleType
        fields = ['id', 'name']


class ResumeEmploymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeEmploymentType
        fields = ['id', 'name']


class ResumeSerializer(serializers.ModelSerializer):
    country = serializers.StringRelatedField()
    city = serializers.StringRelatedField()
    region = serializers.StringRelatedField()
    currency = serializers.StringRelatedField()
    created_by = serializers.StringRelatedField()

    educations = ResumeEducationSerializer(many=True)
    experiences = ResumeExperienceSerializer(many=True)
    languages = ResumeLanguageSerializer(many=True)
    contacts = ResumeContactSerializer(many=True)

    schedule_types = serializers.SerializerMethodField()
    employment_types = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = [
            'id', 'title', 'description', 'first_name', 'last_name', 'middle_name',
            'birth_date', 'gender', 'country', 'city', 'region', 'salary', 'currency',
            'ready_to_relocate', 'ready_to_buisiness_trip', 'version', 'created_by',
            'is_active', 'created_at', 'updated_at', 'deleted_at', 'is_deleted',
            'educations', 'experiences', 'languages', 'contacts',
            'schedule_types', 'employment_types'
        ]

    def get_schedule_types(self, obj):
        return [str(s.name) for s in obj.schedule_types.all()]

    def get_employment_types(self, obj):
        return [str(e.name) for e in obj.employment_types.all()]
