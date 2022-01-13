const fs = require("fs");

const database = JSON.parse(fs.readFileSync("./database.json"));
const chainData = JSON.parse(fs.readFileSync("./src/store/data/data.json"));
let memorialList = chainData.memorialList;
let cowardList = chainData.cowardCount;
let warriorList = chainData.warriors;
let ownerList = chainData.ownerCount;

const golfScores = {};
const golfScoresDead = {};
const arenaScores = {};
const symbolCounts = {};
const symbolCountsDead = {};

loadMetadata();
saveGolfScores();
saveArenaAndScarScores();
saveSymbolCounts();
// getNotEnteredCounts();

function loadMetadata(){

    for (let i = 0; i < 26969; i++) {
        let json = database[i];
        let metadata = JSON.parse(json.replace('data:application/json;ascii,', ''));

        // Golf Scores
        let golfScore = metadata.attributes.filter( i => i.trait_type === 'Golf Score');
        
        // Symbols
        let leftFace = metadata.attributes.filter( i => i.trait_type === 'Left Face')[0].value;
        let leftEye = metadata.attributes.filter( i => i.trait_type === 'Left Eye')[0].value;
        let mouth = metadata.attributes.filter( i => i.trait_type === 'Mouth')[0].value;
        let rightEye = metadata.attributes.filter( i => i.trait_type === 'Right Eye')[0].value;
        let rightFace = metadata.attributes.filter( i => i.trait_type === 'Right Face')[0].value;

        // Arena Scores
        let arenaScore = metadata.attributes.filter( i => i.trait_type === 'Arena Score');


        let dead = false;
        if(memorialList[i]){
            dead = true;
        }

        if(dead){
            if (! golfScoresDead[golfScore[0].value]) {
                golfScoresDead[golfScore[0].value] = 0;
            }

            golfScoresDead[golfScore[0].value]++
        
            if (! symbolCountsDead[leftFace]) {
                symbolCountsDead[leftFace] = 0;
            }
            if (! symbolCountsDead[leftEye]) {
                symbolCountsDead[leftEye] = 0;
            }
            if (! symbolCountsDead[mouth]) {
                symbolCountsDead[mouth] = 0;
            }
            if (! symbolCountsDead[rightEye]) {
                symbolCountsDead[rightEye] = 0;
            }
            if (! symbolCountsDead[rightFace]) {
                symbolCountsDead[rightFace] = 0;
            }

            symbolCountsDead[leftFace]++;
            symbolCountsDead[leftEye]++;
            symbolCountsDead[mouth]++;
            symbolCountsDead[rightEye]++;
            symbolCountsDead[rightFace]++;
        }
        else{
            if (! golfScores[golfScore[0].value]) {
                golfScores[golfScore[0].value] = 0;
            }

            golfScores[golfScore[0].value]++

            if (! arenaScores[arenaScore[0].value]) {
                arenaScores[arenaScore[0].value] = 0;
            }
            arenaScores[arenaScore[0].value]++


            if (! symbolCounts[leftFace]) {
                symbolCounts[leftFace] = 0;
            }
            if (! symbolCounts[leftEye]) {
                symbolCounts[leftEye] = 0;
            }
            if (! symbolCounts[mouth]) {
                symbolCounts[mouth] = 0;
            }
            if (! symbolCounts[rightEye]) {
                symbolCounts[rightEye] = 0;
            }
            if (! symbolCounts[rightFace]) {
                symbolCounts[rightFace] = 0;
            }
            symbolCounts[leftFace]++;
            symbolCounts[leftEye]++;
            symbolCounts[mouth]++;
            symbolCounts[rightEye]++;
            symbolCounts[rightFace]++;
        }
        
    }
}

function saveGolfScores(){
    let golfRows = [];
    for (let i in golfScores) {
        let v = golfScores[i];

        golfRows.push({
            score : i,
            count: v
        })

    }
    fs.writeFileSync('./src/store/data/golfScores.json', JSON.stringify(golfRows));
    console.log('Golf Score JSON file was written successfully');

    golfRows = [];
    for (let i in golfScoresDead) {
        let v = golfScoresDead[i];

        golfRows.push({
            score : i,
            count: v
        })

    }
    fs.writeFileSync('./src/store/data/golfScoresDead.json', JSON.stringify(golfRows));
    console.log('Golf Score Dead JSON file was written successfully');
}

function saveArenaAndScarScores(){
    // Arena Score
    let arenaRows = [];
    let scarRows = [];
    let scarSum = 0;
    let index = 0;
    for (let i in arenaScores) {
        let v = arenaScores[i];
        scarSum += v;

        if(i % 10 == 0){
            scarRows.push({
                score : index++,
                count: scarSum
            })
            scarSum = 0;
        }
        arenaRows.push({
            score : i,
            count: v
        })
    }

    fs.writeFileSync('./src/store/data/arenaScores.json', JSON.stringify(arenaRows));
    console.log('Arena Score JSON file was written successfully');

    fs.writeFileSync('./src/store/data/scarScores.json', JSON.stringify(scarRows));
    console.log('Scar Score JSON file was written successfully');
}

function saveSymbolCounts(){
    let symbolRows = [];
    for (let i in symbolCounts) {
        let v = symbolCounts[i];

        symbolRows.push({
            score : i,
            count: v
        })

    }
    fs.writeFileSync('./src/store/data/symbolCounts.json', JSON.stringify(symbolRows));
    console.log('Symbol Counts JSON file was written successfully');

    symbolRows = [];
    for (let i in symbolCountsDead) {
        let v = symbolCountsDead[i];

        symbolRows.push({
            score : i,
            count: v
        })

    }
    fs.writeFileSync('./src/store/data/symbolCountsDead.json', JSON.stringify(symbolRows));
    console.log('Symbol Counts Dead JSON file was written successfully');
}