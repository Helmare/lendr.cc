<template>
  <div class="loan-overview">
    <p class="total">$1,770</p>
    <p class="next-interest">Upcoming Interest: $0.00</p>
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