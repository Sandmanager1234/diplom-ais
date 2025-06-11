from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('vacancies/api/', include('vacancies.urls')),
    path('resumes/api/', include('resumes.urls')),
    path('customers/api/', include('customers.urls')),
    path('dictionary/api/', include('dictionary.urls')),
    path('users/api/', include('users.urls')),
    path('meetings/api/', include('meetings.urls'))
]
