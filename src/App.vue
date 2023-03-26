<script setup>
  import { ref, provide } from 'vue';
  import { useRouter, RouterView } from 'vue-router';
  import { useMemberStore } from './stores';
  import LendrClient from './api/lendr';

  // Setup global variables.
  const loading = ref(false);
  provide('loading', loading);
  
  const store = useMemberStore();
  const lendr = new LendrClient();
  const router = useRouter();

  /**
   * Logs out on Logout click.
   */
  async function logout() {
    loading.value = true;
    await lendr.logout();
    await router.push('/login');
    loading.value = false;
  }
</script>

<template>
  <nav>
    <a class="logo" href="/">lendr.cc</a>
    <button class="right" v-show="store.me" @click="logout">Logout</button>
  </nav>
  <div v-show="loading" class="loading"></div>
  <RouterView />
</template>

<style>
  nav {
    background-color: var(--color-dark);
    height: 5em;
  }

  nav a, nav span {
    display: inline-block;
    font-size: 2em;
    line-height: 2.5em;
    padding: 0em 1em;
    transition: background-color 150ms;

    color: var(--color-light);
    text-decoration: none;
  }
  nav a:not(.logo):hover {
    background-color: var(--color-dark-soft);
  }

  nav button {
    font-size: 2em;
    line-height: 2.5em;
    padding: 0em 1em;
    border-radius: 0;
  }

  .logo {
    font-weight: bold;
  }
  .right {
    float: right;
  }

  .loading {
    position: absolute;
    width: 0%;
    background: linear-gradient(to left, var(--color-primary), var(--color-danger));
    height: 0.8em;
    left: 0px;
    z-index: 100;

    animation-name: loading;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }
  @keyframes loading {
    0% { left: 0; width: 0% }
    50% { left: 0; width: 100% }
    100% { left: 100%; width: 0% }
  }
</style>