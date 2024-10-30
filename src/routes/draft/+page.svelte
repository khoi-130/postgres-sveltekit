<script lang="ts">
  import { onMount } from 'svelte';

  let messages = [];
  let recognition;
  let listening = false;
  let inputText = "";

  // Ensure the code that depends on `window` only runs in the browser
  onMount(() => {
    // Check for browser support for the Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US'; // Set the language
      recognition.interimResults = false; // Only final results
      recognition.continuous = false; // Listen for one sentence and stop

      // Handle recognition result
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messages = [...messages, { text: transcript, sender: 'user' }];
        processUserCommand(transcript);  // Process the recognized command
      };

      // Handle recognition errors
      recognition.onerror = (event) => {
        console.error("Error occurred in speech recognition: ", event.error);
        listening = false;
      };

      // Stop recognition when speech ends
      recognition.onend = () => {
        listening = false;
      };
    } else {
      console.error("Speech Recognition API is not supported in this browser.");
    }
  });

  // Start or stop listening for voice input
  const toggleListening = () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    listening = !listening;
  };

  // Process user command (You can modify this to match your chatbot's behavior)
  const processUserCommand = (command) => {
    let botResponse = "I'm not sure how to respond to that.";

    // Simple command processing
    if (command.includes("hello")) {
      botResponse = "Hello! How can I assist you today?";
    } else if (command.includes("weather")) {
      botResponse = "Let me check the weather for you.";
    } else if (command.includes("time")) {
      botResponse = `The current time is ${new Date().toLocaleTimeString()}.`;
    }

    // Add bot response to messages
    messages = [...messages, { text: botResponse, sender: 'bot' }];

    // Optionally, use text-to-speech for the bot's response
    speak(botResponse);
  };

  // Optionally, use speech synthesis to speak the bot's response
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Handle text input for the chatbot
  const handleSubmit = () => {
    messages = [...messages, { text: inputText, sender: 'user' }];
    processUserCommand(inputText);
    inputText = "";
  };
</script>

<!-- Chatbot UI -->
<div class="min-h-screen bg-gray-100 py-12">
  <div class="container mx-auto px-6 lg:px-20">
    <div class="bg-white rounded-lg shadow-lg p-8 lg:p-12">
      <h2 class="text-3xl font-bold mb-6">Chat with Me</h2>

      <!-- Chatbox -->
      <div class="chatbox bg-gray-200 p-4 mb-6 rounded-lg h-64 overflow-y-auto">
        {#each messages as message (message.text)}
          <div class="mb-2">
            <strong>{message.sender === 'user' ? 'You' : 'Bot'}:</strong> {message.text}
          </div>
        {/each}
      </div>

      <!-- Input Section -->
      <div class="flex items-center space-x-4">
        <input
          type="text"
          bind:value={inputText}
          placeholder="Type your message"
          class="w-full px-4 py-2 border rounded-lg"
        />
        <button
          on:click={handleSubmit}
          class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Send
        </button>
        <button
          on:click={toggleListening}
          class="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          {listening ? 'Stop' : 'Talk'}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .chatbox {
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    background-color: #f7f7f7;
  }
</style>
