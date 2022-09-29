import pandas as pd
from .models import Review, Restaurant

s = Restaurant.objects.values()
s = pd.DataFrame.from_records(s)

def review(region):
    reviews = Review.objects.values()
    reviews = pd.DataFrame.from_records(reviews)
    ls_ids = s[s['address'].str.startswith(region, na=False)]['restaurant_id'].to_list()
    reviews = reviews[reviews['store'].apply(lambda x: x in ls_ids)]
    # print(reviews)
    return reviews

def recomm_stores(store_ids):
    s_infos = s[s['restaurant_id'].apply(lambda x : x in store_ids)]
    print(s_infos)
    return s_infos
    