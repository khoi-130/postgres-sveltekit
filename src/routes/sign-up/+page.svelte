<script>
    let email= '';
    let password = '';
    let rememberMe = false;

    function handleLogin() {
        console.log({email, password, rememberMe });
    }
</script>

    <!-- Left side: Background Image with Login Button -->
<div class="flex h-screen">
    <div class="w-full w-1/2 relative bg-cover bg-center bg-[url('$lib/images/login-image.jpg')]">
      <div class="flex justify-center items-center h-full bg-black bg-opacity-50">
        <button class="bg-purple-400 hover:bg-green-600 text-white font-bold py-3 px-6  shadow-lg">👍 Login User</button>
      </div>
      <p class="absolute bottom-8 w-full text-center text-white text-sm px-6">Log in right away for our advanced chatbot application, created to address issues when flirting with your crush.</p>
    </div>
</div>

 <!-- Right side: Login Form -->
<div class="flex h-screen">
 <div class="w-full w-1/2 flex flex-col justify-center items-center bg-white p-8">
    <a href="/" class="self-start text-gray-600 mb-4">&larr; Back to Home</a>
    <h2 class="text-2xl font-bold mb-6">Welcome Back</h2>
    <form class="w-full max-w-sm">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Enter Email Address</label>
        <input id="email" type="email" bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Enter Password</label>
        <input id="password" type="password" bind:value={password} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      </div>
      <div class="flex items-center justify-between mb-4">
        <label class="inline-flex items-center">
          <input type="checkbox" bind:checked={rememberMe} class="form-checkbox h-5 w-5 text-gray-600"/>
          <span class="ml-2 text-sm text-gray-600">Remember Me</span>
        </label>
        <a href="/" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
      </div>
      <div class="flex items-center justify-center">
        <button type="button" on:click={handleLogin} class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In ➔</button>
      </div>
    </form>
    <p class="mt-6 text-sm text-gray-600">Don't have an account? <a href="/signup" class="text-green-500 hover:text-green-700">Sign up!</a></p>
  </div>
</div>
