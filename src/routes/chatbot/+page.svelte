<script lang="ts">
    import Navbar from "$lib/Components/Navbar.svelte";
    import Message from "$lib/Components/Message.svelte";
    import { writable } from 'svelte/store'
	import { onMount } from "svelte";

    let userMessage = '';
    let chatMessages =  writable<ChatMessage[]>([]);
    let conversationHistory: ConversationEntry[] = []; // Store conversation history here
    let counter = 0;
    let readInputOnly = false;

    interface ConversationEntry {
        role: string;
        content: string;
    }

    interface ChatMessage {
        text: string;
        type: 'user' | 'bot'; 
    }

    // Function to call your API, expecting a reply based on the user message and current conversation history
    const callMessagesGPT = async (userMsg : string, convHistory: ConversationEntry[]) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userMsg,
                    conversationHistory: convHistory
                })
            });
            if (!response.ok) {
                throw new Error('Failed to call POST endpoint');
            }
            return await response.json();
        } catch (error) {
            console.error('Error calling POST endpoint:', error);
        }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();  // Prevents the default form submit action
        handleSubmit();          // Calls handleSubmit when Enter is pressed
      }
    };

    const handleSubmit = async () => {
        console.log("Called handleSubmit");
        if (!userMessage.trim()) return;
        conversationHistory.push({ role: "user", content: userMessage });
        chatMessages.update(messages => [...messages, { text: userMessage, type: 'user' }]);
        
        const response = await callMessagesGPT(userMessage, conversationHistory);
        if (response) {
            conversationHistory.push({ role: "assistant", content: response.botReply });
            chatMessages.update(messages => [...messages, { text: response.botReply, type: 'bot' }]);
            conversationHistory = response.conversationHistory;
        }
        userMessage = '';
        counter+=1;
        if (counter === 5) {
            readInputOnly = true;
        }
    };

    onMount(async () => {
        console.log("Component mounted");
        // Perform an initial call to set up or receive the initial bot message
        // Assuming you don't have a specific user message to send at this point,
        // you might just send an empty message or a specific flag to indicate this is the initial load
        const initialMessage = ""; // or any initial message if you have one
        const response = await callMessagesGPT(initialMessage, conversationHistory);
        if (response) {
            conversationHistory.push({ role: "assistant", content: response.botReply });
            chatMessages.update(messages => [...messages, { text: response.botReply, type: 'bot' }]);
            conversationHistory = response.conversationHistory;
        }
    });

    let chats = [
        { id: 1, name: 'Chat 1' },
        { id: 2, name: 'Chat 2' },
        { id: 3, name: 'Chat 3' }
    ];
    let activePage = '/chatbot';
</script>

<main class="flex h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
    <!-- Left Sidebar (Navbar) -->
    <Navbar sideChats={chats} activePage={activePage} class="w-2/12 bg-white shadow-lg" />
  
    <!-- Chat Area -->
    <div class="flex flex-grow flex-col justify-between h-full mx-4 my-5 bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Chat Messages Area -->
      <div class="flex flex-col p-6 space-y-4 overflow-y-auto h-full">
        {#if $chatMessages.length > 0}
          {#each $chatMessages as msg}
            <div class="flex {msg.type === 'user' ? 'justify-end' : 'justify-start'}">
              <div class="max-w-xs md:max-w-md p-4 rounded-lg shadow-md 
                          {msg.type === 'user' ? 'bg-blue-400 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}">
                {msg.text}
              </div>
            </div>
          {/each}
        {/if}
      </div>
  
      <!-- Input Area -->
      <div class="bg-gray-100 p-4 border-t border-gray-300">
        <div class="flex items-center space-x-2">
          <input 
            type="text" 
            bind:value={userMessage} 
            readonly={readInputOnly} 
            on:keydown={handleKeyDown}
            class="w-full px-4 py-3 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your message..." 
          />
          <button 
            on:click={handleSubmit} 
            class="px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md shadow-md transition ease-in-out duration-200">
            Send
          </button>
        </div>
      </div>
    </div>
  </main>
  