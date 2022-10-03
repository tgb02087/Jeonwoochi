from django.db import models


class Category(models.Model):
    category_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category'


class Restaurant(models.Model):
    restaurant_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    branch = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    tel = models.CharField(max_length=255, blank=True, null=True)
    categories = models.CharField(max_length=2000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'restaurant'


class Review(models.Model):
    review_id = models.BigAutoField(primary_key=True)
    restaurant_id = models.BigIntegerField(blank=True, null=True)
    user_id = models.BigIntegerField(blank=True, null=True)
    score = models.BigIntegerField()
    content = models.CharField(max_length=2000, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    gender = models.TextField(blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'


class StatusType(models.Model):
    state_type_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'status_type'


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=255, blank=True, null=True)
    google_id = models.CharField(max_length=255, blank=True, null=True)
    is_dummy = models.TextField(blank=True, null=True)  # This field type is a guess.
    kakao_id = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    state_type = models.ForeignKey(StatusType, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
