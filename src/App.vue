<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-2">
            <a class="navbar-brand" href="#">CFA Leaderboard</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" @click.stop="toggleNavbar()">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText" v-bind:class="{ 'show': show }">
                <Navigation />
            </div>
        </nav>

        <div class="container-fluid">
            <div class="row mt-4">
                <div class="col-12 col-xxl-10 overflow">
                    <router-view/>
                </div>
                <div class="col-xxl-2 d-none d-xxl-inline-block">
                    <figure>
                        <img src="@/assets/arena.gif" alt="arena gif by twitter.com/tyandrykowski" style="width:100%">
                        <figcaption class="text-end fs-6">by <a href="https://twitter.com/tyandrykowski" target="_blank">@tyandrykowski</a></figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Navigation from "./components/Navigation.vue"

export default {
    data() {
        return {
            show: false
        }
    },
    components: {
        Navigation
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