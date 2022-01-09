<template>
    <div class="home">
        <h1>GOLF SCORES</h1>
        <div class="row">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<script>
const scoreData = [
    [0,10],
    [16,1],
    [18,2],
    [19,3],
    [21,3],
    [22,6],
    [23,3],
    [24,4],
    [25,8],
    [26,7],
    [27,11],
    [28,18],
    [29,25],
    [30,40],
    [31,36],
    [32,43],
    [33,63],
    [34,65],
    [35,77],
    [36,80],
    [37,124],
    [38,133],
    [39,155],
    [40,196],
    [41,231],
    [42,251],
    [43,299],
    [44,320],
    [45,364],
    [46,397],
    [47,414],
    [48,493],
    [49,564],
    [50,591],
    [51,609],
    [52,683],
    [53,718],
    [54,718],
    [55,808],
    [56,868],
    [57,853],
    [58,940],
    [59,903],
    [60,911],
    [61,934],
    [62,916],
    [63,961],
    [64,956],
    [65,895],
    [66,896],
    [67,882],
    [68,878],
    [69,825],
    [70,748],
    [71,663],
    [72,601],
    [73,563],
    [74,535],
    [75,486],
    [76,405],
    [77,367],
    [78,287],
    [79,261],
    [80,220],
    [81,162],
    [82,127],
    [83,96],
    [84,84],
    [85,52],
    [86,50],
    [87,29],
    [88,21],
    [89,10],
    [90,7],
    [91,3],
    [92,1]
];

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
        label: 'Total Supply',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataset,
    }]
};

const config = {
    type: 'line',
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