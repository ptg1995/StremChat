const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('./node_modules/socket.io/dist/index')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', (path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req,res) =>{
    res.render('index.html');
});

let msgChat = [];

io.on('connection', socket =>{
    console.log(`Socket conectado ${socket.id}`);
    socket.emit('previousMessages', msgChat)
    socket.on('sendMessage', data =>{
        console.log(data);
        msgChat.push(data);
        socket.broadcast.emit('receivedMessage',data)
    })
})

server.listen(3000, ()=> {console.log("Server is running...")});



