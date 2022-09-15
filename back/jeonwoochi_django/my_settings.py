# my_settings.py
# 깃허브에 올릴때, 배포시에 빼줘야함.
# .gitignoire에 추가해야함

'''
- MySQL ( version : 8.0.22 )
    - User DB → j7b305.p.ssafy.io:3306
    - Interest DB →  j7b305.p.ssafy.io:3307
    - Festival DB →  j7b305.p.ssafy.io:3308
    - Game DB →  j7b305.p.ssafy.io:3309
'''
# MYSQL port
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'user',
        'USER': 'b305',                      
        'PASSWORD': 'B305user!',               
        'HOST': 'j7b305.p.ssafy.io',                  
        'PORT': '3306',
    },
    'interest': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'interest',
        'USER': 'b305',                      
        'PASSWORD': 'B305user!',               
        'HOST': 'j7b305.p.ssafy.io',                  
        'PORT': '3307',
    },
    'festival': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'festival',
        'USER': 'b305',                      
        'PASSWORD': 'B305user!',               
        'HOST': 'j7b305.p.ssafy.io',                  
        'PORT': '3308',
    },
    
}
SECRET_KEY ='django-insecure-$$iqkz%r@wb*f#12r(1%%l@@)-j4jqwd32cl=r#7$^6bu0^zo@'