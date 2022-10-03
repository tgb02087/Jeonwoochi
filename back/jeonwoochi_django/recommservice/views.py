import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.http import HttpResponse
from django.core import serializers
from .algorithm import user_based_cf
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# from elasticsearch import Elasticsearch
import pandas as pd
import numpy as np
import jwt

# Create your views here.
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
@authentication_classes((JSONWebTokenAuthentication,))
def get_snbr(request, user_id):
    token = request.META.get('HTTP_AUTHORIZATION').lstrip('jwt ')
    user_id = jwt.decode(token, 'secretKey', algorithms=['HS256'])['user_id']
    return JsonResponse(user_based_cf(user_id), status=status.HTTP_200_OK, safe=False)