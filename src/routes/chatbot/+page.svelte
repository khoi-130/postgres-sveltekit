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

<main class="flex bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-screen">
    <!-- Left Sidebar -->
    <Navbar sideChats={chats} activePage={activePage} />
    <!-- Main Content Area -->
    <div class="flex flex-grow flex-row">
      <div class="w-9/12 h-90 mx-4 my-5 rounded-xl bg-white border border-black shadow-lg p-5 flex flex-col justify-between overflow-y-auto mb-5">
        {#if $chatMessages.length > 0}
          {#each $chatMessages as msg}
            <Message message={msg.text} sender={msg.sender} class="mb-2 p-3 rounded-md bg-gradient-to-r from-green-200 to-blue-200 shadow-md" />
          {/each}
        {/if}
        <div class="mt-auto flex items-center">
          <input type="text" bind:value={userMessage} readonly="{readInputOnly}" class="bg-white w-full p-4 border border-black rounded-l-md outline-none text-base text-black placeholder-gray-500 shadow-inner" placeholder="Type your message...">
          <button on:click={handleSubmit} class="w-16 h-16 bg-yellow-400 border-black rounded-r-md text-black text-base cursor-pointer hover:bg-yellow-500 shadow-md">Send</button>
        </div>
      </div>
    </div>
  </main>
