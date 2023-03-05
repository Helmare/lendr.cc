<script setup>
  import { inject, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import LoanOverview from '../components/LoanOverview.vue';
  import Record from '../components/Record.vue';

  /** @type {import('../api/lendr').default} */
  const lendr = inject('lendrClient');
  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');
  const router = useRouter();

  const userdata = reactive({
    loanTotal: 0,
    upcomingInterest: 0,
    activity: []
  });

  if (!lendr.isLoggedIn()) {
    router.push('/login');
  }
  else {
    loading.value = 2;

    // Load loan data.
    lendr.get('/member/me/loans', { requireAuth: true }).then(res => {
      loading.value -= 1;
      if (res.status == 401) {
        router.push('/login');
      }
      return res.json();
    }).then(data => {
      userdata.loanTotal = data.total;
      userdata.upcomingInterest = data.upcomingInterest;
      console.log('loaded loan data.');
    });

    // Load activity data.
    lendr.get('/member/me/activity', { requireAuth: true }).then(res => {
      loading.value -= 1;
      if (res.status == 401) {
        router.push('/login');
      }
      return res.json();
    }).then(data => {
      userdata.activity = data.activity;
      console.log('loaded activity data.');
    });
  }
</script>

<template>
  <section id="info">
    <LoanOverview v-if="!loading" :total="userdata.loanTotal" :interest="userdata.upcomingInterest" />
  </section>
  <section id="activity">
    <div v-if="loading" style="text-align: center">Loading...</div>
    <div v-else v-for="a in userdata.activity">
      <Record :memo="a.memo" :amount="a.amount" :date="a.createdAt" />
    </div>
  </section>
</template>

<style>
  #info {
    background-color: var(--color-danger);
    min-height: 60vh;
  }
</style>