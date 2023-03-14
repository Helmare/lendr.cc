<script setup>
  import { inject, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import LendrClient from '../api/lendr';
  import BasicForm from '../components/BasicForm.vue';

  const router = useRouter();
  const route = useRoute();
  const resetFlag = route.query.f;

  const error = ref('');
  const password0 = ref('');
  const password1 = ref('');

  const lendr = new LendrClient();
  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');

  /**
   * Resets the password using the reset flag.
   */
  async function reset() {
    if (password0.value != password1.value) return;
    loading.value = true;

    const res = await lendr.post('/member/reset-password', {
      resetFlag: resetFlag,
      password: password0.value
    }, { method: 'PATCH' });

    loading.value = false;
    if (res.status == 200) {
      router.push('/login');
    }
    else {
      error.value = 'Failed to reset password.';
    }
  }
</script>

<template>
  <BasicForm action="Reset Password" @submit.prevent="reset">
    <span v-show="error" style="color: red">{{ error }}</span>
    <span v-show="password0 && password1 && password0 != password1" style="color: red">Passwords do not match.</span>
    <label>New Password</label>
    <input v-model="password0" type="password" placeholder="1234" />
    <label>Retype Password</label>
    <input v-model="password1" type="password" placeholder="1234" />
  </BasicForm>
</template>