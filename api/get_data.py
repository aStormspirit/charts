import pandas as pd

# Считываем данные из CSV-файла в DataFrame
csv_file_path = 'downloaded_file.csv'
df = pd.read_csv(csv_file_path, sep=';')
df = df.fillna('')
def data():
    employee_data = {}
    # Итерируемся по уникальным значениям в столбце "Сотрудник"
    for employee in df['Сотрудник'].unique():
        # Фильтруем DataFrame по сотруднику
        employee_df = df[df['Сотрудник'] == employee]
        # Преобразуем данные сотрудника в список значений
        employee_values = employee_df.values.tolist()
        # Добавляем список значений в словарь
        employee_data[employee] = employee_values

    # Выводим полученный словарь
    return(employee_data)