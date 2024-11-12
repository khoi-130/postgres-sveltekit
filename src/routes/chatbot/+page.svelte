<script lang="ts">
    import Navbar from "$lib/Components/Navbar.svelte";
    import { writable, derived } from 'svelte/store'
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

    async function callMessagesGPT (userMsg : string, convHistory: ConversationEntry[], prefs: any) {
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
    // Function to call your API, expecting a reply based on the user message and current conversation history
    async function callInitiateGPT (userMsg : string, convHistory: ConversationEntry[], prefs: any, scene: any) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMsg,
                conversationHistory: convHistory,
                preferences: prefs,
                scenario: scene
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



    const callScenarioGPT = async (scenario: any)=>{
        try {
        const response = await fetch('/api/scenario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                scenario
            })
        });
        if (!response.ok) {
            throw new Error('Failed to call POST endpoint');
        }
        return await response.json();
        } catch (error) {
            console.error('Error calling POST endpoint:', error);
        }
    }


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
        console.log(data)
    })

    const getResponse = async(scene: any) => {
        // Perform an initial call to set up or receive the initial bot message
        // Assuming you don't have a specific user message to send at this point,
        // you might just send an empty message or a specific flag to indicate this is the initial load
        const initialMessage = ""; // or any initial message if you have one

        const response = await callInitiateGPT(initialMessage, conversationHistory, prefProfile, scene);
        console.log(prefProfile)
        if (response) {
            conversationHistory.push({ role: "assistant", content: response.botReply });
            chatMessages.update(messages => [...messages, { text: response.botReply, type: 'bot' }]);
            conversationHistory = response.conversationHistory;
        }
    }

    let theScene = ""
    let theScenario = ""

    const createScenario = async () => {
    if (prefProfile.scenario != 1) {
        const theScenario2 = await callScenarioGPT(prefProfile.scenario);
        
        if (theScenario2 && theScenario2.scene) {
            theScene = theScenario2.scene; // Access the 'scene' property
            theScenario = theScenario2.scenario; // Access the 'scene' property
            console.log("SCENARIO2 Scene:", theScene); // Log the scene description
            console.log("SCENARIO2 Environment:", theScenario); // Log the environment scenario
        } else {
            console.log("SCENARIO2 was undefined or did not contain scene");
        }
        return theScenario2
    }};



    let firstLoad = true
    const reloadComponent = () => {
        // Restarts the chatbot and set it to zero
        console.log(removable)
        if(removable){
            removable.$destroy()
            console.log("Destroy")
        }
        if(firstLoad === true){
            randomizePreferences()
        }
        chatMessages.set([])
        conversationHistory = []
        counter = 0
        firstTime = false
        getResponse(createScenario())
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

    const randomizePreferences = () => {
        const defaultPrefs = {
           age: 18,
           confidence: 1,
           playfulness: 1,
           warmth: 1,
           politeness: 1,
           spiciness: 1,
           gender: "Not Specified",
           scenario: 1
        };
        const minCeiled = Math.ceil(1);
        const maxFloored = Math.floor(5);
        for(const key in defaultPrefs){
            if(key === "age"){
                const minCeiled = Math.ceil(18);
                const maxFloored = Math.floor(35);
                defaultPrefs[key] = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
            }
            else if(key == "gender"){
                continue
            }
            else{
                defaultPrefs[key] = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
            }
        }
        profileShared.update(() => {
            return defaultPrefs
        })
    }
    
    onMount(async () => {
        // Subscribe to showPreferences and animate on change
        showPreferences.subscribe(() => {
            animatePreferences();
        });
        firstLoad = false
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
    <div class="flex flex-row h-full">
        <div class="preferences-panel bg-[#1C1C1C] h-full">
            <Preferences openPreferences={openprefs}/>
        </div>
        <div class="flex flex-row w-10/12 h-full rounded-lg divide-x divide-slate-600">
            <div class="basis-3/4 ml-8 p-8 bg-[#2F2F2F] flex flex-col h-full">
                <div bind:this={chatWindow} class="flex-grow-0 overflow-auto flex flex-col h-5/6 rounded-lg">
                    {#if $chatMessages.length > 0}
                        {#each $chatMessages as msg}
                            {#if msg.type === "user"}
                                <div class="user-message" in:fly={{ y: 200, duration: 2000 }}>
                                    <div id="TextMessage">
                                        <Message bind:this={removable} messageSent={msg.text}/>
                                    </div>
                                </div>
                            {/if}
                            {#if msg.type === "bot"}
                                <div class="bot-message" in:fly={{ y: 200, duration: 2000 }}>
                                    <div id="TextMessage">
                                        <Message bind:this={removable} messageSent={msg.text}/>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    {/if}
                </div>
                <div class="mt-auto flex items-center">
                    <input type="text" bind:value={userMessage} readonly="{readInputOnly}" id="sendbutton"
                           class="bg-[#E5E7EB] w-full p-4 border border-[#D1D5DB] rounded-md outline-none text-base text-black placeholder-gray-500 shadow-inner"
                           placeholder="Type your message..."
                           on:keydown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                    userMessage = ''; // Clears the input field
                                }
                            }}
                    >
                    <button on:click={handleSubmit}
                        class="ml-4 w-16 h-12 bg-[#2563EB] border-[#1E40AF] rounded-md text-white text-base cursor-pointer hover:bg-[#1E40AF] shadow-md">Send</button>
                </div>
            </div>
            <div class="flex flex-col basis-1/4 flex-grow bg-[#2F2F2F] h-full">
                <div class="text-white bg-[#2F2F2F] divide-y divide-slate-600 h-1/2">
                    <div class="basis-1/2 h-full text-center">
                        Scenario: {theScenario}
                        <div>
                            <br>
                            {theScene}
                        </div>
                    </div>
                    <div class="basis-1/2 h-full text-center">
                        Conversation Feedback
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* Adjusted styling for user messages */
    .user-message {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0.75rem;
        margin-right: 3%;
    }

    /* Bot messages stay with original spacing */
    .bot-message {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 0.75rem;
    }

    /* Responsive styling for message bubbles */
    #TextMessage {
        padding: 0.75rem 1rem;
        border-radius: 1.25rem;
        max-width: 75%;
        font-size: 1rem;
        line-height: 1.4;
        word-break: break-word;
    }

    /* User and bot message colors */
    .user-message #TextMessage {
        background-color: #65081F;
        color: #FFFFFF;
    }

    .bot-message #TextMessage {
        background-color: #3F3F3F;
        color: #FFFFFF;
        border: 0.063rem solid #4F4F4F;
    }
    .preferences-panel {
        width: 16.666667%;
        transition: width 0.5s ease-in-out;
    }
</style>

