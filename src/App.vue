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
                        <router-link to="/eliminated">ELIMINATED PLAYERS</router-link>
                    </div>
                    <div class="col-2">
                        <router-link to="/cowards">BIGGEST COWARD</router-link>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-6">
                    <router-view/>
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
    }
}
</script>