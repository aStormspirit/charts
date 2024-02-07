#!/bin/bash

# Остановка uvicorn процесса, если он был запущен
pid=$(pidof /usr/local/bin/python)
if [[ -n $pid ]]; then
    kill $pid
fi
# Здесь можно добавить любые команды, которые необходимы перед запуском uvicorn
# Например, выполнение дополнительных скриптов, настройка переменных окружения и т.д.
/usr/local/bin/python3 /app/download.py

cd /app

# Запуск uvicorn
/usr/local/bin/uvicorn main:app --host 0.0.0.0 --port 8000