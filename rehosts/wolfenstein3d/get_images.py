import requests
import json


sounds_dict = dict(json.loads(open('images.json', 'r').read()))
total = len(sounds_dict)


for j_, i_ in enumerate(sounds_dict):
    i = sounds_dict[i_]
    base_url = 'http://users.atw.hu/wolf3d/' + i
    print(f'Trying {i}... [{j_ + 1}/{total}] ({round(j_ / total * 100)}%)')
    a = requests.get(base_url)
    if a.status_code == 404:
        print('Fail.')
        continue
    open(f'{i}', 'wb').write(a.content)
