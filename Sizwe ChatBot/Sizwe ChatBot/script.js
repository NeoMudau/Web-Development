window.onload = function() {
    // First confirmation alert after 5 seconds
    setTimeout(function() {
        const userConfirmed1 = window.confirm("Have you taken youe Medication?");
        if (userConfirmed1) {
            // User clicked "OK" on the first alert
            console.log("User confirmed the first question");
        } else {
            // User clicked "Cancel" on the first alert
            console.log("User declined the first question");
        }
    }, 15000);  // 5 seconds delay

    // Second confirmation alert after 10 seconds
    setTimeout(function() {
        const userConfirmed2 = window.confirm("Do not forget your Appointment tomorrow morning!");
        if (userConfirmed2) {
            // User clicked "OK" on the second alert
            console.log("User confirmed the second question");
        } else {
            // User clicked "Cancel" on the second alert
            console.log("User declined the second question");
        }
    }, 70000);  // 10 seconds delay
	
	
	// Second confirmation alert after 10 seconds
    setTimeout(function() {
        const userConfirmed2 = window.alert("You have a Theraphy Session on friday morning!");
        if (userConfirmed2) {
            // User clicked "OK" on the second alert
            console.log("User saw the second question");
        } else {
            // User clicked "Cancel" on the second alert
            console.log("User ignored the second question");
        }
    }, 140000);  // 10 seconds delay
}


// Language and responses database
let languages = {
    english: {
        greeting: ["hello", "hi", "hey", "howzit", "exe", "sure", "hola"],
        query: ["how are you", "what's up"],
        illness: ["sadness", "headache", "dizzy", "fatigue", ""],
        responses: {
            greeting: ["Hello!", "Hi there!", "Hey!", "hey!", "howzit!", "exe!", "sure!", "hola!"],
            query: ["I'm doing well, thanks!", "Not much, how about you?"],
            illness: ["It's important to talk to someone who can help.", "would you like some help?", "That doesn't sound good, maybe you should see a specialist?"]
        }
    },
    isizulu: {
        greeting: ["sawubona", "unjani"],
        query: ["unjani", "ku hamba kanjani?"],
        illness: ["ukudideka", "ikhanda", "isisu", "lala", "ebusuku", ""],
        responses: {
            greeting: ["Sawubona! Unjani?"],
            query: ["Ngiyaphila, ngyabonga! Kunjani ukuphila kwakho?"],
            illness: ["Kuyo siza ukuthi u thole u sizo, Zama uku phuza amanzi, kuze ube ncono, unga zama mhlambe uku bekelela nangu u dokotela e khuluma nge ndaba ezi fana na lezi : <a href ='https://youtu.be/AOHT-YiOeQA' target='_blank'>DOKOTELA</a> Nazi ne zinye indlela zoku zi siza : <a href ='https://youtu.be/AOHT-YiOeQA' target='_blank'>Mental Health care</a>"]
        }
    }
};

let currentLanguage = 'english';  // Default to English

function detectLanguage(input) {
    let inputWords = input.split(" ");
    for (let lang in languages) {
        if (inputWords.some(word => languages[lang].greeting.includes(word))) {
            currentLanguage = lang;
            return;
        }
    }
}

function getBotResponse(input) {
    // Try to detect the language of the input
    detectLanguage(input);

    if (languages[currentLanguage].greeting.some(phrase => input.includes(phrase))) {
        let responses = languages[currentLanguage].responses.greeting;
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (languages[currentLanguage].query.some(phrase => input.includes(phrase))) {
        let responses = languages[currentLanguage].responses.query;
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (languages[currentLanguage].illness.some(phrase => input.includes(phrase))) {
        let responses = languages[currentLanguage].responses.illness;
        return responses[Math.floor(Math.random() * responses.length)];
    } else {
        return 'I\'m here to help.';
    }
}


document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let userInput = document.getElementById('userInput').value.toLowerCase();
    let chatbox = document.getElementById('chatbox');

    chatbox.innerHTML += '<div class="userMessage">' + userInput + '</div>';

    // Clear the input
    document.getElementById('userInput').value = '';

    // Show typing indicator
    let typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = "block";

    // Simulate typing, then show bot's response
    setTimeout(function() {
        typingIndicator.style.display = "none";
        
        let response = getBotResponse(userInput);
        chatbox.innerHTML += '<div class="botMessage">' + response + '</div>';
        
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 2000);  
});
