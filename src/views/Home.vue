<template>
    <div class="home">
        <h1>RIP TOKENS</h1>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Token Id</th>
                <th scope="col">Original Owner</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(v, i) in deadTokens" :key="i"
                :class="{'table-danger' : totalTokensByAddress(v) === totalDeathsByAddress(v) }">

                <td>{{ i }}</td>
                <td>{{ v }} ({{ totalDeathsByAddress(v) }} / {{ totalTokensByAddress(v) }}) <span
                    v-if="totalDeathsByAddress(v) === totalDeathsByAddress(v)">💀</span></td>
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
