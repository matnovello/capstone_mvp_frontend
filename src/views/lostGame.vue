
<template>
  <div class="lostGame">
 <p>It's alright, We didnt expect you to win anyways. This game is literally a dice roll</p>
<img src= "../assets/sock.jpeg" style="width: 50%;">
<br>
<i>congratulations, you lost </i>
<br>
<br>
<button v-on:click="sendHome">Go Home and Cry</button>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      userName: "",
      message: "",
    };
  },
  created: function () {},
  methods: {
    sendHome: function () {
      this.$router.push("/");
    },
  },
};
</script>

