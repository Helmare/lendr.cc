<script setup>
  import { provide, reactive } from 'vue';
  import { useRouter, RouterLink, RouterView } from 'vue-router'
  import LendrClient from './api/lendr';

  const router = useRouter();

  const lendr = reactive(new LendrClient());
  provide('lendrClient', lendr);

  /**
   * Logs out on Logout click.
   */
  async function logout() {
    await lendr.logout();
    router.push('/login');
  }
</script>

<template>
  <nav>
    <span class="logo">lender.cc</span>
    <button class="right" v-show="lendr.loginId != undefined" @click="logout">Logout</button>
  </nav>
  <RouterView />
</template>

<style>
  nav {
    background-color: black;
    height: 5em;
  }

  nav a, nav span, nav button {
    display: inline-block;
    font-size: 2em;
    line-height: 2.5em;
    padding: 0em 1em;

    font-family: inherit;

    color: white;
    border: none;
    outline: none;
    background: none;
    text-decoration: none;
  }
  nav a:hover, nav button:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  .logo {
    font-weight: bold;
  }
  .right {
    float: right;
  }
</style>