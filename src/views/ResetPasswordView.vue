<script setup>
  import BasicForm from '../components/BasicForm.vue';
  function reset() {
    
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