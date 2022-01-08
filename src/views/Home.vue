<template>
    <div class="home">
        <h1>BIGGEST LOSERS</h1>
        <div class="col-10">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Dead Token Id</th>
                <th scope="col">Owner</th>
                <th>Owners Total Deaths</th>
                <th>Total Alive</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="v in deadTokens" :key="v.tokenId"
                :class="{'table-danger' : v.totalDeadTokens === v.totalTokens }">

                <td>{{ v.tokenId }}</td>
                <td>{{ v.owner }}
                    <span v-if="v.totalDeadTokens === v.totalTokens">💀</span>
                </td>
                <td>{{ v.totalDeadTokens }}</td>
                <td>{{ v.totalTokens }}</td>
            </tr>
            </tbody>
        </table>
        </div>
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
