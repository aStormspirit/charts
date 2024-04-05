import requests
from datetime import datetime
import json

# Здесь используются примерные имена куков и их значения, полученные из браузера. 
cookies = {
    'sessionid': 'ugm2d1hb7ahjdifccw6uasyrgrdorib2',
    'csrftoken': 'Qmx6IPFKK9mc6LNVF3hNG3cGALrTibpb',
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
    data_str = response.content.decode('utf-8')

    # Преобразуем строку в формат Python
    data = json.loads(data_str)

    # Получаем значение task_id
    task_id = data['task_id']
    response2 = session.get(f'https://kubatura.moizvonki.ru/calls/export_result_download/?task_id={task_id}')

    if response.status_code == 200:
        # Запишите содержимое в файл
        with open(file_name, 'wb') as file:
            file.write(response2.content)
        print(f'Файл "{file_name}" успешно загружен.')
    else:
        print(f'Ошибка при загрузке файла: статус код {response.status_code}')