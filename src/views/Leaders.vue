<template>
    <div class="home">
        <h1>Leaders</h1>
        <table class="table">
            <thead>
            <tr>
                <th>Rank</th>
                <th scope="col">Original Owner</th>
                <th scope="col">Total Tokens</th>
                <th scope="col">Total Entered</th>
                <th scope="col">Withdrawn</th>
                <th scope="col">Dead</th>
                <th scope="col">Alive</th>
                <th scope="col">Chance Of Winning</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="v, i in getLeaderList" :key="v.owner">
                <td>{{ i + 1 }}</td>
                <td><a :href="getLink(v)" target="_blank">{{ v.owner }}</a></td>
                <td>{{ v.totalTokens }}</td>
                <td>{{ v.totalEntered }}</td>
                <td>{{ v.totalCowards }}</td>
                <td>{{ v.totalDeaths }}</td>
                <td>{{ v.totalAlive }}</td>
                <td>{{ v.percentageOfAlive }}</td>
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
    methods: {
        getLink(v) {
            return 'https://chainfacesarena.com/#/arena/'+v.owner;
        }
    },
    computed: {
        ...mapGetters([
            'getLeaderList'
        ])
    },
}
</script>
