const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

class GameServer {
    constructor() {
        this.app = express();
        this.server = createServer(app);
        this.io = new Server(server);

        app.get('/', (req, res) => {
            res.sendFile(join(__dirname, 'index.html'));
          });
          
          io.on('connection', (socket) => {
              console.log('a user connected');
              socket.on('disconnect', () => {
                console.log('user disconnected');
              });
          
              socket.on('chat message', (msg) => {
                  io.emit('chat message', msg);
              });
          });
          
          server.listen(3000, () => { //try changing up this line to specify IP for communication
            console.log('server running at http://localhost:3000');
          });
    }
}