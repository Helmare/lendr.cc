<script setup>
  import { inject, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import LoanOverview from "../components/LoanOverview.vue";

  /** @type {import('../api/lendr').default} */
  const lendr = inject('lendrClient');
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
    lendr.get('/member/me/loans', { requireAuth: true }).then(res => {
      if (res.status == 401) {
        router.push('/login');
      }
      return res.json();
    }).then(data => {
      userdata.loanTotal = data.total;
      userdata.upcomingInterest = data.upcomingInterest;
      console.log('loaded data.');
    });
  }
</script>

<template>
  <LoanOverview :total="userdata.loanTotal" :interest="userdata.upcomingInterest" />
</template>
