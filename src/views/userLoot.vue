
<template>
  <div class="userLoot">
  <button v-on:click="backToGame" style="margin-bottom: 10px;"> Back To Game </button>
  <br>
 <div style = "border: 2px solid lightgrey; width: 50%; margin: auto;
 padding: 10px;" v-for="loot in loots">
  Name: {{ loot.name }} 
  <br>
  Description:  {{ loot.description }}
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
      loots: "",
    };
  },
  created: function () {
    axios.get("http://localhost:3000/api/users/352/loots").then((response) => {
      console.log(response.data);
      this.loots = response.data;
    });
  },
  methods: {
    backToGame: function () {
      this.$router.push("/game");
    },
  },
};
</script>

