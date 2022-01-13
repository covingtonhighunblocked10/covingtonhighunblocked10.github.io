import requests
import os


css = open('css/build.css', 'r').read().replace('(', ')').replace('\\', '/').split(')')
files = []


for i_ in css:
    i = i_.lower().strip()
    if i.startswith('../images'):
        files.append(i[3:])


total = len(files)


for j_, i in enumerate(files):
    base_url = 'http://users.atw.hu/wolf3d/' + i
    print(f'Trying {i}... [{j_ + 1}/{total}] ({round(j_ / total * 100)}%)')
    a = requests.get(base_url)
    if a.status_code == 404:
        print('Fail.')
        continue
    open(f'{i}', 'wb').write(a.content)
