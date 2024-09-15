const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path')
const { Server, io } = require('socket.io');

const app = express();
const server = createServer(app);

const socket = new io("http://localhost:3000");

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


server.listen(8080, () => { //try changing up this line to specify IP for communication
  console.log('server running at http://localhost:8080');
});