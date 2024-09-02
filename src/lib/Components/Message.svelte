<script>
    export let message;
    export let sender; // 'user' or 'bot'
</script>

<!-- Using Tailwind CSS to apply styling based on the sender -->
<div class={sender === "user"
                ? 'flex justify-end my-2'
                : 'flex justify-start my-2'}>
    <div class={sender === "user"
                ? 'max-w-3/4 bg-purple-600 text-white py-2 px-4 rounded-lg shadow'
                : 'max-w-3/4 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow'}>
        <pre class="whitespace-pre-wrap">{message}</pre>
    </div>
</div>