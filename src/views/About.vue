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
                <tr v-for="v in findAllDeadPlayers" :key="v.address">
                    <td>{{ v.address }}</td>
                    <td>{{ v.count }}</td>
                </tr>
                </tbody>
            </table>
        </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'owners',
            'deadTokens',
            'totalDeathsByAddress',
            'totalTokensByAddress',
            'getOwnerOfToken',
            'findAllDeadPlayers'
        ])
    },
}
</script>
