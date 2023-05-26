const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const sendButton = document.getElementById('send-button')
const userName = "sasi"
//  prompt('Enter Your Name')
appendMessage('You Joined')
socket.emit('new-user', userName)

socket.on('chat-message', data => {
    console.log(data)
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', userName => {
    appendMessage(`${userName} joined The room`)
})


socket.on('user-disconnected', userName => {
    appendMessage(`${userName} has Left The room`)
})


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    messageContainer.scrollTop = messageContainer.scrollHeight;
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
    scrollToBottom()
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

function scrollToBottom() {
    setTimeout(() => {
        const lastMessage = messageContainer.lastElementChild;
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
}