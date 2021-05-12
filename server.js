const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server)

const chalk = require('chalk')
const PORT = 8080
let buttonCounter = 0

app.use(express.static('public'))
app.use(express.static('views'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

io.on('connection', (socket) => {
    console.log(`user connected: ${chalk.blue(socket.id)}`)
    
    socket.emit('setup', { count: buttonCounter })

    socket.on('disconnect', () => {
        console.log(`user disconnected: ${chalk.red(socket.id)}`)
    })

    socket.on('sendUpdate',(payload) => {
        let res = null

        if(payload.add == true){
            buttonCounter++
            console.log(`User ${chalk.blue(socket.id)} clicked the ${chalk.green('Duplicate')} button. there are now ${chalk.yellow(buttonCounter)} buttons` )
            res = {
                add: true, 
                count: buttonCounter
            }
        }
        else{
            buttonCounter--
            console.log(`User ${chalk.blue(socket.id)} clicked the ${chalk.red('Delete')} button. there are now ${chalk.yellow(buttonCounter)} buttons` )
            res = {
                add: false,
                count: buttonCounter
            }
        }


        socket.broadcast.emit('recieveUpdate',res)
        socket.broadcast.emit('countUpdate', { count: buttonCounter })
        socket.emit('countUpdate', { count: buttonCounter })
    })
})

//starts app listening on PORT
server.listen(PORT, ()=> console.log('lisening on port: ' + chalk.green(PORT)))