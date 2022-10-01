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
    print(reviews['restaurant_id'].apply(lambda x: x in ls_ids).count())
    reviews = reviews[reviews['restaurant_id'].apply(lambda x: x in ls_ids)]
    # print(reviews)
    return reviews

def recomm_stores(store_ids):
    s_infos = s[s['restaurant_id'].apply(lambda x : x in store_ids)]
    print(s_infos)
    return s_infos

def local_reviews(x, y): # lat, lng
    # x, y 좌표부분 쿼리문에 추가하기
    # x, y = 37.4097995, 127.128697
    raw_query = f"select * from review where restaurant_id in (SELECT restaurant_id FROM (SELECT ( 6371 * acos( cos( radians( {x} ) ) * cos( radians( lat) ) * cos( radians( lng ) - radians({y}) ) + sin( radians({x}) ) * sin( radians(lat) ) ) ) AS distance, restaurant_id FROM restaurant) DATA WHERE DATA.distance < 100);"
    
    with connection.cursor() as cursor:
        cursor.execute(raw_query)
        row = cursor.fetchall()
    
    local_reviews = pd.DataFrame.from_records(row)
    # 컬럼명 변경
    local_reviews.columns = ["review_id",  # 리뷰 고유번호
    "restaurant_id",  # 음식점 고유번호
    "user_id",  # 유저 고유번호
    "score",  # 평점
    "content",  # 리뷰 내용
    "created_at",  # 리뷰 등록 시간
    'gender', # 유저_성별
    'age']
    return local_reviews
    