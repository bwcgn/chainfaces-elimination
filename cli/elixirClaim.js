require('dotenv').config();
// Claim Contract
const claimContract = '0xAAd49b703E5cDAf92606733A5f2c952E98780d4d';
const { web3 } = require('./../src/contracts/RenderContract');
const merkleRoot = require('./../public/merkleRoot.json');

web3.eth.getPastLogs({
    fromBlock: 0,
    topics: ['0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62', '0x000000000000000000000000aad49b703e5cdaf92606733a5f2c952e98780d4d']
})
    .then( (txs) => {
        return txs.map((t) => web3.utils.toNumber(t.data))
            .reduce((n, currentValue) => n+currentValue);
    }).then((claimed) => {
            let claimable = web3.utils.toNumber(merkleRoot.tokenTotal);
            console.log(`Total Claimable ${claimable}\n`);
            console.log(`Total Claimed ${claimed}\n`);
    }).then( () => {
        return web3.eth.getPastLogs({
            fromBlock: 0,
            topics: ['0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62', '0x00000000000000000000000055b3bd7c074ccb74a245d2546273ba690647e8db', null, '0x0000000000000000000000000000000000000000000000000000000000000000']
        })
    }).then( (txs) => {
        console.log(`Burnt Elixir: ${txs.length}`);
    })