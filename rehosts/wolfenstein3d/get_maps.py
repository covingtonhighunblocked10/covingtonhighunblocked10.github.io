import requests


running = True


i = 1
while running:
    j = 1
    while running:
        url = f'http://users.atw.hu/wolf3d/maps/e{i}m{j}.js'
        resp = requests.get(url)
        if resp.status_code == 404:
            if j == 1:
                running = False
            break
        open(f'maps/e{i}m{j}.js', 'wb').write(resp.content)
        print(f'Downloaded map_e{i}m{j}')
        j += 1
    i += 1


open('maps/e7m21.js', 'wb').write(
    requests.get('http://users.atw.hu/wolf3d/maps/e7m21.js').content
)
