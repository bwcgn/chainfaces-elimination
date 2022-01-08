<template>
    <div id="app">
        <h1>CHAIN FACE LEADERBOARD by @geggleto</h1>
        <h3>FROM BLOCK {{ getBlockNumber }}</h3>
        <div class="container-fluid">

                <div class="row">
                    <div class="col-2">
                        <router-link to="/">HOME</router-link>
                    </div>
                    <div class="col-2">
                        <router-link to="/leaders">LEADERS</router-link>
                    </div>
                    <div class="col-2">
                        <router-link to="/eliminated">ELIMINATED PLAYERS</router-link>
                    </div>
                    <div class="col-2">
                        <router-link to="/cowards">BIGGEST COWARD</router-link>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-8">
                    <router-view/>
                    </div>
                    <div class="col-4">
                        <img src="@/assets/arena.gif" class="img">
                        by <a href="https://twitter.com/tyandrykowski" target="_blank">@tyandrykowski</a>
                    </div>
                </div>
                
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'getBlockNumber'
        ])
    },
    async mounted() {
        await this.$store.dispatch('getWeb3');
    }
}
</script>