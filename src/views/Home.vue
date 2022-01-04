<template>
    <div class="home">
        <h1>BIGGEST LOSERS</h1>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Token Id</th>
                <th scope="col">Original Owner</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="v in deadTokens" :key="v.tokenId"
                :class="{'table-danger' : v.totalDeadTokens === v.totalTokens }">

                <td>{{ v.tokenId }}</td>
                <td>{{ v.owner }} ({{ v.totalDeadTokens }} / {{ v.totalTokens }}) <span
                    v-if="v.totalDeadTokens === v.totalTokens">💀</span></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapGetters} from "vuex";


export default {
    name: 'Home',
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'owners',
            'deadTokens',
            'totalDeathsByAddress',
            'totalTokensByAddress'
        ])
    },
}
</script>
