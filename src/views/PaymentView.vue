<script setup>
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import LendrClient from '../api/lendr';
  import BasicForm from '../components/BasicForm.vue';

  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');

  const lendr = new LendrClient();
  const router = useRouter();

  const disabled = ref(false);
  const error = ref(false);
  const amount = ref('');

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

  async function postPayment() {
    disabled.value = true;
    console.log('POST PAYMENT!');
    disabled.value = false;
  }
</script>

<template>
  <BasicForm action="Post" :disabled="loading" @submit.prevent="postPayment">
    <span v-show="error" style="color: red">{{ error }}</span>
    <label>Borrower</label>
    <select>
      <option v-for="b in borrowers" :value="b._id">{{ b.username }}</option>
    </select>
    <label>Amount</label>
    <input v-model="password" type="password" placeholder="1234" />
  </BasicForm>
</template>