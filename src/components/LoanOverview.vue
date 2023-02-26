<script setup>
  const props = defineProps(['total', 'interest'])

  function toUSD(value) {
    return (value || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
</script>

<template>
  <div class="loan-overview">
    <p class="total">{{ toUSD(props.total) }}</p>
    <p class="next-interest">Upcoming Interest: {{ toUSD(props.interest) }}</p>
  </div>
</template>

<style>
  .loan-overview {
    width: 100%;
    height: 60vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loan-overview .total {
    font-size: 11em;
    font-weight: 600;
    color: #C68;
  }
  .loan-overview .next-interest {
    font-size: 2em;
    opacity: 0.5;
  }
</style>