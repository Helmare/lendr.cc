import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', () => {
  const me = ref({
    _id: '', name: '', role: ''
  });

  return { me };
});