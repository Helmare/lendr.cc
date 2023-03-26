<script setup>
  import { ref, inject } from 'vue';
  import { useRoute } from 'vue-router';
  import LendrClient from '../../api/lendr';
  import BasicForm from '../../components/BasicForm.vue';
  import MoneyInput from '../../components/MoneyInput.vue';

  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');

  const lendr = new LendrClient();
  const route = useRoute();
  console.log(route.query.m);

  const disabled = ref(false);
  const success = ref(false);
  const error = ref('');
  const memberId = ref(route.query.m || '');
  const memo = ref('');
  const amount = ref(0);

  // Grab all borrowers
  const borrowers = ref([]);
  lendr.get('/member/all', { requireAuth: true }).then(res => {
    return res.json();
  }).then(data => {
    borrowers.value = data.members.filter(b => b.role == 'borrower').sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
  });

  async function createLoan() {
    // Reset
    success.value = false;
    error.value = '';
    disabled.value = true;
    loading.value = true;

    const res = await lendr.post('/loan/create', {
      memo: memo.value,
      borrowers: [memberId.value],
      interest: 0.09,
      principal: amount.value
    }, { requireAuth: true });

    // Show message
    if (res.status == 200) {
      success.value = true;
    }
    else {
      const body = await res.json();
      error.value = `Failed to create loan... (${res.status}: ${body.err})`;
    }

    // Stop loading.
    loading.value = false;
    disabled.value = false;
  }
</script>

<template>
  <BasicForm action="Create" :disabled="loading" @submit.prevent="createLoan">
    <span v-show="success" style="color: var(--color-primary)">Successfully created loan!</span>
    <span v-show="error" style="color: red">{{ error }}</span>
    <label>Borrower</label>
    <select v-model="memberId">
      <option v-for="b in borrowers" :value="b._id">{{ b.username }}</option>
    </select>
    <label>Memo</label>
    <input type="text" v-model="memo" placeholder="Personal Loan" />
    <label>Amount</label>
    <MoneyInput v-model:amount="amount" />
  </BasicForm>
</template>