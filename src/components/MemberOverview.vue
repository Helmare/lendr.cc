<script setup>
  import { inject, reactive } from 'vue';
  import LendrClient from '../api/lendr';
  import LoanOverview from './LoanOverview.vue';
  import Record from './Record.vue';

  const props = defineProps({
    memberId: String,
    admin: Boolean
  });

  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');

  const lendr = new LendrClient();
  const memberData = reactive({
    loanTotal: 0,
    upcomingInterest: 0,
    activity: []
  });

  loading.value = 2;
  // Load loan data.
  lendr.get(`/member/${props.memberId}/loans`, { requireAuth: true }).then(res => {
    return res.json();
  }).then(data => {
    loading.value -= 1;
    memberData.loanTotal = data.total;
    memberData.upcomingInterest = data.upcomingInterest;
    console.log('loaded loan data.');
  });

  // Load activity data.
  lendr.get(`/member/${props.memberId}/activity`, { requireAuth: true }).then(res => {
    return res.json();
  }).then(data => {
    loading.value -= 1;
    memberData.activity = data.activity;
    console.log('loaded activity data.');
  });
</script>

<template>
  <section id="info">
    <LoanOverview v-if="!loading" :total="memberData.loanTotal" :interest="memberData.upcomingInterest" />
  </section>
  <div v-show="props.admin" id="admin-controls">
    <a :href="`/loan/create?m=${props.memberId}`" class="button primary">Create Loan</a>
    <a :href="`/member/payment?m=${props.memberId}`" class="button primary">Post Payment</a>
  </div>
  <section id="activity">
    <div v-if="loading" style="text-align: center">Loading...</div>
    <div v-else>
      <Record v-for="a in memberData.activity" :memo="a.memo" :amount="a.amount" :date="a.createdAt" />
    </div>
  </section>
</template>

<style>
  #info {
    background-color: var(--color-danger);
    min-height: 60vh;
  }
  #admin-controls {
    position: absolute;
    z-index: 100;
    display: flex;
    width: 100%;
    justify-content: center;
    transform: translate(0, -50%);
    font-size: 2em;
  }
  #admin-controls a {
    margin: 0em 0.5em;
  }
  @media only screen and (max-width: 768px) {
    #admin-controls + * {
      margin-top: 2em;
    }
  }
</style>