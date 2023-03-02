<script setup>
  import { ref, provide, reactive } from 'vue';
  import { useRouter, RouterLink, RouterView } from 'vue-router'
  import LendrClient from './api/lendr';

  const router = useRouter();

  const loading = ref(false);
  provide('loading', loading);

  const lendr = reactive(new LendrClient());
  provide('lendrClient', lendr);

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
    <span class="logo">lendr.cc</span>
    <button class="right" v-show="lendr.loginId != undefined" @click="logout">Logout</button>
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
  nav a:hover {
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