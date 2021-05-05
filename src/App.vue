<template>
  <div id="app">
				<!-- Nav -->
					<nav id="nav">
						<ul>
							<li><a href="http://localhost:8080" class="active">Home</a></li>

						</ul>
					</nav>

				<!-- Header -->
      <!-- could put user stats in here -->

    <router-view/>
    <hr>
    					<!-- <footer id="footer" >
						<section style= "margin: auto; text-align: center;">
							<p>Contact Me:  mvello66@gmail.com</p>
						</section>
              </footer> -->

    
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
