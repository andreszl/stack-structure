var SocketIo = require('socket.io')
import UserService from './services/users.service'
var io: any = null


class Apdapter{
    public emit (key, data) {
        io.emit(key, data)
    }
}

export const WebSocket = Apdapter

class Socket {
    private userService : UserService;

    constructor(server: any) {
        this.userService = new UserService();        
        io = SocketIo(server)
        this.initialize()
    }
  
    public initialize(){     
        io.on('connection', (socket) => {
            var addUser = false

            socket.on('test', (msg) => {
                console.log(msg)
                socket.broadcast.emit('test', 'new user connected')
            })
            socket.on('login', (user) => {
                addUser = true;
                socket.user = user;
                console.log(`${socket.user.name} its connecting...`)
                this.userService.changeStatus(socket.user._id, true)
                user.status = true
                socket.broadcast.emit('newUserConnected', user)
                socket.emit('changeMyStatus', user)
            })

            socket.on('createRoom', (user) => {
                socket.join(user._id);
                console.log(`was created a room with the name ${user._id}`)
            })

            socket.on('giveMeYourLocation', (user) => {               
                io.sockets.in(user.room).emit('notifications', `The ${user.role} ${user.name} said:  Give me your location right now!`);
            })

            socket.on('disconnect', () => {
                if(addUser){
                    console.log(`${socket.user.name} its disconnecting...`)
                    socket.leave(socket.user._id);
                    console.log(`was deleted a room with the name ${socket.user._id}`)
                    this.userService.changeStatus(socket.user._id, false)
                    socket.broadcast.emit('userDisconnected', socket.user)                    
                }
            });
        });
    }

    public emit(event: string, data: object) {
      io.emit(event, data)
    }

  }
  
export default Socket