const io = require('socket.io')(3000, {
    cors: {
        origin: "*"
    }
})

const users = {}

io.on('connection', socket => {
    console.log("new user")
    socket.on('new-user', userName => {
        users[socket.id] = userName
        socket.broadcast.emit('user-connected', userName)
    })

    socket.on('send-chat-message', message => {
        console.log(message)
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })


})

