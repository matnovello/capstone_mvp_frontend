

<template>
  <div class="home">
    <h1>{{ message }} {{ user }} </h1>
    <p> You are in room {{ room.current_room }} </p>
 <!-- if monster is in room hide... then, if monster is attacked , show -->
    <button v-if="toggleMoveForward === true" v-on:click="moveForward">Move Forward</button>
    <div>
    {{ lootMessage }}
    </div>
    <p v-if="room.has_monster === true "> 
      oh no , a {{ monster.name }}<br>
      <img alt="Vue logo" src="../assets/skeleton_creep.gif">
      <br>
       {{ monster.catch_phrase}}
       <br> 
    </br>
      <button v-on:click="userAttack">Attack</button>
      <button v-on:click="userRun">Run</button><br>
    </p>
 
    <p v-else-if="room.has_monster === false"> No monsters here....</p>
    <p v-if="attacked === true "> </p>
    <p v-else-if="run === true"> </p>
    <!--  dynamic game message based off user attack/escape -->
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
      toggleMoveForward: true,
      run: false,
      hasEscaped: "",
      lootMessage: "",
      catchPhrase: "",
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

        if (response.data.room.has_monster === true) {
          this.toggleMoveForward = !this.toggleMoveForward;
        }
        if (response.data.room.has_loot === true) {
          this.lootMessage = "This room contains Loot";
        } else {
          this.lootMessage = "No loot here";
        }
      });
    },
    userRun: function () {
      // axios request that the user is running to back-end
      (this.run = true), (this.gameMessage = "you run away!");
    },
    userAttack: function () {
      // axios request that the user is attacking to back-end
      axios.patch(`http://localhost:3000/api/monsters/${this.monster.id}`).then((response) => {
        console.log(response.data.monster.is_dead);
        console.log(response.data);
      }),
        (this.attacked = true),
        (this.gameMessage = `you vanquish the ${this.monster.name}`);
      // toggle moveForward button
      this.toggleMoveForward = !this.toggleMoveForward;
    },
    userRun: function () {
      axios.get(`http://localhost:3000/api/rooms/${this.room.current_room}`).then((response) => {
        console.log(response.data);
        if (response.data.has_escaped === true) {
          // toggle moveForward button
          this.toggleMoveForward = !this.toggleMoveForward;
          this.gameMessage = `you have escaped!`;
          //  when user escapes , hide the monster
          this.room.has_monster = false;
        }
      });
    },
  },
};
</script>

