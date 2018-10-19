import sys
import zmq as zmq
import random
import json

def parse_port():
    port = 4242
    try:
        print(sys.argv[2])
        port = int(sys.argv[2])
    except:
        pass
    return port

def generateData(Recharts=False):

    randArrayX = sorted(random.sample(range(1000), k=10))
    randArrayY = sorted(random.sample(range(1300), k=10))

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

def main(close_only=False):
    print('Python backend actived!')
    port = str(parse_port())
    id = random.randint(1,100000)
    print('Second message from Python server with ID {id}!'.format(id=id))
    context = zmq.Context()
    socket = context.socket(zmq.REP)

    try:
        socket.bind("tcp://*:{}".format(port))
        print('Socket could be bount')
    except zmq.error.ZMQError:
        context.destroy()
        print('Socket closed...')

        if close_only:
            print('>> Trying to reopen <<')
            context = zmq.Context()
            socket = context.socket(zmq.REP)
        # socket = context.socket(zmq.REP)
            socket.bind("tcp://*:{}".format(port))
            print('... and reopened')

        else:
            sys.exit()

    print('Server was successfully spawned')

    while True:
        #  Wait for next request from client
        message = socket.recv()

        basic_json = {'id': id}

        print('Received request: {}'.format(message))

        if b'Hello' in message:
            socket.send_string('World '+str(id))

        elif b'array' in message:
            basic_json['data'] = generateData()
            socket.send_string(json.dumps(basic_json))

        elif b'kill' in message:
            socket.send_string('Killing myself now.')
            context.destroy()
            break

        else:
            socket.send(message)
        #  Send reply back to client

if __name__ == '__main__':
    try:
        main()
    except: #  zmq.error.ZMQError:
    #     main(close_only=True)
       pass

