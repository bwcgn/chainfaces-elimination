<template>
    <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <router-link class="nav-link" to="/">HOME</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/leaders">LEADERS</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/eliminated">ELIMATED</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/cowards">COWARDS</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/timemachine">TIME MACHINE</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/golf-score">GOLF SCORES</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/arena-score">ARENA SCORES</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/scar-supply">SCAR SUPPLY</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/symbols">SYMBOLS</router-link>
        </li>
    </ul>  
</template>

<script>
export default {
    name: 'Navigation'
}
</script>
