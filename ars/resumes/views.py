from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import (
    Resume, 
    ResumeContact, 
    ResumeEducation,
    ResumeExperience,
    ResumeEmploymentType,
    ResumeLanguage,
    ResumeScheduleType
)
from relations.models import ResumeVacancy
from .serializers import ResumeSerializer


class ResumePagination(filters.PageNumberPagination):
    page_size = 10


class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    pagination_class = ResumePagination
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    # def get_serializer_class(self, *args, **kwargs):
    #     if self.action in ['create', 'update', 'partial_update', 'retrieve']:
    #         return ResumeDetailSerializer
    #     if self.action == 'list':
    #         return ResumeListSerializer
    #     return super().get_serializer_class(*args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        serializer.validated_data['created_by'] = request.user
        serializer.validated_data['is_active'] = False
        serializer.validated_data['is_deleted'] = False 
        new_resume = serializer.save()
        experience = request.data.get('experiences', [])

        for exp in experience:
            ResumeExperience.objects.create(
                resume=new_resume, 
                company_name=exp.get('company_name'),
                title=exp.get('title'),
                start_date=exp.get('start_date'),
                end_date=exp.get('end_date'),
                is_current=exp.get('is_current', False),
                description=exp.get('description', '')
            )
        educations = request.data.get('educations', [])
        for edu in educations:
            ResumeEducation.objects.create(
                resume=new_resume,
                institution_name=edu.get('institution_name'),
                education_type=edu.get('education_type'),
                end_year=edu.get('end_year')
            )
        skills = request.data.get('skills', [])
        languages = request.data.get('languages', [])
        for lang in languages:
            ResumeLanguage.objects.create(
                resume=new_resume,
                language=lang.get('language_name'),
                level=lang.get('level')
            )
        contacts = request.data.get('contacts', [])
        for contact in contacts:
            ResumeContact.objects.create(
                resume=new_resume,
                contact_type=contact.get('contact_type'),
                value=contact.get('contact_value'),
                is_primary=contact.get('is_primary', False)
            )
        employment_type = request.data.get('employment_type', None)
        if employment_type:
            ResumeEmploymentType.objects.create(
                resume=new_resume,
                employment_type=employment_type.get('name')
            )
        schedule_type = request.data.get('schedule_type', None)
        if schedule_type:
            ResumeScheduleType.objects.create(
                resume=new_resume,
                schedule_type=schedule_type.get('name')
            )
        return Response(status=201)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    