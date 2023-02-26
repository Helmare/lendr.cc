<script setup>
  import { inject } from 'vue';
  import { useRouter } from 'vue-router';
  import LoanOverview from "../components/LoanOverview.vue";

  /** @type {import('../api/lendr').default} */
  const lendr = inject('lendrClient');
  const router = useRouter();

  if (!lendr.isLoggedIn()) {
    router.push('/login');
  }
</script>

<template>
  <LoanOverview />
</template>
