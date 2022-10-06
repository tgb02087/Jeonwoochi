# from faker import Faker
import random
import pandas as pd
from .todf import get_local_restaurant


def dumdum(x, y):
    repeat_count = 300

    user_id = [random.randint(950400, 950537) for i in range(repeat_count)]
    score = [random.randint(2, 6) for i in range(repeat_count)]
    restaurant_id = [random.choice[get_local_restaurant(36.33502387, 127.4374054).to_list()]]

    print('===================== \n', restaurant_id)

    from sqlalchemy import create_engine
    import pymysql
    pymysql.install_as_MySQLdb()

    engine = create_engine("mysql+mysqldb://b305:B305user!@j7b305.p.ssafy.io/jeonwoochi", encoding='utf-8')
    conn = engine.connect()
    # only_unique.to_sql(name='category', con=conn, if_exists='append', index=False)
    # r.to_sql(name='review', con=conn, if_exists='append', index=False)
    # u.to_sql(name='user', con=conn, if_exists='append', index=False for i in range(repeat_count))
    return restaurant_id.to_dict()