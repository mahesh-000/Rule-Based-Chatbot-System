import './style.css'
import { ChatEngine } from './src/engine.js'
import rulesData from './data/rules.json'

// Initialize Engine
const engine = new ChatEngine(rulesData);

// DOM Elements
const chatContainer = document.querySelector('#chat-container');
const userInput = document.querySelector('#user-input');
const sendBtn = document.querySelector('#send-btn');
const clearBtn = document.querySelector('#clear-btn');

/**
 * Appends a message to the chat container
 * @param {string} text 
 * @param {string} sender 'user' | 'bot'
 */
function appendMessage(text, sender) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <span class="timestamp">${timestamp}</span>
    `;

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * Simulates bot typing and generates response
 */
async function handleUserInput() {
    const text = userInput.value.trim();
    if (!text) return;

    // Clear input
    userInput.value = '';

    // Add user message
    appendMessage(text, 'user');

    // Simple delay for "realism"
    const delay = Math.random() * 500 + 500; // 500-1000ms

    setTimeout(() => {
        const response = engine.getResponse(text);
        appendMessage(response, 'bot');
    }, delay);
}

// Event Listeners
sendBtn.addEventListener('click', handleUserInput);

clearBtn.addEventListener('click', () => {
    chatContainer.innerHTML = '';
    appendMessage("Chat cleared. How can I help you now?", 'bot');
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Initial Welcome Message
window.addEventListener('load', () => {
    setTimeout(() => {
        appendMessage("Welcome! I am CoreChat, your enhanced rule-based assistant. I can help with motivation, share some positivity, or answer questions. How are you feeling today?", 'bot');
    }, 500);
});
