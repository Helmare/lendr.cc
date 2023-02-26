<script setup>
  import BasicForm from '../components/BasicForm.vue';
  function login(e) {
    console.log('HELLO WORLD!');
    console.log(e);
  }
</script>

<template>
  <BasicForm action="Login" @submit.prevent="login">
    <label>Username</label>
    <input id="username" type="password" placeholder="1234" />
    <label>Password</label>
    <input id="password" type="password" placeholder="1234" />
  </BasicForm>
</template>