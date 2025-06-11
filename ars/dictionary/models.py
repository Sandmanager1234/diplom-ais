from django.db import models


class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

class Grade(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class EmploymentType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class ScheduleType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Experience(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class Language(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class Country(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=255, unique=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='regions')

    def __str__(self):
        return self.name
    

class City(models.Model):
    name = models.CharField(max_length=255, unique=True)
    region = models.ForeignKey(Region, to_field='name', on_delete=models.CASCADE, related_name='cities')

    def __str__(self):
        return self.name
    

class LanguageLevel(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class JobTitle(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class FormatOfWork(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    

class Branch(models.Model):
    name = models.CharField(max_length=255, unique=True)
    address = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='branches')
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name='branches')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='branches')

    def __str__(self):
        return self.name


class ResumeStatus(models.Model):
    code = models.CharField(max_length=64)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name