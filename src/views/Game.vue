

<template>
  <div class="home">
    <h1>{{ message }} {{ user }} </h1>
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
      message: "Welcome to the game, ",
      gameId: localStorage.getItem("gameId"),
      test: "",
      user: "",
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/api/games/${this.gameId}`).then((response) => {
      console.log(response.data);
      this.user = response.data.user.name;
    });
  },
  methods: {
    moveForward: function () {
      axios.patch(`http://localhost:3000/api/games/${localStorage.getItem("gameId")}`).then((response) => {
        this.gameId = response.data.gameId;
        console.log(response.data.current_room);
        this.message = "you move forward into the next room..";
      });
       HEY. you should focus on the back end,, focus on creating the monster model and attaching it to the rooms at random !
    },
  },
};
</script>

