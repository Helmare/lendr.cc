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
    <div class="record-group">
      <div class="record add">
        <div>PERSON REASONS PERSON REASONS</div>
        <div>$100</div>
        <div>02/28</div>
      </div>
      <div class="record add">
        <div>CREATED LOAN</div>
        <div>$100</div>
        <div>02/27</div>
      </div>
      <div class="record pay">
        <div>PAYMENT</div>
        <div>$200</div>
        <div>02/26</div>
      </div>
      <div class="record add">
        <div>INTEREST</div>
        <div>$3.75</div>
        <div>02/01</div>
      </div>
      <div class="record add">
        <div>CREATED LOAN</div>
        <div>$500</div>
        <div>11/02</div>
      </div>
    </div>
  </div>
</template>

<style>
  .record {
    display: grid;
    grid-template-columns: 60% 1fr 1fr;
    font-size: 2em;
    padding: 1em;
    color: var(--color-light);
    border-bottom: 1px solid var(--color-dark);
  }
  .record:first-child {
    border-top: 1px solid var(--color-dark);
  }
  .record.add {
    background-color: var(--color-danger);
  }
  .record.add:nth-child(2n) {
    background-color: var(--color-danger-soft);
  }
  .record.pay {
    background-color: var(--color-primary);
  }
  .record.pay:nth-child(2n) {
    background-color: var(--color-primary-soft);
  }

  .record div {
    text-align: right;
  }
  .record div:first-child {
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>