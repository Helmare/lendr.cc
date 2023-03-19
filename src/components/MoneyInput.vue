<script setup>
  const props = defineProps({
    amount: Number
  });
  const emit = defineEmits(['update:amount']);

  /**
   * @param {InputEvent} e
   */
  function onInput(e) {
    const val = e.target.value;

    // Check for negative.
    const match = val.match(/-/g);
    let mod = match ? (match.length % 2 ? -1 : 1) : 1;

    // Undo and redo formatting.
    let a = val.replace(/\D/g,'');
    let amount = a ? parseInt(a) / 100 : 0;
    if (amount >= 1000000) {
      amount = 999999.99;
    }
    amount *= mod;

    e.target.value = toUSD(amount, true);
    emit('update:amount', amount);
  };
  /**
   * @param {Number} value 
   * @param {Boolean} includeChange 
   */
  function toUSD(value, includeChange) {
    const opts = {};
    if (includeChange) {
      opts.minimumFractionDigits = 2;
      opts.maximumFractionDigits = 2;
    }

    return `\$${(value || 0).toLocaleString('en-US', opts)}`
  }
</script>

<template>
  <input type="text" value="$0.00" @input="onInput">
</template>