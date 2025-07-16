const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const API_URL = 'http://localhost:8000/chat'; // Change if backend is hosted elsewhere

function appendMessage(message, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = message;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator bot';
    typing.id = 'typing-indicator';
    typing.textContent = 'ChatBuddy is typing...';
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

async function sendMessage(message) {
    appendMessage(message, 'user');
    showTypingIndicator();
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_input: message })
        });
        const data = await response.json();
        removeTypingIndicator();
        appendMessage(data.response, 'bot');
    } catch (error) {
        removeTypingIndicator();
        appendMessage('Sorry, there was an error connecting to the server.', 'bot');
    }
}

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message) {
        sendMessage(message);
        userInput.value = '';
        userInput.focus();
    }
});

userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
}); 