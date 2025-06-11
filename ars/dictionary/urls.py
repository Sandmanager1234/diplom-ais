from django.urls import path
from .views import (
    CityListAPIView,
    GradeListAPIView,
    BranchListAPIView,
    RegionListAPIView,
    CountryListAPIView,
    CurrencyListAPIView,
    JobTitleListAPIView,
    LanguageListAPIView,
    ExperienceListAPIView,
    ScheduleTypeListAPIView,
    FormatOfWorkListAPIView,
    ResumeStatusListAPIView,
    LanguageLevelListAPIView,
    EmploymentTypeListAPIView
)

app_name = 'dictionary'

urlpatterns = [
    path('v1/cities', CityListAPIView.as_view(), name='cities'),
    path('v1/grades', GradeListAPIView.as_view(), name='grades'),
    path('v1/branches', BranchListAPIView.as_view(), name='branches'),
    path('v1/regions', RegionListAPIView.as_view(), name='regions'),
    path('v1/countries', CountryListAPIView.as_view(), name='countries'),
    path('v1/currencies', CurrencyListAPIView.as_view(), name='currencies'),
    path('v1/jobtitles', JobTitleListAPIView.as_view(), name='jobtitles'),
    path('v1/languages', LanguageListAPIView.as_view(), name='languages'),
    path('v1/experiences', ExperienceListAPIView.as_view(), name='experiences'),
    path('v1/scheduletypes', ScheduleTypeListAPIView.as_view(), name='scheduletypes'),
    path('v1/workformats', FormatOfWorkListAPIView.as_view(), name='workformats'),
    path('v1/resumesatuses', ResumeStatusListAPIView.as_view(), name='resumesatuses'),
    path('v1/languagelevels', LanguageLevelListAPIView.as_view(), name='languagelevels'),
    path('v1/employmenttypes', EmploymentTypeListAPIView.as_view(), name='employmenttypes')
]
