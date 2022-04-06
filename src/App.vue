<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">CFA Leaderboard</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" @click.stop="toggleNavbar()">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText" v-bind:class="{ 'show': show }">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">HOME</router-link>
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
                        <router-link class="nav-link" to="/symbols">SYMBOL RARITY</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid">
                <div class="row mt-4">
                    <div class="col-10">
                    <router-view/>
                    </div>
                    <div class="col-2 small_screen_hidden">
                        <div class="float_right">
                            <img src="@/assets/arena.gif" class="img" width="200px;">
                            <br>
                            by <a href="https://twitter.com/tyandrykowski" target="_blank">@tyandrykowski</a>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    data() {
        return {
            show: false
        }
    },
    computed: {
        ...mapGetters([
            'getBlockNumber'
        ])
    },
    async mounted() {
        await this.$store.dispatch('getWeb3');
    },
    methods: {
        toggleNavbar() {
            this.show = !this.show
        }
    }
}
</script>