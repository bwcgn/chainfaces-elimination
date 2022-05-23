const web3 = require('./Web3');

const abi = [{"inputs":[{"internalType":"uint256","name":"_tokenLimit","type":"uint256"},{"internalType":"uint256","name":"_secretCommit","type":"uint256"},{"internalType":"address","name":"_renderer","type":"address"},{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyClaimed","type":"error"},{"inputs":[],"name":"ArenaEntryClosed","type":"error"},{"inputs":[],"name":"ArenaIsActive","type":"error"},{"inputs":[],"name":"ArenaNotActive","type":"error"},{"inputs":[],"name":"BalanceNotWithdrawn","type":"error"},{"inputs":[],"name":"GameOver","type":"error"},{"inputs":[],"name":"InvalidClaimAmount","type":"error"},{"inputs":[],"name":"InvalidClaimValue","type":"error"},{"inputs":[],"name":"InvalidJoinCount","type":"error"},{"inputs":[],"name":"InvalidMintValue","type":"error"},{"inputs":[],"name":"InvalidProof","type":"error"},{"inputs":[],"name":"InvalidReveal","type":"error"},{"inputs":[],"name":"LastManStanding","type":"error"},{"inputs":[],"name":"LeavingProhibited","type":"error"},{"inputs":[],"name":"LionsAreHungry","type":"error"},{"inputs":[],"name":"LionsNotHungry","type":"error"},{"inputs":[],"name":"MainSaleNotComplete","type":"error"},{"inputs":[],"name":"NonExistentToken","type":"error"},{"inputs":[],"name":"NotMainSaleStage","type":"error"},{"inputs":[],"name":"NotPreSaleStage","type":"error"},{"inputs":[],"name":"NotYourWarrior","type":"error"},{"inputs":[],"name":"SaleNotComplete","type":"error"},{"inputs":[],"name":"SaleNotOpen","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arenaActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arenaInfo","outputs":[{"components":[{"internalType":"uint256","name":"fallen","type":"uint256"},{"internalType":"uint256","name":"alive","type":"uint256"},{"internalType":"uint256","name":"currentRound","type":"uint256"},{"internalType":"uint256","name":"bounty","type":"uint256"},{"internalType":"uint256","name":"hunger","type":"uint256"},{"internalType":"uint256","name":"nextFeed","type":"uint256"},{"internalType":"uint256","name":"champion","type":"uint256"},{"internalType":"uint256","name":"entryClosedBlock","type":"uint256"},{"internalType":"bool","name":"hungry","type":"bool"},{"internalType":"bool","name":"open","type":"bool"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"bool","name":"gameOver","type":"bool"}],"internalType":"struct ChainFaces2.ArenaInfo","name":"info","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arenaWaitBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"assembleFace","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blocksPerRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_ogAmount","type":"uint256"},{"internalType":"uint256","name":"_wlAmount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"createFace","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"currentRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entryClosedBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entryOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"howHungryAreTheLions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"joinArena","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"leaveArena","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mainSaleComplete","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_tokenIds","type":"uint256[]"}],"name":"multiJoinArena","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_alive","type":"bool"}],"name":"myWarriors","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"openArena","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"bool","name":"_alive","type":"bool"}],"name":"ownerWarriors","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"renderSvg","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renderer","outputs":[{"internalType":"contract ChainFaces2Renderer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundsSurvived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleEnds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"saleLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"salePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stage","outputs":[{"internalType":"enum ChainFaces2.Stage","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startMainSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_secretReveal","type":"uint256"}],"name":"theGreatReveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"theLionsAreHungry","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeToEat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSurvivingWarriors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const address = '0x93a796B1E846567Fe3577af7B7BB89F71680173a';

const memorial = '0x7039D65E346FDEEBbc72514D718C88699c74ba4b';

const chunkSize = 100;

const api = {
    Contract : new web3.eth.Contract(abi, address),
    OriginBlock : 13916172,
    TournamentStart: 13942962,
    MemorialStart: 13942962,
    Database: {},
    OwnerCount: {},
    DeathCount: {},
    Eliminated: [],
    Svg: {},
    async getBlockNumber() {
      return await web3.eth.getBlockNumber();
    },
    async fetchTransferEvents(fromBlock, toBlock) {
        let tokenTransfers = await this.Contract.getPastEvents('Transfer', {
            filter: {},
            fromBlock: fromBlock,
            toBlock: toBlock,
            topics: [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
            ]
        });
        return tokenTransfers;
    },
    async tryToFetchTransferEventsFast(startBlock, increaseIncrement) {
        const fastIncrement = 1000;
        try {
            let tokenTransfers = await this.fetchTransferEvents(startBlock, startBlock + fastIncrement);
            increaseIncrement(fastIncrement);
            return tokenTransfers;
        } catch (error) {
            let tokenTransfers = await this.fetchTransferEvents(startBlock, startBlock + chunkSize);
            increaseIncrement(chunkSize);
            return tokenTransfers;
        }
    },
    async fetchLeaderboard(returnCurrentDatabase, initialDatabase) {
        let database = JSON.parse(JSON.stringify(initialDatabase));
        
        let currentBlock = 14735936;
        let latestBlock = await this.getBlockNumber();

        do {
            console.log(`start fetching from current block: ${currentBlock}.`);
            
            const increaseIncrement = (increment) => { currentBlock += increment };
            const tokenTransfers = await this.tryToFetchTransferEventsFast(currentBlock, increaseIncrement);

            tokenTransfers.forEach( (event) => {
                let values = event.returnValues;

                let from = values[0];
                let to = values[1];
                let tokenId = parseInt(values[2]);
                
                const sender = database.find(
                    (entry) => entry.address === from
                );
                if (sender !== undefined) {
                    const index = sender.tokens.indexOf(tokenId);
                    if (index > -1) {
                        sender.tokens.splice(index, 1);
                    }
                }
                const receiver = database.find(
                    (entry) => entry.address === to
                );
                if (receiver === undefined) {
                    database.push({address: to, tokens: [tokenId]});
                } else {
                    const index = receiver.tokens.indexOf(tokenId);
                    if (index === -1) receiver.tokens.push(tokenId);
                }
            });
            database = database.filter(element => element.tokens.length !== 0);
            returnCurrentDatabase(database);
        } while(currentBlock < latestBlock);
        console.log("fetching done");
        return database;
    },
    async getTokenHolders() {
        console.log('getTokenHolders');
        let database = {};

        let contract = this.Contract;

        let increment = chunkSize;
        let start = this.OriginBlock;

        do {

            console.log(`token hodlers reading from ${start+1} to ${start+increment} up to ${this.TournamentStart}`);

            let tokenTransfers = await contract.getPastEvents('Transfer', {
                filter: {},
                fromBlock: start,
                toBlock: start+increment
            });

            tokenTransfers.forEach( (event) => {
                let values = event.returnValues;

                let from = values[0];
                let to = values[1];
                let tokenId = values[2];

                if (to !== '0x93a796B1E846567Fe3577af7B7BB89F71680173a') {
                    database[tokenId] = to;
                }
            })

            start += increment+1;

            if (start+increment > this.TournamentStart) {
                increment = this.TournamentStart - start;
            }

        } while(start + increment < this.TournamentStart);

        let tokenTransfers = await contract.getPastEvents('Transfer', {
            filter: {},
            fromBlock: start,
            toBlock: start+increment
        });

        tokenTransfers.forEach( (event) => {
            let values = event.returnValues;

            let from = values[0];
            let to = values[1];
            let tokenId = values[2];

            if (to !== '0x93a796B1E846567Fe3577af7B7BB89F71680173a') {
                database[tokenId] = to;
            }
        })

        return database;
    },
    async getBiggestWarriors() {
        console.log('getBiggestWarriors');

        let database = {};

        let contract = this.Contract;

        let increment = chunkSize;
        let start = this.OriginBlock;

        do {
            console.log(`biggest warriors reading from ${start} to ${start+increment} up to ${this.TournamentStart}`);

            let tokenTransfers = await contract.getPastEvents('Transfer', {
                filter: {to : '0x93a796B1E846567Fe3577af7B7BB89F71680173a'},
                fromBlock: start,
                toBlock: start+increment
            });

            tokenTransfers.forEach( (event) => {
                let values = event.returnValues;

                let from = values[0];
                let to = values[1];
                let tokenId = values[2];

                database[tokenId] = from;
            })

            start += increment + 1;

            if (start+increment > this.TournamentStart) {
                increment = this.TournamentStart - start;
            }

            console.log(start, increment, this.TournamentStart);

        } while(start + increment < this.TournamentStart);

        console.log(`biggest warriors reading from ${start} to ${start+increment} up to ${this.TournamentStart}`);

        let tokenTransfers = await contract.getPastEvents('Transfer', {
            filter: {to : '0x93a796B1E846567Fe3577af7B7BB89F71680173a'},
            fromBlock: start,
            toBlock: start+increment
        });

        tokenTransfers.forEach( (event) => {
            let values = event.returnValues;

            let from = values[0];
            let to = values[1];
            let tokenId = values[2];

            database[tokenId] = from;
        })

        return database;
    },
    async getBiggestCowards() {
        console.log('getBiggestCowards');
        let database = {};

        let contract = this.Contract;
        let currentBlock = await this.getBlockNumber();
        let increment = chunkSize;
        let start = this.TournamentStart-1;

        do {

            console.log(`biggest cowards reading from ${start+1} to ${start+increment} up to ${currentBlock}`);

            let tokenTransfers = await contract.getPastEvents('Transfer', {
                filter: { from : '0x93a796B1E846567Fe3577af7B7BB89F71680173a'},
                fromBlock: start,
                toBlock: start+increment
            });

            tokenTransfers.forEach( (event) => {
                let values = event.returnValues;

                let from = values[0];
                let to = values[1];
                let tokenId = values[2];

                if (to !== '0x7039D65E346FDEEBbc72514D718C88699c74ba4b') {
                    database[tokenId] = to;
                }

            });

            start += increment + 1;

            if (start+increment > currentBlock) {
                increment = currentBlock - start;
            }

        } while(start + increment < currentBlock);

        console.log(`biggest cowards reading from ${start+1} to ${start+increment} up to ${currentBlock}`);

        let tokenTransfers = await contract.getPastEvents('Transfer', {
            filter: { from : '0x93a796B1E846567Fe3577af7B7BB89F71680173a'},
            fromBlock: start,
            toBlock: start+increment
        });

        tokenTransfers.forEach( (event) => {
            let values = event.returnValues;

            let from = values[0];
            let to = values[1];
            let tokenId = values[2];

            if (to !== '0x7039D65E346FDEEBbc72514D718C88699c74ba4b') {
                database[tokenId] = to;
            }

        });

        return database;
    },
    getCount(db) {
        let count = {};

        for (const i in db) {
            if (! count[ db[i] ]) {
                count[ db[i] ] = 0;
            }

            count[ db[i] ] ++
        }

        return count;
    },
    async getMemorial(ownerDb) {
        console.log('getMemorial');
        let database = {};

        let contract = this.Contract;
        let currentBlock = await this.getBlockNumber();
        let increment = chunkSize;
        let start = this.TournamentStart-1;

        do {

            console.log(`memorial reading from ${start+1} to ${start+increment} up to ${currentBlock}`);

            let tokenTransfers = await contract.getPastEvents('Transfer', {
                filter: {to: memorial},
                fromBlock: start,
                toBlock: start+increment
            });

            tokenTransfers.forEach( (event) => {
                let tokenId = event.returnValues.tokenId;
                database[tokenId]  = ownerDb[tokenId];
            });

            start += increment + 1;

            if (start+increment > currentBlock) {
                increment = currentBlock - start;
            }

        } while(start + increment < currentBlock);

        console.log(`memorial reading from ${start+1} to ${start+increment} up to ${currentBlock}`);

        let tokenTransfers = await contract.getPastEvents('Transfer', {
            filter: {to: memorial},
            fromBlock: start,
            toBlock: start+increment
        });

        tokenTransfers.forEach( (event) => {
            let tokenId = event.returnValues.tokenId;
            database[tokenId]  = ownerDb[tokenId];
        });

        return database;
    },
}

module.exports = api;