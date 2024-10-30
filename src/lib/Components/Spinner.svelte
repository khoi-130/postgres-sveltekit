<script lang="ts">
    export let visible: boolean;
  </script>
  
  {#if visible}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <img src="/src/lib/images/LoadingHeart.gif" alt="Loading" class="w-20 h-20" />
    </div>
  {/if}
  