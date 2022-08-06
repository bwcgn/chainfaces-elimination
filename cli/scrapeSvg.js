require('dotenv').config();
const fs = require('fs');

const { renderContract } = require('./../src/contracts/RenderContract');

const contract = renderContract;

(async (start, end) => {
    for (let x=start; x<=end; x++) {
        console.log(`Reading ${x}`);
        let img = await contract.methods.image(x).call();
        fs.writeFileSync(__dirname + `/out/${x}.svg`, img);
    }
})(10000, 36969);