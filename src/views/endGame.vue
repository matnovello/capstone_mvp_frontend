
<template>
  <div class="home">
 <p>From all that boss fighting your socks sure are sweaty!</p>
<img src= "../assets/sock.jpeg" style="width: 50%;">

<div id="hide-this" style="display:none">
</div>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/FO3tpxxdzko?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

