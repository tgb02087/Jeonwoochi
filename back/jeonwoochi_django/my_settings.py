# my_settings.py
# 깃허브에 올릴때, 배포시에 빼줘야함.
# .gitignoire에 추가해야함

'''
- MySQL ( version : 8.0.22 )
    - User DB → 
    - Interest DB →  
    - Festival DB →  
    - Game DB →  
    
- Redis ( version : 7.0.4 ) →  
'''
# MYSQL port
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',                      
        'PASSWORD': '',               
        'HOST': '',                  
        'PORT': '',
    },
}
SECRET_KEY =''
