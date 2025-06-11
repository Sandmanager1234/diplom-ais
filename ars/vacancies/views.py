from django.db.models import Count
from rest_framework.response import Response
from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

from .models import Vacancy
from .serializers import VacancySerializer, VacancyDetailSerializer


class VacancyPagination(PageNumberPagination):
    page_size = 20


class VacancyViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all().annotate(candidate_count=Count('resumes')).prefetch_related(
        'resumes__resume'
    )

    serializer_class = VacancySerializer
    pagination_class = VacancyPagination
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = [
        'employment_type', 
        'schedule_type', 
        'format_of_work', 
        'experience', 
        'is_need_higher_education',
        'grade',
        'job_title',
        'branch'
        ]
    search_fields = ['title', 'description'] 

    def get_serializer_class(self):
        if self.action in ['list']:
            return VacancySerializer
        elif self.action in ['create', 'update', 'partial_update', 'retrieve']:
            return VacancyDetailSerializer
        return super().get_serializer_class()
    
    def destroy(self, request, *args, **kwargs):
        vacancy = self.get_object()
        vacancy.is_deleted = True
        vacancy.deleted_at = timezone.now()
        vacancy.save()  
        return Response(status=204)
