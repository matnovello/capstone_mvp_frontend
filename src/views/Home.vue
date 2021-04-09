

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    
    
    <input type = text v-model="userName" placeholder="enter username">
    <button v-on:click="newGame">start new game</button> 
    {{ message }}
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
  methods: {
    newGame: function () {
      var params = {
        user_name: this.userName,
      };
      axios.post("http://localhost:3000/api/games", params).then((response) => {
        console.log(response.data);
        localStorage.setItem("gameId", response.data.game_id);
        this.$router.push("/game");

        console.log(localStorage.getItem("gameId"));
      });
    },
  },
};
</script>

