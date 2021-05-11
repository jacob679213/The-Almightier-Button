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

    socket.on('disconnect', () => {
        console.log(`user disconnected: ${chalk.red(socket.id)}`)
    })

    socket.on('sendUpdate',(payload) => {
        let add = payload.add
        let res = null

        if(add == true){
            buttonCounter++
            console.log(`User ${chalk.blue(socket.id)} clicked the ${chalk.green('Duplicate')} button. there are now ${buttonCounter} buttons` )
            res = {
                add: true
            }
        }
        else{
            buttonCounter--
            console.log(`User ${chalk.blue(socket.id)} clicked the ${chalk.green('Delete')} button. there are now ${buttonCounter} buttons` )
            
        }


        socket.emit('recieveUpdate')
    })
})

//starts app listening on PORT
server.listen(PORT, ()=> console.log('lisening on port: ' + chalk.green(PORT)))