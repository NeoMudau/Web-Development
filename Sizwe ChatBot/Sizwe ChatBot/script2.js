document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('chatForm').addEventListener('submit', processUserInput);
});

async function fetchGPTResponse(input) {
    let response = await fetch('http://localhost:3000/get-gpt-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: input })
    });

    if (response.ok) {
        let data = await response.json();
        return data.message; // Adjust based on the structure of your server's response
    } else {
        console.error("Failed to fetch GPT-3 response.");
        return "Sorry, I couldn't process that.";
    }
}

async function processUserInput(event) {
    event.preventDefault();
    
    let userInput = document.getElementById('userInput').value.trim();
    let chatbox = document.getElementById('chatbox');

    // Display user message
    chatbox.innerHTML += '<div class="userMessage">' + userInput + '</div>';

    // Clear the input
    document.getElementById('userInput').value = '';

    // Show typing indicator
    let typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = "block";

    // Fetch GPT-3 response
    let response = await fetchGPTResponse(userInput);
    
    // Hide typing indicator and display GPT-3 response
    typingIndicator.style.display = "none";
    chatbox.innerHTML += '<div class="botMessage">' + response + '</div>';

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}
