from django.contrib.auth.models import AbstractUser


class Recruiter(AbstractUser):

    @property
    def is_authentificated(self):
        return True
    

