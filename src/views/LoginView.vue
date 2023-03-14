<script setup>
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import LendrClient from '../api/lendr';
  import BasicForm from '../components/BasicForm.vue';

  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');

  const lendr = new LendrClient();
  const router = useRouter();

  const disabled = ref(false);
  const error = ref(false);
  const username = ref('');
  const password = ref('');

  async function login() {
    loading.value = true;
    disabled.value = true;
    const res = await lendr.login(username.value, password.value);
    if (res._id) {
      // SUCCESS!
      await router.push('/');
    }
    else if (res.resetFlag) {
      // Reset password
      await router.push(`/login/reset?f=${res.resetFlag}`);
      loading.value = false;
    }
    else {
      // ERROR!
      password.value = '';
      loading.value = false;
      error.value = true;
    }
  }
</script>

<template>
  <BasicForm action="Login" :disabled="loading" @submit.prevent="login">
    <span v-show="error" style="color: red">Invalid username/password.</span>
    <label>Username</label>
    <input v-model="username" type="text" placeholder="bob" />
    <label>Password</label>
    <input v-model="password" type="password" placeholder="1234" />
  </BasicForm>
</template>