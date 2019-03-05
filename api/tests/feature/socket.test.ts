import * as http from 'http';
import ioBack from 'socket.io';
import ioClient from 'socket.io-client';

let socket_client ;
let httpServer;
let httpServerAddr;
let socket_server;

beforeAll((done) => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.address();
  socket_server = ioBack(httpServer);
  done();
});

afterAll((done) => {
  socket_server.close();
  httpServer.close();
  done();
});

beforeEach((done) => {

  socket_client = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket'],
    });

    socket_client.on('connect', () => {
        console.log('connecting client...', socket_client.id)
        done();
    });    
  });
    
  
  afterEach((done) => {
   
    if (socket_client.connected) {
        console.log('disconnecting client...', socket_client.id)
        socket_client.disconnect();
    }
    done();
  });
  
  describe('basic socket.io example', () => {
    test('should communicate', (done) => {
     
      socket_server.emit('test', 'Hello');
      socket_client.once('test', (message) => {
        console.log(message)
        expect(message).toBe('Hello');
        done();
      });

      socket_server.on('connection', (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });
  });