<script setup>
  import MemberOverview from '../../components/MemberOverview.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
</script>

<template>
  <div>
    <MemberOverview admin :member-id="route.params.id" />
  </div>
</template>