# helpers.py
import random

def parse_port():
    port = 4242
    try:
        print(sys.argv[2])
        port = int(sys.argv[2])
    except:
        pass
    return port

def generateData(length, Recharts=False):

    randArrayX = sorted(random.sample(range(1000), k=length))
    randArrayY = sorted(random.sample(range(1300), k=length))

    if Recharts:
        data = []
        for x, y in zip(randArrayX, randArrayY):
            item = {}
            item['x'] = x
            item['y'] = y
            dataList.append(item)
    else:
        data = {'xdata': randArrayX, 'ydata':randArrayY}

    return data
