# Use the official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Устанавливаем cron
RUN apt-get update && apt-get install -y cron

RUN apt-get install dos2unix

# Установите необходимые пакеты, включая supervisor
RUN apt-get update && apt-get install -y supervisor

# Создайте каталог для хранения файлов конфигурации supervisor
RUN mkdir -p /etc/supervisor/conf.d

# Скопируйте файл конфигурации для supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port that FastApi will be running on
EXPOSE 8000

RUN python3 /app/download.py
# Даем права на выполнение скрипта
RUN chmod +x ./script.sh

RUN dos2unix /app/crontab

RUN dos2unix /etc/supervisor/conf.d/supervisord.conf

RUN crontab /app/crontab
# Устанавливаем входную точку в shell скрипт
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]