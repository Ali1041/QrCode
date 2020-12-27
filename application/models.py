from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.

class MyManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Enter a email')

        my_user = self.model(email=self.normalize_email(email), **extra_fields)
        print(password)
        my_user.set_password(password)
        my_user.save()
        my_user.check_password(password)
        return my_user

    def create_superuser(self, email, password):
        my_user = self.create_user(email, password)
        # my_user.set_password(password)
        my_user.is_staff = True
        my_user.is_superuser = True
        my_user.save(using=self._db)
        return my_user


class MyUser(AbstractBaseUser):
    email = models.EmailField(max_length=128, unique=True)
    username = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = MyManager()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, label):
        return True

    def __str__(self):
        return self.email


class Course(models.Model):
    name = models.CharField(max_length=100)
    credit_hour = models.IntegerField()
    teacher = models.OneToOneField(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} of {self.teacher.username}'


class CourseAttendance(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    mark = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.course.name} {self.student.username} attendance is {self.mark}'
