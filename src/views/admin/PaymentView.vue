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

  const disabled = ref(false);
  const success = ref(false);
  const error = ref('');
  const memberId = ref(route.query.m || '');
  const amount = ref(0);

  // Grab all borrowers
  const borrowers = ref([]);
  lendr.getAllBorrowers().then(data => {
    borrowers.value = data;
  });

  async function postPayment() {
    // Reset
    success.value = false;
    error.value = '';
    disabled.value = true;
    loading.value = true;
    
    // Post payment
    const res = await lendr.post(`/member/${memberId.value}/payment`, {
      amount: -amount.value
    }, { requireAuth: true });

    // Show message
    if (res.status == 200) {
      success.value = true;
    }
    else {
      error.value = `Failed to post payment... (${res.status})`;
    }

    // Stop loading.
    loading.value = false;
    disabled.value = false;
  }
</script>

<template>
  <BasicForm action="Post" :disabled="loading" @submit.prevent="postPayment">
    <span v-show="success" style="color: var(--color-primary)">Successfully posted payment!</span>
    <span v-show="error" style="color: red">{{ error }}</span>
    <label>Borrower</label>
    <select v-model="memberId">
      <option v-for="b in borrowers" :value="b._id">{{ b.username }}</option>
    </select>
    <label>Amount</label>
    <MoneyInput v-model:amount="amount" />
  </BasicForm>
</template>