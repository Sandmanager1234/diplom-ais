from rest_framework.generics import ListAPIView
from rest_framework import permissions

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

from .serializers import (
    ScheduleTypeSerializer,
    ResumeStatusSerializer,
    RegionSerializer,
    CountrySerializer,
    CitySerializer,
    CurrencySerializer,
    BranchSerializer,
    FormatOfWorkSerializer,
    JobTitleSerializer,
    LanguageLevelSerializer,
    LanguageSerializer,
    ExperienceSerializer,
    EmploymentTypeSerializer,
    GradeSerializer
)


class ScheduleTypeListAPIView(ListAPIView):
    queryset = ScheduleType.objects.all()
    serializer_class=ScheduleTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class ResumeStatusListAPIView(ListAPIView):
    queryset = ResumeStatus.objects.all()
    serializer_class=ResumeStatusSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegionListAPIView(ListAPIView):
    queryset = Region.objects.all()
    serializer_class=RegionSerializer
    permission_classes = [permissions.IsAuthenticated]


class CountryListAPIView(ListAPIView):
    queryset = Country.objects.all()
    serializer_class=CountrySerializer
    permission_classes = [permissions.IsAuthenticated]


class CityListAPIView(ListAPIView):
    queryset = City.objects.all()
    serializer_class=CitySerializer
    permission_classes = [permissions.IsAuthenticated]


class CurrencyListAPIView(ListAPIView):
    queryset = Currency.objects.all()
    serializer_class=CurrencySerializer
    permission_classes = [permissions.IsAuthenticated]


class BranchListAPIView(ListAPIView):
    queryset = Branch.objects.all()
    serializer_class=BranchSerializer
    permission_classes = [permissions.IsAuthenticated]


class FormatOfWorkListAPIView(ListAPIView):
    queryset = FormatOfWork.objects.all()
    serializer_class=FormatOfWorkSerializer
    permission_classes = [permissions.IsAuthenticated]


class JobTitleListAPIView(ListAPIView):
    queryset = JobTitle.objects.all()
    serializer_class=JobTitleSerializer
    permission_classes = [permissions.IsAuthenticated]


class LanguageLevelListAPIView(ListAPIView):
    queryset = LanguageLevel.objects.all()
    serializer_class=LanguageLevelSerializer
    permission_classes = [permissions.IsAuthenticated]


class LanguageListAPIView(ListAPIView):
    queryset = Language.objects.all()
    serializer_class=LanguageSerializer
    permission_classes = [permissions.IsAuthenticated]


class ExperienceListAPIView(ListAPIView):
    queryset = Experience.objects.all()
    serializer_class=ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]


class EmploymentTypeListAPIView(ListAPIView):
    queryset = EmploymentType.objects.all()
    serializer_class=EmploymentTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class GradeListAPIView(ListAPIView):
    queryset = Grade.objects.all()
    serializer_class=GradeSerializer
    permission_classes = [permissions.IsAuthenticated]

