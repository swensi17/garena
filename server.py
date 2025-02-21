import subprocess
import os
import webbrowser
import time

def main():
    # Устанавливаем зависимости Next.js если они еще не установлены
    if not os.path.exists('node_modules'):
        print('Устанавливаем зависимости...')
        subprocess.run('npm install', shell=True)

    print('Запускаем Next.js на порту 8000...')
    
    # Изменяем порт Next.js на 8000 через переменную окружения
    env = os.environ.copy()
    env['PORT'] = '8000'
    
    # Даем время на инициализацию
    time.sleep(2)
    
    # Открываем браузер
    webbrowser.open('http://localhost:8000')
    
    # Запускаем Next.js
    try:
        subprocess.run('npm run dev', shell=True, env=env)
    except KeyboardInterrupt:
        print('\nСервер остановлен')

if __name__ == '__main__':
    main() 