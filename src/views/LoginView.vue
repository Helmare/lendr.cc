<script setup>
  function login(e) {
    console.log('HI!');
  }
</script>

<template>
  <div class="center-container">
    <form class="login">
      <label>Username</label>
      <input id="username" type="text" placeholder="bob" />
      <label>Password</label>
      <input id="password" type="password" placeholder="1234" />
      <div></div><input type="submit" value="Login" @click.prevent="login"/>
    </form>
  </div>
</template>

<style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 5em);
  }
  .login {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: repeat(2, 3em);
    row-gap: 1em;
    column-gap: 1em;

    width: 100%;
    padding: 2em;

    font-size: 2em;
  }
  .login label {
    line-height: 3em;
  }
  .login input {
    outline: none;
    border-radius: 0;
    border: 1px solid black;
    padding: 0.5em;
  }
  .login input[type="submit"] {
    background-color: black;
    transition: background-color 150ms;
    color: white;
    border: none;
  }
  .login input[type="submit"]:hover {
    background-color: #333;
  }

  @media only screen and (max-width: 768px) {
    .login {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, 3em);
      row-gap: 0em;
    }
  }
</style>