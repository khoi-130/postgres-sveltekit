<script lang="ts">
    export let message: string;
    export let sender: string; // "user" or "bot"
</script>

<style>
    .message-container {
        display: flex;
        margin: 10px 0;
    }

    .message-user {
        justify-content: flex-end;
    }

    .message-bot {
        justify-content: flex-start;
    }

    .message-bubble {
        padding: 10px;
        border-radius: 10px;
        font-size: 16px;
        line-height: 1.4;
        max-width: 100%;
    }

    .message-bubble.user {
        background-color: #DCF8C6;
        color: #000;
        border-bottom-right-radius: 0;
    }

    .message-bubble.bot {
        background-color: #f1f1f1;
        color: #000;
        border-bottom-left-radius: 0;
    }

</style>

<div class="message-container {sender === 'user' ? 'message-user' : 'message-bot'}">
    <div class="message-bubble {sender}">
        {message}
    </div>
</div>
