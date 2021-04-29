<template>
  <div id="app">
  				Nav
					<nav id="nav">
						<ul>
							<li><a href="Home" class="active">Home</a></li>
							<li><a href="Game">Game</a></li>
						</ul>
					</nav>

				<!-- Header -->
      <!-- could put user stats in here -->

    <router-view/>
    					<footer id="footer">
						<section>
							<h2>this is the footer</h2>
							<p>Ask me why I made this app: mvello66@gmail.com</p>
						</section>
              </footer>

    
  </div>


</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 30px;
  margin-bottom: 50px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
