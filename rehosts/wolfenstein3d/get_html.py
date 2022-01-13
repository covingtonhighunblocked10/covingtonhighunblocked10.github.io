import sys
import requests


for n in sys.argv[1:]:
    c = requests.get(f'http://users.atw.hu/wolf3d/html/{n}').content
    open(f'html\\{n}', 'wb').write(c)
