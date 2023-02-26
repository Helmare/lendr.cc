<script setup>
  import { inject } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import BasicForm from '../components/BasicForm.vue';

  const router = useRouter();
  const route = useRoute();
  const resetFlag = route.query.f;

  /** @type {import('../api/lendr').default} */
  const lendr = inject('lendrClient');

  /**
   * Resets the password using the reset flag.
   */
  function reset() {
    console.log(resetFlag);
  }

  // Redirect if reset flag isn't valid.
  if (!resetFlag) {
    router.push({ path: '/login' });
  }
</script>

<template>
  <BasicForm action="Reset Password" @submit.prevent="reset">
    <label>New Password</label>
    <input id="password0" type="password" placeholder="1234" />
    <label>Retype Password</label>
    <input id="password1" type="password" placeholder="1234" />
  </BasicForm>
</template>