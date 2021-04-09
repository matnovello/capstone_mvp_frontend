

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    {{ gameId }}
    
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
    };
  },
  created: function () {
    // var params = {
    //   gameId,
    // };
    // axios.get("http://localhost:3000/api/games/" + gameId).then((response) => {
    //   console.log(response.data);
    // });
  },
  methods: {},
};
</script>

