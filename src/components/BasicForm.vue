<script setup>
  const props = defineProps(['action']);
</script>

<template>
  <div class="center">
    <form class="basic">
      <slot></slot>
      <br>
      <input type="submit" :value="props.action">
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
  form.basic input {
    outline: none;
    border-radius: 0;
    border: 1px solid black;
    padding: 0.5em;
  }
  form.basic input[type="submit"] {
    background-color: black;
    transition: background-color 150ms;
    color: white;
    border: none;
  }
  form.basic input[type="submit"]:hover {
    background-color: #333;
  }

  @media only screen and (max-width: 768px) {
    form.basic {
      grid-template-columns: 1fr;
      row-gap: 0em;
    }
    form.basic label {
      text-align: left;
    }
  }
</style>