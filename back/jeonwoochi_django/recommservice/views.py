from django.shortcuts import render
import json
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from elasticsearch import Elasticsearch
import pandas as pd
import numpy as np
from .algorithm import user_based_cf
from django.http import JsonResponse
import time

# Create your views here.
@api_view(['GET'])
def get_snbr(request, user_id):
    return JsonResponse(user_based_cf(user_id), status=status.HTTP_200_OK, safe=False)