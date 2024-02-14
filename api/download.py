import requests
from datetime import datetime

# Здесь используются примерные имена куков и их значения, полученные из браузера. 
cookies = {
    'sessionid': 'qsvv7boxeg90igzp8v0yeleshv34qscg',
    'csrftoken': 'LO1r3aC6d7Qt6PhdiRvycpp2NahKV79r',
}

# Эти заголовки могут потребоваться, если сервер проверяет наличие определенных заголовков.
headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
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