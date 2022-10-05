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
@api_view(['GET', 'POST'])
# @permission_classes((IsAuthenticated, ))
# @authentication_classes((JSONWebTokenAuthentication,))
def get_snbr(request, user_id):
    # token = request.META.get('HTTP_AUTHORIZATION').lstrip('Bearer ')
    # user_id = jwt.decode(token, 'secretKey', algorithms=['HS256'])['user_id']
    if request.method == 'POST':
        data=json.loads(request.body)
        x = float(data.get('lat' , None))
        y = float(data.get('lng' , None))
        
    return JsonResponse(user_based_cf(user_id, x, y), status=status.HTTP_200_OK, safe=False)