<script setup>
  import { inject, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import LoanOverview from "../components/LoanOverview.vue";

  /** @type {import('../api/lendr').default} */
  const lendr = inject('lendrClient');
  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');
  const router = useRouter();

  const userdata = reactive({
    loanTotal: 0,
    upcomingInterest: 0
  });

  if (!lendr.isLoggedIn()) {
    router.push('/login');
  }
  else {
    loading.value = true;
    lendr.get('/member/me/loans', { requireAuth: true }).then(res => {
      loading.value = false;
      if (res.status == 401) {
        router.push('/login');
      }
      return res.json();
    }).then(data => {
      userdata.loanTotal = data.total;
      userdata.upcomingInterest = data.upcomingInterest;
      userdata.loaded = true
      console.log('loaded data.');
    });
  }
</script>

<template>
  <div v-if="!loading">
    <LoanOverview :total="userdata.loanTotal" :interest="userdata.upcomingInterest" />
  </div>
</template>
