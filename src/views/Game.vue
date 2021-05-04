

<template>
  <div class="game">
    <h3 v-if="user.monsters_defeated < 5"> You awaken out of a deep slumber under an old creaky oak tree in a dense forest. You rememember that your name is <span style="color: lawngreen">{{ user.name }}</span>.. It is dark and the air feels cool. Up ahead, you hear the crunch of branches under footsteps getting closer and closer.... </h3>
    <h3 v-else-if="user.monsters_defeated === 5">You have vanquished {{ user.monsters_defeated }} monsters too many. You grow weary from the metaphorically countless battles, the battles counted by user.monsters_defeated in your activeRecord model tsk tsk.... You lay down your invisible weapon that I never coded in and begin to sleep</h3>
    <p style="font-size: 11px;"> Room ID: {{ room.current_room }} </p>
 <!-- if monster is in room hide... then, if monster is attacked , show -->
    <div>
    <!-- moveForward notes -->
    <button id= "move-forward" v-if="toggleMoveForward === true" v-on:click="moveForward">Move Forward</button>
    <button v-on:click="endGame" id= "end-game" v-if="toggleEndGame === true">Catch your breath and take a look around...</button>
    <!-- loot rendering  -->
    <div style="margin-bottom: 50px;" v-if = "toggleLoot === true">
    <h4 style="color: lawngreen"><i>{{ lootFound }}</i></h4>
    <p style="color: darkgreen; ">{{ lootDescription}} </p>

    <button v-if="toggleInventoryMessage === false" v-on:click="addToInventory">Add To Inventory</button>
  
    <p style = "font-size: 12px;"v-else-if="toggleInventoryMessage === true ">Added the <span style="color: lawngreen;">{{ loot.name }}</span> to inventory!</p>
    </div>
    <!-- monster conditionals -->
    <div v-if="room.has_monster === true "> 
      <p>You have encountered <span style="color: rgb(224, 150, 255);">{{ monster.name }} </span></p>
      <br>
      <img   alt="Monster" src="../assets/skeleton_creep.gif" style="height:85px; margin: 20px auto 20px auto">
      <img v-else-if="monster.is_dead === true"
      <br>
       <span style="color: pink">{{ monsterMessage }}</span>
       <br> 
    </br>
      <button class = "story-button" v-on:click="battle">Attack</button>
      <button class = "story-button" v-on:click="userRun">Run</button><br>
    </div>
    
    <p v-else-if="room.has_monster === false"> {{ monsterMessage }}.</p>
    <!-- <p v-if="attacked === true "> </p> -->
    <p v-else-if="run === true"> </p>
    <!--  dynamic game message based off user attack/escape -->
      <div>
      <p v-if="attacked === true">You dealt <span style = "color: red;"> {{attack_damage}}</span> damage, and {{monster.name }} dealt <span style = "color: red;"> {{monster_attack_damage}}</span> damage </p>


       <div style ="border: 2px solid black;" id="user-stats">
        <p> HP: {{user.base_health}} , Attack Damage: {{ user.base_attack}}</p>  
        <p> Monsters Defeated: {{ user.monsters_defeated }}</p>
       </div>
      </div>
      </div>
  </div>

      </template>
      
      <script>
export default {};
</script>
      
      <style>
</style>
      </template>
      
      <script>
export default {};
</script>
      
      <style>
</style>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      introMessage: "",
      gameId: localStorage.getItem("gameId"),
      user: "",
      monster: "",
      room: "",
      attacked: false,
      attack_damage: "",
      monster_attack_damage: "",
      toggleMoveForward: true,
      run: false,
      hasEscaped: "",
      lootFound: "",
      lootDescription: "",
      catchPhrase: "",
      monsterMessage: "",
      toggleLoot: false,
      loot: "",
      toggleInventoryMessage: false,
      is_boss: "",
      toggleEndGame: false,
      userHealth: "",
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/api/games/${this.gameId}`).then((response) => {
      console.log(response.data);
      this.user = response.data.user;
      // this.userHealth = response.data.user.base_health;
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
        this.hasEscaped = response.data.has_escaped;
        this.toggleLoot = false;
        this.toggleInventoryMessage = false;
        this.user.base_health = response.data.user.base_health;

        // monster conditionals
        if (response.data.room.has_monster === true) {
          this.toggleMoveForward = !this.toggleMoveForward;
          this.monsterMessage = response.data.monster.catch_phrase;
        } else if (response.data.room.has_monster === false) {
          this.monsterMessage = "No monsters here";
        }
        // loot notes start here
        if (response.data.room.has_loot === true) {
          this.loot = response.data.loot;
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
    battle: function () {
      // axios request that the user is attacking to back-end
      axios.patch(`http://localhost:3000/api/monsters/${this.monster.id}`).then((response) => {
        console.log(response.data.monster.is_dead);
        console.log(response.data);
        this.attack_damage = response.data.attack_damage;
        this.monster_attack_damage = response.data.monster_attack_damage;
        this.monster.attack_damage = response.data.monster_attack_damage;
        this.user = response.data.user;

        if (response.data.monster.is_boss === true && response.data.monster.is_dead === true) {
          this.toggleMoveForward == false;
          this.attacked = false;
          this.room.has_monster = false;
          this.monsterMessage = `You Have defeated the mighty and evil ${this.monster.name}`;
          this.attacked = false;
          this.toggeLoot = false;
          // show end game button
          this.toggleEndGame = true;
        }
        //
        else if (response.data.monster.is_dead === true) {
          this.toggleMoveForward = !this.toggleMoveForward;
          this.attacked = false;
          this.room.has_monster = false;
          this.monsterMessage = `You vanquished ${this.monster.name}`;
          this.toggleLoot = true;
          this.user.monsters_defeated = response.data.monsters_defeated;
        } else if (response.data.user_health <= 0) {
          // this.$router.push("/youLost");
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
          this.monsterMessage = `you have escaped!`;
          //  when user escapes , hide the monster
          this.room.has_monster = false;
          this.toggleLoot = false;
        } else if (response.data.has_escaped === false) this.monsterMessage = "you cannot escape!";
      });
    },
    addToInventory: function () {
      var params = {
        user_id: this.user.id,
        loot_id: this.loot.id,
        quantity: 1,
      };

      axios.post("http://localhost:3000/api/user_loots", params).then((response) => {
        console.log(response.data);
        this.toggleInventoryMessage = true;
      });
    },
    endGame: function () {
      this.$router.push("/endGame");
    },
  },
};
</script>

