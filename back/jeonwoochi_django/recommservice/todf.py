import pandas as pd
import numpy as np
from .models import Review, Restaurant
from django.db import connection
import time
from rest_framework.exceptions import ParseError

s = Restaurant.objects.values()
s = pd.DataFrame.from_records(s)

r = Review.objects.values()
r = pd.DataFrame.from_records(r)

def review(region):
    reviews = Review.objects.values()
    reviews = pd.DataFrame.from_records(reviews)
    ls_ids = s[s['address'].str.startswith(region, na=False)]['restaurant_id'].to_list()
    reviews = reviews[reviews['restaurant_id'].apply(lambda x: x in ls_ids)]
    return reviews

def recomm_stores(store):
    store = store[0:25]
    recomm_stores = s[s['restaurant_id'].apply(lambda x : x in store)]
    recomm_stores.drop_duplicates(['restaurant_id'])
    return recomm_stores

def local_reviews(x, y): # lat, lng    
    try: 
        raw_query = f"select * from review where restaurant_id in (SELECT restaurant_id FROM (SELECT ( 6371 * acos( cos( radians( {x} ) ) * cos( radians( lat) ) * cos( radians( lng ) - radians({y}) ) + sin( radians({x}) ) * sin( radians(lat) ) ) ) AS distance, restaurant_id FROM restaurant) DATA WHERE DATA.distance < 15) limit 5000;"
    except:
        try:
            raw_query = f"select * from review where restaurant_id in (SELECT restaurant_id FROM (SELECT ( 6371 * acos( cos( radians( {x} ) ) * cos( radians( lat) ) * cos( radians( lng ) - radians({y}) ) + sin( radians({x}) ) * sin( radians(lat) ) ) ) AS distance, restaurant_id FROM restaurant) DATA WHERE DATA.distance < 50) limit 5000;"
        except:

            local_reviews = pd.DataFrame()
            return local_reviews
        
        
    with connection.cursor() as cursor:
        cursor.execute(raw_query)
        row = cursor.fetchall()
    
    local_reviews = pd.DataFrame.from_records(row)
    # 컬럼명 변경
    local_reviews.columns = ["review_id",  # 리뷰 고유번호
    "created_at",  # 리뷰 등록 시간
    'age',
    "content",  # 리뷰 내용
    'gender', # 유저_성별
    "restaurant_id",  # 음식점 고유번호
    "score",  # 평점
    "user_id"]
    return local_reviews
    
def get_local_restaurant(x, y):
    raw_query = f"select distinct * from restaurant where restaurant_id in (SELECT restaurant_id FROM (SELECT ( 6371 * acos( cos( radians( {x} ) ) * cos( radians( lat) ) * cos( radians( lng ) - radians({y}) ) + sin( radians({x}) ) * sin( radians(lat) ) ) ) AS distance, restaurant_id FROM restaurant) DATA WHERE DATA.distance < 5 order by distance) limit 20;"
    with connection.cursor() as cursor:
        cursor.execute(raw_query)
        row = cursor.fetchall()
    
    local_restaurant = pd.DataFrame.from_records(row)
    # 컬럼명 변경
    local_restaurant.columns = ["restaurant_id",  # 음식점 고유번호
    "name",  # 음식점 이름
    "branch",  # 음식점 지점 여부
    "tel",  # 음식점 번호
    "address",  # 음식점 주소
    "lat",  # 음식점 위도
    "lng",  # 음식점 경도
    "category",  # 음식점 카테고리
    ]
    
    return local_restaurant

# def get_local_restaurant(x, y):
#     raw_query = f"select distinct * from restaurant where restaurant_id in (SELECT restaurant_id FROM (SELECT ( 6371 * acos( cos( radians( {x} ) ) * cos( radians( lat) ) * cos( radians( lng ) - radians({y}) ) + sin( radians({x}) ) * sin( radians(lat) ) ) ) AS distance, restaurant_id FROM restaurant) DATA WHERE DATA.distance < 5) limit 5000;"
#     with connection.cursor() as cursor:
#         cursor.execute(raw_query)
#         row = cursor.fetchall()
    
#     local_restaurant = pd.DataFrame.from_records(row)
#     # 컬럼명 변경
#     local_restaurant.columns = ["restaurant_id",  # 음식점 고유번호
#     "name",  # 음식점 이름
#     "branch",  # 음식점 지점 여부
#     "tel",  # 음식점 번호
#     "address",  # 음식점 주소
#     "lat",  # 음식점 위도
#     "lng",  # 음식점 경도
#     "category",  # 음식점 카테고리
#     ]
    
#     local_restaurant.drop_duplicates(['name'], inplace=True)
    
#     local_restaurant.to_csv("local_res.csv")
    
#     return local_restaurant
