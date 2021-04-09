

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    {{ test }}
    <button v-on:click="moveForward">Move Forward</button>
    
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "You are in the woods",
      gameId: localStorage.getItem("gameId"),
      test: "",
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/api/games/${this.gameId}`).then((response) => {
      console.log(response.data);
    });
  },
  methods: {
    moveForward: function () {
      axios.patch(`http://localhost:3000/api/games/${localStorage.getItem("gameId")}`).then((response) => {
        this.gameId = response.data.gameId;
      });
    },
  },
};
</script>

