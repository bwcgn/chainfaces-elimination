const fs = require("fs");

const database = JSON.parse(fs.readFileSync("./database.json"));

const golfScores = {};
const arenaScores = {};

for (let i = 0; i < 26969; i++) {
    let json = database[i];
    let metadata = JSON.parse(json.replace('data:application/json;ascii,', ''));

    let golfScore = metadata.attributes.filter( i => i.trait_type === 'Golf Score');

    if (! golfScores[golfScore[0].value]) {
        golfScores[golfScore[0].value] = 0;
    }

    golfScores[golfScore[0].value]++

    let arenaScore = metadata.attributes.filter( i => i.trait_type === 'Arena Score');
    if (! arenaScores[arenaScore[0].value]) {
        arenaScores[arenaScore[0].value] = 0;
    }
    arenaScores[arenaScore[0].value]++
}

console.log(golfScores);
console.log(arenaScores);

let golfRows = [];
for (let i in golfScores) {
    let v = golfScores[i];

    golfRows.push({
        score : i,
        count: v
    })

}

// Golf Score
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let csvWriter = createCsvWriter({
    path: 'golf_score.csv',
    header: [
        {id: 'score', title: 'Golf Score'},
        {id: 'count', title: 'Total'}
    ]
});

csvWriter
.writeRecords(golfRows)
.then(()=> console.log('Golf Score CSV file was written successfully'));

// Arena Score
let arenaRows = [];
for (let i in arenaScores) {
    let v = arenaScores[i];

    arenaRows.push({
        score : i,
        count: v
    })
}

csvWriter = createCsvWriter({
    path: 'arena_scores.csv',
    header: [
        {id: 'score', title: 'Arena Score'},
        {id: 'count', title: 'Total'}
    ]
});

csvWriter
    .writeRecords(arenaRows)
    .then(()=> console.log('Arena Score CSV file was written successfully'));

