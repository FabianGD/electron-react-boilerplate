import sys
import zmq as zmq
import random
import json

from interpreter import interpreteMessage
from helpers import parse_port, generateData

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

        # Understanding the message
        if b'kill' in message:
            socket.send_string('Killing myself now.')
            context.destroy()
            break
        else:
            reply, order = interpreteMessage(message)

            if reply and order:
                print(reply)
                print(order)

                if 'randomArray' in order.keys():
                    length = order['randomArray']
                    basic_json['data'] = generateData(length=length)

                basic_json['reply'] = reply
                basic_json['order'] = order
                pass
            elif reply and not order:
                basic_json['reply'] = reply
                pass
            else:
                basic_json['error'] = 'ERROR'
                pass

            socket.send_string(json.dumps(basic_json))

        #  Send reply back to client

if __name__ == '__main__':
    try:
        main()
    except:
       pass

