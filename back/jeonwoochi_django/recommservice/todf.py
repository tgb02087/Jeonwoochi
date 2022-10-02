import pandas as pd
from .models import Review, Restaurant
from django.db import connection

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

def recomm_stores(store_ids):
    raw_query = "select * from restaurant where restaurant_id in (select distinct restaurant_id from review );"
    with connection.cursor() as cursor:
        cursor.execute(raw_query)
        row = cursor.fetchall()
    recomm_stores = pd.DataFrame.from_records(row)
    return recomm_stores

def local_reviews(x, y): # lat, lng
    # 기본값 x, y = 37.4097995, 127.128697
    try: 
        raw_query = f"select * from review where restaurant_id in (SELECT restaurant_id FROM (SELECT ( 6371 * acos( cos( radians( {x} ) ) * cos( radians( lat) ) * cos( radians( lng ) - radians({y}) ) + sin( radians({x}) ) * sin( radians(lat) ) ) ) AS distance, restaurant_id FROM restaurant) DATA WHERE DATA.distance < 20) limit 5000;"
    except:
        raw_query = f"select * from review where restaurant_id in (SELECT restaurant_id FROM (SELECT ( 6371 * acos( cos( radians( {x} ) ) * cos( radians( lat) ) * cos( radians( lng ) - radians({y}) ) + sin( radians({x}) ) * sin( radians(lat) ) ) ) AS distance, restaurant_id FROM restaurant) DATA WHERE DATA.distance < 50) limit 5000;"
    
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
    