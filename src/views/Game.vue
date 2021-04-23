

<template>
  <div class="home">
    <h1>{{ message }} {{ user }} </h1>
    <p> You are in room {{ room.current_room }} </p>

    <button v-on:click="moveForward">Move Forward</button>
    <p v-if="room.has_monster === true "> 
      oh no , a {{ monster.name }}
    </br>
      <button v-on:click="userAttack">Attack</button>
      <button v-on:click="userRun">Run</button><br>
    </p>
    <p v-else-if="room.has_monster === false"> No monsters here....</p>
    <p v-if="attacked === true "> </p>
    <p v-else-if="run === true"> </p>
      {{ gameMessage }}

    
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
      monster: "",
      room: "",
      gameMessage: "",
      attacked: false,
      run: false,
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/api/games/${this.gameId}`).then((response) => {
      console.log(response.data);
      this.user = response.data.user.name;
      this.monster = response.data.monster;
    });
  },
  methods: {
    moveForward: function () {
      axios.patch(`http://localhost:3000/api/games/${localStorage.getItem("gameId")}`).then((response) => {
        this.gameId = response.data.gameId;
        console.log(response.data.room.current_room);
        console.log(response.data);
        this.message = "you move forward into the next room..";
        this.room = response.data.room;
        this.monster = response.data.monster;
        this.attacked = false;
        this.run = false;
        this.gameMessage = "";
      });
    },
    userRun: function () {
      // axios request that the user is running to back-end
      (this.run = true), (this.gameMessage = "you run away!");
    },
    userAttack: function () {
      // axios request that the user is attacking to back-end
      (this.attacked = true), (this.gameMessage = `you vanquish the ${this.monster.name}`);
    },
  },
};
</script>

