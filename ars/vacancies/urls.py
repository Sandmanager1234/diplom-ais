from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import VacancyViewSet


app_name = 'vacancies'
router = DefaultRouter()
router.register(r'v1/vacancies', VacancyViewSet, basename='vacancy')

urlpatterns = [
    path('', include(router.urls))
]



