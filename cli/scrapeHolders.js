const axios = require('axios');
require('dotenv').config();
const PAGE_SIZE = 181;
const fs = require('fs');

const getTokenOwners = async (cursor) => {
    let url = 'https://deep-index.moralis.io/api/v2/nft/0x93a796b1e846567fe3577af7b7bb89f71680173a/owners?chain=eth&format=decimal&limit='+PAGE_SIZE;

    if (cursor.length > 0) {
        url += '&cursor=' + cursor;
    }

    let r = await axios.get(url, {
        headers : {
            'X-API-Key' : process.env.MORALIS_API_KEY
        }
    });

    return r.data;
}

(async () => {
    let cursor = '';
    let db = {};
    let counted = 0;

    for (let x=0; x<149; x++) {
        // console.log(`Cursor used ${cursor}`);
        let data = await getTokenOwners(cursor);
        cursor = data.cursor;
        // console.log(`Page ${data.page}`);
        // console.log(`Next Cursor ${data.cursor}`);

        for(const token of data.result) {
            // console.log(`token ${token.token_id} owned by ${token.owner_of}`);

            if (! db[token.owner_of]) {
                db[token.owner_of] = [];
            }
            counted++;
            db[token.owner_of].push(token.token_id);
        }
    }

    let ownerDb = [];
    for (const owner of Object.keys(db)) {
        ownerDb.push({
            address: owner,
            total: db[owner].length
        })
    }

    console.log(`Counted ${counted}`);
    fs.writeFileSync("./src/store/data/holders.json", JSON.stringify(ownerDb));
})();