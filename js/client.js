const socket = io('http://localhost:3000'); 

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer= document.querySelector(".container");
var audio = new Audio('ting.mp3');

// Function to append a message to the chat container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); // Combine classes
    messageElement.classList.add(position); 
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
    
};

// Use 'submit' event for the form to send a message
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''; // Clear the input field
});


// Prompt for the user's name
const name = prompt("Enter your name here to join the chat!!!");
socket.emit('new-user-joined', name);

// Handle user joining
socket.on('user-joined', name => {
    append(`${name} : joined the chat`, 'left'); // Align to left
});

// Receive messages from others
socket.on('receive', data => {
    console.log('Received data:', data);  // This will show the message and the sender's name
    append(`${data.user}: ${data.message}`, 'left'); // Align to left
});


socket.on('left', name => {
    // append(`${data.name} left the chat` , 'left'); // Align to left
    append(`${name} left the chat`, 'left'); // Align to left
});


