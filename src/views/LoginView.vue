<script setup>
  import BasicForm from '../components/BasicForm.vue';

  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';

  /** @type {import('../api/lendr').default} */
  const lendr = inject('lendrClient');
  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');
  const router = useRouter();

  if (lendr.loginId) {
    router.push('/');
  }

  const username = ref('');
  const password = ref('');

  async function login() {
    loading.value = true;
    const res = await lendr.login(username.value, password.value);
    if (res._id) {
      // SUCCESS!
      router.push('/');
    }
    else if (res.resetFlag) {
      // Reset password
      router.push(`/login/reset?f=${res.resetFlag}`);
      loading.value = false;
    }
    else {
      // ERROR!
      password.value = '';
      loading.value = false;
    }
  }
</script>

<template>
  <BasicForm action="Login" @submit.prevent="login">
    <label>Username</label>
    <input v-model="username" type="text" placeholder="bob" />
    <label>Password</label>
    <input v-model="password" type="password" placeholder="1234" />
  </BasicForm>
</template>