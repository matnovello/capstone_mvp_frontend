

<template>
  <div class="game">
    <h3>{{ message }} {{ user.name }} </h3>
    <p> {{ room.current_room }} </p>
 <!-- if monster is in room hide... then, if monster is attacked , show -->
    <button v-if="toggleMoveForward === true" v-on:click="moveForward">Move Forward</button>
    <div style="margin-bottom: 50px;" v-if = "toggleLoot === true">
    <h4 style="color: lawngreen"><i>{{ lootFound }}</i></h4>
    <p style="color: darkgreen; ">{{ lootDescription}}</p>
    </div>
    <p v-if="room.has_monster === true "> 
      You have encountered <span style="color: orange;">{{ monster.name }}</span><br>
      <img alt="Vue logo" src="../assets/skeleton_creep.gif" style="height:85px;">
      <br>
       <span style="color: pink">{{ monster.catch_phrase}}</span>
       <br> 
    </br>
      <button v-on:click="userAttack">Attack</button>
      <button v-on:click="userRun">Run</button><br>
    </p>
    
    <p v-else-if="room.has_monster === false"> {{ monsterMessage }}.</p>
    <!-- <p v-if="attacked === true "> </p> -->
    <p v-else-if="run === true"> </p>
    <!--  dynamic game message based off user attack/escape -->
      <div>
      <p v-if="attacked === true">You dealt <span style = "color: red;"> {{attack_damage}}</span> damage</p>
      {{ deadMessage }}

      <!-- <div style ="border: 2px solid black;" id="userStats" v-for = "(statValue, stat) in user">
      
        <p> {{ stat }}: {{ statValue}} </p> -->
       
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
      message: "You awaken out of a deep slumber, ",
      gameId: localStorage.getItem("gameId"),
      test: "",
      user: "",
      monster: "",
      room: "",
      gameMessage: "",
      attacked: false,
      attack_damage: "",
      deadMessage: "",
      toggleMoveForward: true,
      run: false,
      hasEscaped: "",
      lootFound: "",
      lootDescription: "",
      catchPhrase: "",
      loot: "",
      monsterMessage: "",
      toggleLoot: false,
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/api/games/${this.gameId}`).then((response) => {
      console.log(response.data);
      this.user = response.data.user;
      this.monster = response.data.monster;
    });
  },
  methods: {
    moveForward: function () {
      axios.patch(`http://localhost:3000/api/games/${localStorage.getItem("gameId")}`).then((response) => {
        this.gameId = response.data.gameId;
        console.log(response.data.room.current_room);
        console.log(response.data);
        this.room = response.data.room;
        this.monster = response.data.monster;
        this.attacked = false;
        this.run = false;
        this.gameMessage = "";

        if (response.data.room.has_monster === true) {
          this.toggleMoveForward = !this.toggleMoveForward;
        } else if (response.data.room.has_monster === false) {
          this.monsterMessage = "No monsters here";
        }
        // loot notes start here
        if (response.data.room.has_loot === true) {
          this.lootFound = `This room contains a ${response.data.loot.name}`;
          this.lootDescription = response.data.loot.description;
          // this.loot = response.data.loot;
        } else {
          this.lootFound = "No loot here";
          this.lootDescription = "";
        }
        // loot notes end here
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
        this.attack_damage = response.data.attack_damage;
        if (response.data.monster.is_dead === true) {
          this.toggleMoveForward = !this.toggleMoveForward;
          this.attacked = false;
          this.room.has_monster = false;
          this.monsterMessage = `You vanquished ${this.monster.name}`;
          this.toggleLoot = true;
        }
      }),
        (this.attacked = true);
      // toggle moveForward button
    },
    userRun: function () {
      axios.get(`http://localhost:3000/api/rooms/${this.room.current_room}`).then((response) => {
        console.log(response.data);
        if (response.data.has_escaped === true) {
          // toggle moveForward button
          this.toggleMoveForward = true;
          this.gameMessage = `you have escaped!`;
          //  when user escapes , hide the monster
          this.room.has_monster = false;
        }
      });
    },
  },
};
</script>

