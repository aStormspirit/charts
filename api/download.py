import requests
from datetime import datetime

# Здесь используются примерные имена куков и их значения, полученные из браузера. 
cookies = {
    'sessionid': 'ybwikj7fkx4kdcdmjk50cxlwqdq7vq13',
    'csrftoken': 'pCaQCkrR0JJmZcIbyOSiazOFs4YmklYr',
}

# Эти заголовки могут потребоваться, если сервер проверяет наличие определенных заголовков.
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    # Другие заголовки при необходимости
}
 
current_date = datetime.now().strftime("%d.%m.%Y")

url = f'https://kubatura.moizvonki.ru/calls/list/?status=0&direction=0&order_by=start_time&order_type=desc&date_from={current_date}&phone=&contact=&export=csv&date_to={current_date}&duration=60'
file_name = 'downloaded_file.csv'

with requests.Session() as session:
    session.cookies.update(cookies)
    session.headers.update(headers)
    
    response = session.get(url)

    if response.status_code == 200:
        # Запишите содержимое в файл
        with open(file_name, 'wb') as file:
            file.write(response.content)
        print(f'Файл "{file_name}" успешно загружен.')
    else:
        print(f'Ошибка при загрузке файла: статус код {response.status_code}')