<template>
    <div class="home">
        <h1>CHAINFACE TIME MACHINE</h1>
        <div class="row">
            <div class="col-1">Owner Address</div>
            <div class="col-2"><input type="text" class="input" v-model="address" /></div>
            <div class="col-2"><button class="btn btn-primary" @click="fetch">FIND WARRIORS</button></div>
        </div>
        <h2 class="lead">WARRIORS</h2>
        <div class="row">
            <div class="col-2 ma-2" :key="i" v-for="i in tokens">
                <div class="card card-border">
                    <div class="card-img-top" v-html="i"></div>
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
            contract : null,
            address: '',
            tokens: []
        }
    },
    methods: {
        async fetch() {
            this.tokens = [];

            // console.log(this.contract);

            let count = await this.contract.methods.balanceOf(this.address).call();
            // console.log(count);
            for (let i = 0; i<count; i++) {
                let tokenId = await this.contract.methods.tokenOfOwnerByIndex(this.address, i).call();
                console.log(tokenId);
            //
            //     let svg = await this.$store.dispatch('getSvg', parseInt(tokenId));
            //
                this.tokens.push(svg);
            }
        }
    },
    computed: {

    },
    async mounted() {
        this.contract = await this.$store.dispatch('getWeb3');
    }
}
</script>