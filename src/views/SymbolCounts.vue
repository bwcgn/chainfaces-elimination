<template>
    <div class="home">
        <h1>Symbol Counts</h1>
        <div class="row">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<script>

import symbolCounts from "../store/data/symbolCounts.json";
import symbolCountsDead from "../store/data/symbolCountsDead.json";

const scoreData = symbolCounts.map((d) => [d.score, d.count]);
scoreData.sort((a,b)=>a[1]-b[1]);
const scoreDataDead = symbolCountsDead.map((d) => [d.score, d.count]);
scoreDataDead.sort((a,b)=>a[1]-b[1]);
const labels = [];
const dataset = [];

for (let i in scoreData) {
    let v = scoreData[i];

    labels.push(v[0]);
    dataset.push(v[1]);
}

const labelsDead = [];
const datasetDead = [];

for (let i in scoreDataDead) {
    let v = scoreDataDead[i];

    labelsDead.push(v[0]);
    datasetDead.push(v[1]);
}

const data = {
    labels: labels,
    datasets: [{
        label: 'Alive',
        backgroundColor: 'rgb(25, 150, 25)',
        borderColor: 'rgb(25, 255, 25)',
        data: dataset,
    },{
        label: 'Dead',
        backgroundColor: 'rgb(255, 25, 25)',
        borderColor: 'rgb(255, 25, 25)',
        data: datasetDead,
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            x: {
                stacked: true,
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    font: {
                        size: 14,
                    }
                }
            },
            y: {
                stacked: true,
            }
        }
    }
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