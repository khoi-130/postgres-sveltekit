<script lang="ts">
    import Navbar from "$lib/Components/Navbar.svelte";
    import { writable } from 'svelte/store'
    import { onMount } from "svelte";
    import Preferences from "$lib/Components/Preferences.svelte";
    import gsap from "gsap";
    import { showPreferences, profileShared } from "../../stores";
    import { fade, fly } from 'svelte/transition';
    import Message from "$lib/Components/Message.svelte";

    let isPreferencesVisible: boolean = true;
    showPreferences.subscribe(value => {
        isPreferencesVisible = value;
    });

    const visible = writable(false)

    let userMessage = '';
    let chatMessages = writable<ChatMessage[]>([]);
    let conversationHistory: ConversationEntry[] = [];
    let counter = 0;
    let readInputOnly = false;
    let mounted = false;

    interface ConversationEntry {
        role: string;
        content: string;
    }

    interface ChatMessage {
        text: string;
        type: 'user' | 'bot';
    }

    // Function to call your API, expecting a reply based on the user message and current conversation history
    const callMessagesGPT = async (userMsg : string, convHistory: ConversationEntry[], prefs: any) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMsg,
                conversationHistory: convHistory,
                preferences: prefs
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
        if (!userMessage.trim()) return;
        conversationHistory.push({ role: "user", content: userMessage });
        chatMessages.update(messages => [...messages, { text: userMessage, type: 'user' }]);
        
        const response = await callMessagesGPT(userMessage, conversationHistory, prefProfile);
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
    let prefProfile: any

    profileShared.subscribe((data) => {
        prefProfile = data
    })

    const getResponse = async() => {
        // Perform an initial call to set up or receive the initial bot message
        // Assuming you don't have a specific user message to send at this point,
        // you might just send an empty message or a specific flag to indicate this is the initial load
        const initialMessage = ""; // or any initial message if you have one

        const response = await callMessagesGPT(initialMessage, conversationHistory, prefProfile);
        console.log(prefProfile)
        if (response) {
            conversationHistory.push({ role: "assistant", content: response.botReply });
            chatMessages.update(messages => [...messages, { text: response.botReply, type: 'bot' }]);
            conversationHistory = response.conversationHistory;
        }
    }
    const reloadComponent = () => {
        // Restarts the chatbot and set it to zero
        console.log(removable)
        if(removable){
            removable.$destroy()
            console.log("Destroy")
        }
        chatMessages.set([])
        conversationHistory = []
        counter = 0
        firstTime = false
        getResponse()
        console.log("UPDATED")
    }
    $: $profileShared, reloadComponent()
  
    let chatWindow: any; // Reference to the chat window div
    // Function to scroll to the bottom of the chat window
    let firstTime = false
    const scrollToBottom = () => {
        if (firstTime) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
          firstTime = false;
        } else if (chatWindow.scrollTop + chatWindow.clientHeight === chatWindow.scrollHeight) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    };

    // Watch chatMessages array and scroll when a new message is added
    $: if ($chatMessages.length > 0) {
      firstTime = true
      scrollToBottom();
      scrollToBottom();
      scrollToBottom();
      console.log("Scrolling")
    }
    
    onMount(async () => {
        // Subscribe to showPreferences and animate on change
        showPreferences.subscribe(() => {
            animatePreferences();
        });


        console.log("Component mounted");
    });
    let activePage = '/chatbot';

    // Animate the preferences section
    function animatePreferences() {
        const preferencesDiv = document.querySelector('.preferences-panel');
        if (isPreferencesVisible) {
            gsap.to(preferencesDiv, { width: '16.666667%' }); // Expand to 1/6
        } else {
            gsap.to(preferencesDiv, { width: '5%' }); // Shrink to smaller width
        }
    }

    let openprefs = true
    let removable: any
</script>

<main class="bg-gradient-to-r from-[#65081F] to-[#800020] h-screen">
    <div class="basis-1/6 flex flex-row h-full">
        <div class="preferences-panel bg-[#1C1C1C] h-full">
            <Preferences openPreferences={openprefs}/>
        </div>
        <div class="basis-5/6 h-full">
            <div class="mt-8 mr-8 ml-8 mb-16 p-8 bg-[#2F2F2F] flex flex-col h-5/6 rounded-lg">
                <div bind:this={chatWindow} class="flex-grow-0 overflow-auto bg-gradient-to-r from-[#2F2F2F] to-[#1C1C1C] flex flex-col h-5/6 rounded-lg">
                    {#if $chatMessages.length > 0}
                        {#each $chatMessages as msg}
                            {#if msg.type === "user"}
                                <div in:fly={{ y: 200, duration: 2000 }}>
                                    <div class="flex justify-end mb-4">
                                        <div class="p-4 text-base text-slate-50	rounded-lg shadow-lg bg-[#65081F]" id="TextMessage">
                                            <Message bind:this={removable} messageSent={msg.text}/>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                            {#if msg.type === "bot"}    
                                <div in:fly={{ y: 200, duration: 2000 }}>
                                   <div class="flex justify-start mb-4 pb-4">
                                       <div class="p-4 text-base text-slate-50 rounded-lg shadow-lg bg-[#3F3F3F] border border-[#4F4F4F]" id="TextMessage">
                                           <Message bind:this={removable} messageSent={msg.text}/>
                                       </div>
                                   </div>
                                </div>
                            {/if}
                        {/each}
                    {/if}
                </div>
                <div class="mt-auto flex items-center">
                    <input type="text" bind:value={userMessage} readonly="{readInputOnly}" id="sendbutton"
                        class="bg-[#E5E7EB] w-full p-4 border border-[#D1D5DB] rounded-md outline-none text-base text-black placeholder-gray-500 shadow-inner"
                        placeholder="Type your message...">
                    <button on:click={handleSubmit}
                        class="ml-4 w-16 h-12 bg-[#2563EB] border-[#1E40AF] rounded-md text-white text-base cursor-pointer hover:bg-[#1E40AF] shadow-md">Send</button>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .preferences-panel {
        width: 16.666667%;
        transition: width 0.5s ease-in-out;
    }
    .h-full {
        height: 100%;
    }
    .h-screen {
        height: 100vh;
    }
</style>
