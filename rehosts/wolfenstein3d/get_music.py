import requests
import json


sounds_dict = dict(json.loads(open('music.json', 'r').read()))
total = len(sounds_dict)


for j_, i_ in enumerate(sounds_dict):
    i = sounds_dict[i_]
    base_url = 'http://users.atw.hu/wolf3d/' + i
    print(f'Trying {i}... [{j_ + 1}/{total}] ({round(j_ / total * 100)}%)')
    ext = 'mp4'
    a = requests.get(base_url + '.mp4')
    if a.status_code == 404:
        ext = 'ogg'
        a = requests.get(base_url + '.ogg')
        if a.status_code == 404:
            print('Fail.')
            continue
    open(f'{i}.{ext}', 'wb').write(a.content)
