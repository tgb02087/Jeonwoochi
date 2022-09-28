from .todf import review, recomm_stores

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

def user_based_cf(USER_ID):
    # 일단 디폴트값으로 제주 지정
    r = review('서울')
    df_rating = r
    print(len(df_rating))
    if len(df_rating) == 0:
        raise ParseError(detail='평점을 입력해주세요')
    
    ratings_matrix = df_rating.pivot(index='user_id', columns='store', values='score')
    matrix_dummy = ratings_matrix.copy().fillna(0)
    user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
    
    # 특정 값 조회를 위해 인덱스, 컬럼명 지정
    user_similarity = pd.DataFrame(user_similarity,
                            index=ratings_matrix.index,
                            columns=ratings_matrix.index)

    u_id = user_similarity[USER_ID].sort_values(ascending=False)[1:10].apply(lambda x:x > 0.1)
    print(u_id)
    u_id = u_id.index[u_id == True].tolist()
    
    store_ids = []
    for u in u_id:
        s_id = ratings_matrix.loc[u].sort_values(ascending=False).apply(lambda x:x > 3.0)
        s_id = s_id.index[s_id == True].tolist()
        store_ids.extend(s_id)
    return recomm_stores(store_ids).to_dict()

