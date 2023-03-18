<script setup>
  import { ref, watch } from 'vue';
  const props = defineProps(['action', 'disabled']);
  /** @type {import('vue').Ref<HTMLFormElement>} */
  const form = ref();

  watch(props, (target) => {
    if (!form.value) return;
    form.value.querySelectorAll('input').forEach(e => {
      e.disabled = target.disabled;
    });
  });
</script>

<template>
  <div class="center">
    <form ref="form" class="basic">
      <slot></slot>
      <br>
      <input type="submit" class="primary" :value="props.action">
    </form>
  </div>
</template>

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 5em);
  }
  form.basic {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-auto-rows: 3em;
    row-gap: 1em;
    column-gap: 1em;

    width: 100%;
    padding: 2em;

    font-size: 2em;
  }
  form.basic label {
    text-align: right;
    line-height: 3em;
  }
  form.basic span, form.basic div {
    grid-column: 2;
    line-height: 3em;
  }

  @media only screen and (max-width: 768px) {
    form.basic {
      grid-template-columns: 1fr;
      row-gap: 0em;
    }
    form.basic label {
      text-align: left;
    }
    form.basic span, form.basic div {
      grid-column: unset;
    }
  }
</style>