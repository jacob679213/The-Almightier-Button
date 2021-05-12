var d1
var d2
var buttonCounter
var socket

function load(){
    d1 = document.getElementById('d1')
    d2 = document.getElementById('d2')
    buttonCounter = document.getElementById('counter')
    socket = io()
}

load()

socket.on('setup', (res) => {
    for(var i = 0; i < res.count; i++){
        dup(true)
    }
    buttonCounter.innerHTML = res.count
})

function dup(serverTest){
    let addButton = document.createElement("button")
    addButton.onclick = function(){
        d2.removeChild(this)
        const payload = {
            add: false
        }
        socket.emit('sendUpdate', payload)
    }
    let node = document.createTextNode("Delete")
    addButton.appendChild(node)
    d2.appendChild(addButton)

    if(serverTest == false){
        const payload = {add: true}
        socket.emit('sendUpdate', payload)
    }
}

socket.on('recieveUpdate', (payload) => {
    if(payload.add == true){
        dup(true)
    }
    else{
        d2.removeChild(d2.lastChild)
    }
})

socket.on('countUpdate', (buttonCount) => {
    buttonCounter.innerHTML = buttonCount.count
})