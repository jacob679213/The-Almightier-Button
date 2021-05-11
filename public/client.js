var d1
var d2
//const counter
var socket

function onLoad(){
    d1 = document.getElementById('d1')
    d2 = document.getElementById('d2')
    socket = io();
}

onLoad()

function dup(){
    let add = document.createElement("button")
    add.onclick = function(){
        d2.removeChild(this)
        const payload = {
            add: false,
            whichButton: add
        }
        socket.emit('sendUpdate', payload)
    }
    let node = document.createTextNode("Delete")
    add.appendChild(node)
    d2.appendChild(add)

    const payload = {add: true}
    socket.emit('sendUpdate', payload)
}

socket.on('recieveUpdate', (payload) => {

})

/*
//quick check if the key pressed was Space
function check(){
    var x = event.key
    if (x == " "){
        dup()
    }
    else if(x == "c"){
        d2.innerHTML = ""
        count = 0
        counter.innerHTML = (count)
    }
    else if(x == "y"){
        Yeetus()
    }
}

function Yeetus(){
    var r = confirm("Are you sure about that?")
    if (r == true){
        d1.innerHTML = ""
        alert("Yeetus Yeetus, Self Deletus")
    }
    else if (r == false){
        alert("Good Choice")
    }
}
*/