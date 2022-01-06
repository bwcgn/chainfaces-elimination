const fs = require('fs');

const Contract = require('./../src/Contract');

( async () => {
    let OwnerList = await Contract.getTokenHolders();
    let Memorial = await Contract.getMemorial(OwnerList);
    let OwnerCount = Contract.getCount(OwnerList);
    let DeathCount = Contract.getCount(Memorial);
    let bn = await Contract.getBlockNumber();
    let cowards = await Contract.getBiggestCowards();
    let warriors = await Contract.getBiggestWarriors();
    let CowardCount = Contract.getCount(cowards);

    fs.writeFileSync(__dirname + '/../src/store/data/data.json', JSON.stringify({
        ownerList : OwnerList,
        memorialList : Memorial,
        ownerCount : OwnerCount,
        deathCount : DeathCount,
        blockNumber : bn,
        cowards : cowards,
        warriors: warriors,
        cowardCount : CowardCount
    }));
})();