<script setup>
  import { reactive, inject } from 'vue';
  import { useMemberStore } from '../stores';
  import LendrClient from '../api/lendr';
  import MemberOverview from '../components/MemberOverview.vue';
  import Record from '../components/Record.vue';
  
  /** @type {import('vue').Ref<boolean>} */
  const loading = inject('loading');

  const lendr = new LendrClient();
  const adminData = reactive({
    total: 0,
    interest: 0,
    borrowers: []
  });
  const store = useMemberStore();

  if (store.me.role == 'admin') {
    loading.value = true;
    loadAdminData().then(() => loading.value = false);
  }
  async function loadAdminData() {
    const borrowers = await lendr.getAllBorrowers();
    const { loans } = await (await lendr.get(`/member/all/loans`, { requireAuth: true })).json();

    for (let i = 0; i < borrowers.length; i++) {
      const b = borrowers[i];
      b.owe = 0;
      loans.filter(l => l.borrowers.includes(b._id)).forEach(l => {
        b.owe += l.total;
      });
    }

    adminData.borrowers = borrowers;
  }
</script>

<template>
  <div>
    <div v-if="store.me.role == 'admin'">
      <Record v-for="b in adminData.borrowers" :href="`/member/${b._id}`" :memo="b.username.charAt(0).toUpperCase() + b.username.slice(1)" :amount="b.owe" :date="b.role" />
    </div>
    <div v-else>
      <MemberOverview member-id="me" />
    </div>
  </div>
</template>