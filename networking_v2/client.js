// client.js
const io = require('socket.io-client');
const readline = require('readline');

// Connect to the Socket.IO server
const socket = io('http://localhost:3000');

console.log('Connecting to the server...');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {

    rl.question('Enter a message to send to the server: ', (input) => {
        // Send the input to the server
        socket.emit('message', input);

        // Continue prompting
        promptUser();
    });
}

socket.on('connect', () => {
    console.log(`Connected to server with ID: ${socket.id}`);
    // Start prompting the user
    promptUser();
});

// Listen for messages from the server
socket.on('message', (msg) => {
    // console.log(`Received message from server: ${msg}`);
});

// Handle disconnection
socket.on('disconnect', () => {
    console.log('Disconnected from the server');
    process.exit();
});
