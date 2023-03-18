<script setup>
  import { inject, reactive } from 'vue';
  import { useMemberStore } from '../stores';
  import LendrClient from '../api/lendr';
  import LoanOverview from '../components/LoanOverview.vue';
  import Record from '../components/Record.vue';

  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');
  const store = useMemberStore();

  const lendr = new LendrClient();
  const userdata = reactive({
    loanTotal: 0,
    upcomingInterest: 0,
    activity: []
  });

  loading.value = 2;
  // Load loan data.
  lendr.get('/member/me/loans', { requireAuth: true }).then(res => {
    return res.json();
  }).then(data => {
    loading.value -= 1;
    userdata.loanTotal = data.total;
    userdata.upcomingInterest = data.upcomingInterest;
    console.log('loaded loan data.');
  });

  // Load activity data.
  lendr.get('/member/me/activity', { requireAuth: true }).then(res => {
    return res.json();
  }).then(data => {
    loading.value -= 1;
    userdata.activity = data.activity;
    console.log('loaded activity data.');
  });
</script>

<template>
  <section id="info" :class="[(store.me.role == 'admin') ? 'admin' : '']">
    <LoanOverview v-if="!loading" :total="userdata.loanTotal" :interest="userdata.upcomingInterest" />
  </section>
  <section id="activity">
    <div v-if="loading" style="text-align: center">Loading...</div>
    <div v-else>
      <Record v-for="a in userdata.activity" :memo="a.memo" :amount="a.amount" :date="a.createdAt" />
    </div>
  </section>
</template>

<style>
  #info {
    background-color: var(--color-danger);
    min-height: 60vh;
  }
  #info.admin {
    background-color: var(--color-primary);
  }
</style>