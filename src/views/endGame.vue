
<template>
  <div class="home">
 <p>From all that boss fighting your socks sure are sweaty!</p>
<img src= "../assets/sock.jpeg" style="width: 50%;">

<div id="hide-this" style="display:none">
 <audio autoplay="true" src="../assets/free_bird.mp3"></audio>
</div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      userName: "",
      message: "",
    };
  },
  created: function () {},
  methods: {},
};
</script>

