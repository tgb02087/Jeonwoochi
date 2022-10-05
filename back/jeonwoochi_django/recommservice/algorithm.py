from .todf import review, recomm_stores, local_reviews

import numpy as np
import pandas as pd 

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.utils import shuffle

import tensorflow as tf
from tensorflow import keras
# from tensorflow.keras.models import Model
# from tensorflow.keras.layers import Input, Embedding, Flatten
# from tensorflow.keras.layers import Dense, Concatenate, Activation
# from tensorflow.keras.regularizers import l2
# from tensorflow.keras.optimizers import SGD
from rest_framework.exceptions import ParseError

def user_based_cf(user_id, x, y):
    # 기본값 x, y = 37.4097995, 127.128697
    r = local_reviews(x, y)
    df_rating = r
    
    if len(df_rating) == 0:
        raise ParseError(detail='리뷰 쓰실래요? ㅎㅅㅎ')
    
    ratings_matrix = df_rating.pivot(index='user_id', columns='restaurant_id', values='score')

    # user 평가 경향성 고려
    rating_mean = ratings_matrix.mean(axis=1)
    rating_bias = (ratings_matrix.T - rating_mean).T
    rating_binary_1 = np.array(ratings_matrix>0).astype(float)
    rating_binary_2 = rating_binary_1.T

    counts = np.dot(rating_binary_1, rating_binary_2)
    counts = pd.DataFrame(counts, 
                        index=ratings_matrix.index,
                        columns=ratings_matrix.index).fillna(0)

    cs_matrix = counts[user_id].sort_values(ascending=False)[1:10].apply(lambda x:x > 0.1)
    cs_matrix = cs_matrix.index[cs_matrix == True].tolist()
    
    store_ids = []
    for u in cs_matrix:
        recommendation = ratings_matrix.loc[u].sort_values(ascending=False).apply(lambda x:x > 3.0)
        recommendation = recommendation.index[recommendation == True].tolist()
        store_ids.extend(recommendation)
    # print(store_ids)
    return recomm_stores(store_ids).to_dict('records')

