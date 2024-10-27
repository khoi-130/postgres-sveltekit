<script lang="ts">
  import emailjs from '@emailjs/browser';
  import { goto } from "$app/navigation";

  let name = "";
  let email = "";
  let subject = "";
  let message = "";
  let isSubmitting = false;
  let errorMessage = "";

  const submitForm = (e: Event) => {
    e.preventDefault();
    errorMessage = "";

    // Start submission
    isSubmitting = true;

    // Send the primary form data to your email address
    emailjs
      .sendForm('service_2o4t9b4', 'template_0xem8hq', e.target as HTMLFormElement, 'v6zkH2ee0dXW779kH')
      .then(
        () => {
          // After the primary email is sent, trigger the auto-reply to the user's email
          emailjs.send('service_2o4t9b4', 'template_fbr786g', {
            to_name: name,          // Populates {{to_name}} in the auto-reply template
            message: message,       // Populates {{message}} in the auto-reply template
            to_email: email,        // Sends the auto-reply to the user's email
          }, 'v6zkH2ee0dXW779kH');

          // Redirect to a thank-you page after submission
          goto("/thank-you");
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          errorMessage = "Something went wrong, please try again.";
        }
      )
      .finally(() => {
        isSubmitting = false;
      });
  };
</script>

<!-- Contact Form Page -->
<div class="min-h-screen bg-orange-50 py-12">
  <div class="container mx-auto px-6 lg:px-20">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-800">Have a Question? Don't hesitate to contact us!</h2>
      <p class="text-lg text-gray-600 mt-4">
        We would love to hear from you. Please fill out the form below, and we'll get back to you as soon as possible.
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-8 lg:p-12">
      <form on:submit|preventDefault={submitForm}>
        <!-- Name Field -->
        <div class="mb-6">
          <label for="name" class="block text-lg font-medium text-gray-700 mb-2">Full Name <span class="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            name="from_name"
            bind:value={name}
            class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Khoi Anh Ngo"
            required
          />
        </div>

        <!-- Email Field -->
        <div class="mb-6">
          <label for="email" class="block text-lg font-medium text-gray-700 mb-2">Email Address <span class="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="user_email"
            bind:value={email}
            class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="yourname@example.com"
            required
          />
        </div>

        <!-- Subject Field -->
        <div class="mb-6">
          <label for="subject" class="block text-lg font-medium text-gray-700 mb-2">Subject</label>
          <select
            id="subject"
            name="user_subject"
            bind:value={subject}
            class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Support</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <!-- Message Field -->
        <div class="mb-6">
          <label for="message" class="block text-lg font-medium text-gray-700 mb-2">Message <span class="text-red-500">*</span></label>
          <textarea
            id="message"
            name="message"
            bind:value={message}
            class="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            rows="6"
            placeholder="Type your message here..."
            required
          ></textarea>
        </div>

        <!-- Error Message -->
        {#if errorMessage}
          <p class="text-red-500 mb-6">{errorMessage}</p>
        {/if}

        <!-- Submit Button -->
        <div class="text-center">
          <button
            type="submit"
            class="w-full lg:w-1/2 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition ease-in-out duration-200 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
  }
</style>
