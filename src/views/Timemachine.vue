<template>
    <div class="home">
        <h1>CHAINFACE TIME MACHINE</h1>
        <div class="row">
            <div class="col-1">Token ID</div>
            <div class="col-2"><input type="text" class="input" v-model="tokenId" /></div>
            <div class="col-2"><button class="btn btn-primary" @click="fetch">TIME-MACHINE</button></div>
        </div>
        <div class="row">
            <div class="col-6" v-html="svg"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tokenId: null,
            svg: null,
            contract: null
        }
    },
    methods: {
        async fetch() {
            this.svg = await this.$store.dispatch("getSvg", this.tokenId);
        }
    },
    async mounted() {
        this.contract = await this.$store.dispatch('getWeb3');
    }
}
</script>