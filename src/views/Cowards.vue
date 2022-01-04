<template>
    <div class="home">
        <h1>BIGGEST COWARD</h1>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Original Owner</th>
                <th scope="col">(COWARD COUNT / TOTAL)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="v in getCowardList" :key="v.owner">

                <td>{{ v.owner }}</td>
                <td>{{ v.totalCowards }} / {{ v.totalTokens }}</td>
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
            'getCowardList',
        ])
    },
}
</script>
