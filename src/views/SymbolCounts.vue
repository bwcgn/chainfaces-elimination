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
const scoreData = symbolCounts.map((d) => [d.score, d.count]);
scoreData.sort((a,b)=>a[1]-b[1]);
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
        label: 'Symbol Counts',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataset,
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                font: {
                    size: 14,
                }
            }
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