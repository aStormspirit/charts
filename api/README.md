Установка
git clone https://github.com/aStormspirit/chart.git
cd chart
docker build -t <НАЗВАНИЕ> .
docker run -p 8000:8000 <НАЗВАНИЕ>
Приложение будет запущенно на localhost:8000
