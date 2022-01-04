<template>
    <div class="home">
        <div v-if="loading"><h1>LOADING</h1></div>
        <h1>RIP TOKENS</h1>
        <table class="table" v-if="!loading">
            <thead>
            <tr>
                <th scope="col">#</th>
                <td>Image</td>
                <th scope="col">Original Owner</th>
                <th scope="col">Token Id</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v, i) in memorial" :key="i"
                :class="{'table-danger' : getOwned(v.owner) === getDeath(v.owner) }">
                <td>{{ i + 1 }}</td>
                <td></td>
                <td>{{ v.tokenId }}</td>
                <td>{{ v.owner }} ({{ getDeath(v.owner) }} / {{ getOwned(v.owner) }}) <span
                    v-if="getOwned(v.owner) === getDeath(v.owner)">💀</span></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import web3 from '@/Web3.mjs'
import Contract from '@/Contract';

export default {
    name: 'Home',
    data() {
        return {
            account: null,
            loading: true,
            ownerDb: {},
            memorial: {},
            eliminated: [],
        }
    },
    methods: {
        getOwned(addr) {
            return Contract.OwnerCount[addr];
        },
        getDeath(addr) {
            return Contract.DeathCount[addr];
        },
        async myRender(token) {
            return '';
        }
    },
    components: {},
    async mounted() {
        Object.assign({}, this.memorial);
        let accounts = await web3.eth.getAccounts();
        this.account = accounts[0];
        this.loading = await Contract.getTokenHolders();
        this.memorial = await Contract.getMemorial();
        this.eliminated = Contract.Eliminated;
    }
}
</script>
