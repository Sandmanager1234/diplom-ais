from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .models import FavoriteResume, ResumeVacancy, FavoriteVacancy
from .serializers import (
    FavoriteResumeSerializer,
    ResumeVacancySerializer,
    FavoriteVacancySerializer
)


class ResumeVacancyCreateView(CreateAPIView, DestroyAPIView):
    serializer_class = ResumeVacancySerializer
    permission_classes = [IsAuthenticated]


class FavoriteResumeCreateView(CreateAPIView, DestroyAPIView):
    serializer_class = FavoriteResumeSerializer
    permission_classes = [IsAuthenticated]


class FavoriteVacancyCreateView(CreateAPIView, DestroyAPIView):
    serializer_class = FavoriteVacancySerializer
    permission_classes = [IsAuthenticated]


