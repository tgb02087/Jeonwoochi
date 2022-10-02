FROM python:3.9.13
WORKDIR /var/jenkins_home/workspace/Backend/jeonwoochi_django
COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
CMD ["python3", "manage.py", "runserver", "--noreload"]
