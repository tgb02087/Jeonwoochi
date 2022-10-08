FROM python:3.9.13
WORKDIR /var/jenkins_home/workspace/Backend/jeonwoochi_django
COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8989
CMD ["python", "manage.py", "runserver", "--noreload", "0.0.0.0:8989"]
