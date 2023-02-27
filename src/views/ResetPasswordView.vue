<script setup>
  import { inject, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import BasicForm from '../components/BasicForm.vue';

  const router = useRouter();
  const route = useRoute();
  const resetFlag = route.query.f;

  const password0 = ref('');
  const password1 = ref('');

  /** @type {import('../api/lendr').default} */
  const lendr = inject('lendrClient');
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
      // FAILED!
    }
  }

  // Redirect if reset flag isn't valid.
  if (!resetFlag) {
    router.push('/login');
  }
</script>

<template>
  <BasicForm action="Reset Password" @submit.prevent="reset">
    <div v-show="password0 != password1"></div>
    <div v-show="password0 != password1" style="line-height: 4em; color: red">Passwords do not match.</div>
    <label>New Password</label>
    <input v-model="password0" type="password" placeholder="1234" />
    <label>Retype Password</label>
    <input v-model="password1" type="password" placeholder="1234" />
  </BasicForm>
</template>