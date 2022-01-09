<template>
    <div class="home">
        <h1>SCAR SUPPLY</h1>
        <div class="row">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<script>

import arenaScores from "../store/data/scarScores.json";
const scoreData = arenaScores.map((d) => [d.score, d.count]);
scoreData.splice(0, 1);

const labels = [];
const dataset = [];

for (let i in scoreData) {
    let v = scoreData[i];

    labels.push(v[0]);
    dataset.push(v[1]);
}

const data = {
    labels: labels,
    datasets: [{
        label: 'Scar Supply',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataset,
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};

export default {
    components: {},
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    async mounted() {
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

    }
}
</script>