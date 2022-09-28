# my_settings.py
# 깃허브에 올릴때, 배포시에 빼줘야함.
# .gitignoire에 추가해야함

'''
- MySQL ( version : 8.0.22 )
    - User DB → j7b305.p.ssafy.io:3306
    - Interest DB →  j7b305.p.ssafy.io:3307
    - Festival DB →  j7b305.p.ssafy.io:3308
    - Game DB →  j7b305.p.ssafy.io:3309
    
- Redis ( version : 7.0.4 ) →  j7b305.hopto.org:6379
'''
# MYSQL port
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'jeonwoochi',
        'USER': 'b305',                      
        'PASSWORD': 'B305user!',               
        'HOST': 'j7b305.p.ssafy.io',                  
        'PORT': '3306',
    },
}
SECRET_KEY ='django-insecure-$$iqkz%r@wb*f#12r(1%%l@@)-j4jqwd32cl=r#7$^6bu0^zo@'