import requests
import os


files = []


for html in [f'html/{x}' for x in os.listdir('html')]:
    for maybe_file in open(html, 'r').read().split('"'):
        if maybe_file.strip().lower().startswith('images'):
            files.append(maybe_file.strip())


total = len(files)


for j_, i in enumerate(files):
    base_url = 'http://users.atw.hu/wolf3d/' + i
    print(f'Trying {i}... [{j_ + 1}/{total}] ({round(j_ / total * 100)}%)')
    a = requests.get(base_url)
    if a.status_code == 404:
        print('Fail.')
        continue
    open(f'{i}', 'wb').write(a.content)
