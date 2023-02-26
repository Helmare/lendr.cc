<script setup>
  import BasicForm from '../components/BasicForm.vue';

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import LendrClient from '../api/lendr';

  const lendr = new LendrClient();
  const router = useRouter();

  // if (lendr.loginId) {
  //   router.push('/');
  // }

  const username = ref('');
  const password = ref('');

  async function login(e) {
    const res = await lendr.login(username.value, password.value);
    if (res._id) {
      // SUCCESS!
      router.push('/');
    }
    else if (res.resetFlag) {
      // Reset password
      router.push(`/login/reset?f=${res.resetFlag}`);
    }
    else {
      // ERROR!
      password.value = '';
    }
  }
</script>

<template>
  <BasicForm action="Login" @submit.prevent="login">
    <label>Username</label>
    <input v-model="username" type="text" placeholder="1234" />
    <label>Password</label>
    <input v-model="password" type="password" placeholder="1234" />
  </BasicForm>
</template>