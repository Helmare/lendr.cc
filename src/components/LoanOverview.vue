<script setup>
  const props = defineProps(['total', 'interest'])
  
  const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];
  const nextMonthIndex = (new Date().getMonth() + 1) % 12;
  const nextMonthName = months[nextMonthIndex];

  function toUSD(value, includeChange) {
    const opts = {
      maximumFractionDigits: 0
    };
    if (includeChange) {
      opts.minimumFractionDigits = 2;
      opts.maximumFractionDigits = 2;
    }

    return `\$${(value || 0).toLocaleString('en-US', opts)}`
  }
</script>

<template>
  <div class="loan-overview">
    <p class="total">{{ toUSD(props.total) }}</p>
    <p class="next-interest">{{ nextMonthName }}'s Interest: {{ toUSD(props.interest, true) }}</p>
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
    font-size: 10em;
    font-weight: 600;
    color: var(--color-light);
  }
  .loan-overview .next-interest {
    font-size: 2em;
    opacity: 0.75;
    color: var(--color-light);
  }
</style>