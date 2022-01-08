const fs = require("fs");

const database = JSON.parse(fs.readFileSync("./database.json"));

const golfScores = {};

for (let i = 0; i < 26969; i++) {
    let json = database[i];
    let metadata = JSON.parse(json.replace('data:application/json;ascii,', ''));

    let golfScore = metadata.attributes.filter( i => i.trait_type === 'Golf Score');

    if (! golfScores[golfScore[0].value]) {
        golfScores[golfScore[0].value] = 0;
    }

    golfScores[golfScore[0].value]++
}

console.log(golfScores);

let rows = [];
for (let i in golfScores) {
    let v = golfScores[i];

    rows.push({
        score : i,
        count: v
    })

}

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
        {id: 'score', title: 'Score'},
        {id: 'count', title: 'Total'}
    ]
});

csvWriter
    .writeRecords(rows)
    .then(()=> console.log('The CSV file was written successfully'));

