// server.js
const { Server } = require('socket.io');
const io = new Server(3000);

console.log('Socket.IO server is running on port 3000...');

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Listen for messages from the client
    socket.on('message', (msg) => {
        console.log(`Received message from client: ${msg}`);

        // Send a response back to the client
        socket.emit('message', `Server received your message: ${msg}`);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
