<template>
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <router-link class="nav-link" to="/">HOME</router-link>
    </li>

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
         aria-expanded="false">
        CHARTS
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><router-link class="dropdown-item" to="/symbols">SYMBOLS</router-link></li>
        <li><router-link class="dropdown-item" to="/scar-supply">SCAR SUPPLY</router-link></li>
        <li><router-link class="dropdown-item" to="/arena-score">ARENA SCORE</router-link></li>
        <li><router-link class="dropdown-item" to="/golf-score">GOLF SCORE</router-link></li>
      </ul>
    </li>

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
         aria-expanded="false">
        TOOLS
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><router-link class="dropdown-item" to="/bulk-upgrade">BULK UPGRADE</router-link></li>
        <li><router-link class="dropdown-item" to="/bulk-preview">BULK PREVIEW</router-link></li>
        <li><router-link class="dropdown-item" to="/timemachine">TIME MACHINE</router-link></li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>
