<template>
    <div class="about">
            <h1>Eliminated Players</h1>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Owner</th>
                    <th scope="col">Token Count</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(v, i) in eliminated" :key="i">
                    <td>{{ v }}</td>
                    <td>{{ getOwned(v) }}</td>
                </tr>
                </tbody>
            </table>
        </div>
</template>

<script>
import Contract from "@/Contract";
import web3 from "@/Web3.mjs";

export default {
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
