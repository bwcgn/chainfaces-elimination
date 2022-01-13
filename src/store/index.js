import Vue from 'vue'
import Vuex from 'vuex'
import json from './data/data.json';
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import ENS, { getEnsAddress } from '@ensdomains/ensjs'


const abi = [{
    "inputs": [{
        "internalType": "uint256",
        "name": "_tokenLimit",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "_secretCommit", "type": "uint256"}, {
        "internalType": "address",
        "name": "_renderer",
        "type": "address"
    }, {"internalType": "bytes32", "name": "_merkleRoot", "type": "bytes32"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {"inputs": [], "name": "AlreadyClaimed", "type": "error"}, {
    "inputs": [],
    "name": "ArenaEntryClosed",
    "type": "error"
}, {"inputs": [], "name": "ArenaIsActive", "type": "error"}, {
    "inputs": [],
    "name": "ArenaNotActive",
    "type": "error"
}, {"inputs": [], "name": "BalanceNotWithdrawn", "type": "error"}, {
    "inputs": [],
    "name": "GameOver",
    "type": "error"
}, {"inputs": [], "name": "InvalidClaimAmount", "type": "error"}, {
    "inputs": [],
    "name": "InvalidClaimValue",
    "type": "error"
}, {"inputs": [], "name": "InvalidJoinCount", "type": "error"}, {
    "inputs": [],
    "name": "InvalidMintValue",
    "type": "error"
}, {"inputs": [], "name": "InvalidProof", "type": "error"}, {
    "inputs": [],
    "name": "InvalidReveal",
    "type": "error"
}, {"inputs": [], "name": "LastManStanding", "type": "error"}, {
    "inputs": [],
    "name": "LeavingProhibited",
    "type": "error"
}, {"inputs": [], "name": "LionsAreHungry", "type": "error"}, {
    "inputs": [],
    "name": "LionsNotHungry",
    "type": "error"
}, {"inputs": [], "name": "MainSaleNotComplete", "type": "error"}, {
    "inputs": [],
    "name": "NonExistentToken",
    "type": "error"
}, {"inputs": [], "name": "NotMainSaleStage", "type": "error"}, {
    "inputs": [],
    "name": "NotPreSaleStage",
    "type": "error"
}, {"inputs": [], "name": "NotYourWarrior", "type": "error"}, {
    "inputs": [],
    "name": "SaleNotComplete",
    "type": "error"
}, {"inputs": [], "name": "SaleNotOpen", "type": "error"}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
    }, {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}],
    "name": "ApprovalForAll",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {"stateMutability": "payable", "type": "fallback"}, {
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "arenaActive",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "arenaInfo",
    "outputs": [{
        "components": [{
            "internalType": "uint256",
            "name": "fallen",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "alive", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "currentRound",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "bounty", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "hunger",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "nextFeed", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "champion",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "entryClosedBlock", "type": "uint256"}, {
            "internalType": "bool",
            "name": "hungry",
            "type": "bool"
        }, {"internalType": "bool", "name": "open", "type": "bool"}, {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
        }, {"internalType": "bool", "name": "gameOver", "type": "bool"}],
        "internalType": "struct ChainFaces2.ArenaInfo",
        "name": "info",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "arenaWaitBlocks",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_id", "type": "uint256"}],
    "name": "assembleFace",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "blocksPerRound",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_index", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_ogAmount",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "_wlAmount", "type": "uint256"}, {
        "internalType": "bytes32[]",
        "name": "_merkleProof",
        "type": "bytes32[]"
    }, {"internalType": "uint256", "name": "_amount", "type": "uint256"}],
    "name": "claim",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {"inputs": [], "name": "createFace", "outputs": [], "stateMutability": "payable", "type": "function"}, {
    "inputs": [],
    "name": "currentRound",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "entryClosedBlock",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "entryOpen",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getApproved",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "howHungryAreTheLions",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }],
    "name": "isApprovedForAll",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "isClaimed",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "joinArena",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "leaveArena",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "mainSaleComplete",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256[]", "name": "_tokenIds", "type": "uint256[]"}],
    "name": "multiJoinArena",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bool", "name": "_alive", "type": "bool"}],
    "name": "myWarriors",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
    }],
    "name": "onERC721Received",
    "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
    "stateMutability": "pure",
    "type": "function"
}, {"inputs": [], "name": "openArena", "outputs": [], "stateMutability": "payable", "type": "function"}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}, {
        "internalType": "bool",
        "name": "_alive",
        "type": "bool"
    }],
    "name": "ownerWarriors",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_id", "type": "uint256"}],
    "name": "renderSvg",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renderer",
    "outputs": [{"internalType": "contract ChainFaces2Renderer", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "roundsSurvived",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}, {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
    }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "saleEnds",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "saleLength",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "salePrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "stage",
    "outputs": [{"internalType": "enum ChainFaces2.Stage", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "startMainSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes4", "name": "_interfaceId", "type": "bytes4"}],
    "name": "supportsInterface",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_secretReveal", "type": "uint256"}],
    "name": "theGreatReveal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "theLionsAreHungry",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "timeToEat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "tokenByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "tokenLimit",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_id", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalSurvivingWarriors",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {"inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"}];
const memorial = '0x7039D65E346FDEEBbc72514D718C88699c74ba4b';
const address = '0x93a796B1E846567Fe3577af7B7BB89F71680173a';

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        memorial : '0x7039D65E346FDEEBbc72514D718C88699c74ba4b',
        cfaAddress : '0x93a796B1E846567Fe3577af7B7BB89F71680173a',
        ownerList: json.ownerList,
        memorialList: json.memorialList,
        ownerCount: json.ownerCount,
        deathCount: json.deathCount,
        BlockNumber: json.blockNumber,
        warriorList: json.warriors,
        cowardList: json.cowards,
        cowardCount: json.cowardCount,
        contract: null,
        addresss : null,
        ens : null,
    },
    getters: {
        owners: state => {
            return state.ownerList
        },
        deadTokens: (state, getters) => {
            let list = [];
            for (const tokenId in state.memorialList) {
                list.push({
                    tokenId: tokenId,
                    owner: state.memorialList[tokenId],
                    totalTokens: getters.totalTokensByAddress(state.memorialList[tokenId]),
                    totalDeadTokens: getters.totalDeathsByAddress(state.memorialList[tokenId]),
                });
            }
            list.sort(function (a, b) {
                return b.totalDeadTokens - a.totalDeadTokens
            })
            return list;// [token] = address
        },
        getCowardList: (state, getters) => {
            let users = getters.uniqueCowards;

            let list = [];

            for (const i in users) {
                let addr = users[i];
                list.push({
                    owner: addr,
                    totalTokens: getters.totalTokensByAddress(addr),
                    totalCowards: getters.totalCowardsByAddress(addr),
                });
            }

            list.sort(function (a, b) {
                return b.totalCowards - a.totalCowards
            })
            return list;// [] = {}}
        },
        getLeaderList: (state, getters) => {
            let users = getters.uniqueOwners;
            let users2 = getters.uniqueOwners;

            let usersEnteredArenaTokens = {};
            for (const tokenId in state.warriorList) {
                if (usersEnteredArenaTokens[state.warriorList[tokenId]] == null) {
                    usersEnteredArenaTokens[state.warriorList[tokenId]] = 0;
                }
                usersEnteredArenaTokens[state.warriorList[tokenId]]++;
            }
            // console.log(usersEnteredArenaTokens);
            let list = [];

            let aliveTotal = 0;

            for (const i in users) {
                let addr = users[i];
                let totalEntered = !usersEnteredArenaTokens[addr] ? 0 : usersEnteredArenaTokens[addr];
                let cowards = (!getters.totalCowardsByAddress(addr) ? 0 : getters.totalCowardsByAddress(addr));
                let deaths = (!getters.totalDeathsByAddress(addr) ? 0 : getters.totalDeathsByAddress(addr));
                let alive = totalEntered - cowards - deaths;
                aliveTotal += alive;
            }
            for (const i in users2) {
                let addr = users[i];
                let totalEntered = !usersEnteredArenaTokens[addr] ? 0 : usersEnteredArenaTokens[addr];
                let total = getters.totalTokensByAddress(addr);
                let cowards = (!getters.totalCowardsByAddress(addr) ? 0 : getters.totalCowardsByAddress(addr));
                let deaths = (!getters.totalDeathsByAddress(addr) ? 0 : getters.totalDeathsByAddress(addr));
                let alive = totalEntered - cowards - deaths;

                if (alive > 0) {
                    list.push({
                        owner: addr,
                        totalTokens: total,
                        totalEntered: totalEntered,
                        totalCowards: cowards,
                        totalDeaths: deaths,
                        totalAlive: alive,
                        percentageDead: ((deaths / (totalEntered - cowards)) * 100).toFixed(1) + '%',
                        percentageOfAlive: ((alive / aliveTotal) * 100).toFixed(4) + '%'
                    });
                }
            }

            list.sort(function (a, b) {
                return b.totalAlive - a.totalAlive
            })
            return list;// [] = {}}
        },
        totalTokensByAddress: state => (id) => state.ownerCount[id],
        totalDeathsByAddress: state => (id) => state.deathCount[id],
        totalCowardsByAddress: state => (id) => state.cowardCount[id],
        getOwnerOfToken: state => (id) => state.ownerList[id],
        uniqueOwners: (state, getters) => {
            let list = {};
            for (const i in state.ownerList) {
                let addr = state.ownerList[i];
                list[addr] = true;
            }

            return Object.keys(list);
        },
        uniqueCowards: (state, getters) => {
            let list = {};
            for (const i in state.cowardList) {
                let addr = state.cowardList[i];
                list[addr] = true;
            }

            return Object.keys(list);
        },
        findAllDeadPlayers: (state, getters) => {
            let uniqueOwners = getters.uniqueOwners;

            let list = [];
            for (const i in uniqueOwners) {
                let eth = uniqueOwners[i];
                if (getters.totalDeathsByAddress(eth) === getters.totalTokensByAddress(eth)) {
                    list.push({
                        address: eth,
                        count: parseInt(getters.totalTokensByAddress(eth))
                    })
                }
            }

            // console.log(list);

            list.sort(function (a, b) {
                return b.count - a.count
            });

            return list;
        },
        getBlockNumber: (state) => state.BlockNumber,
        getMemorial: (state) => state.memorial,
        getCfaAddress: (state) => state.cfaAddress,
        getContract: (state) => state.contract,
        getAddress: (state) => state.addresss,
        getEns: (state) => state.ens,
    },
    mutations: {
        setContract(state, contract) {
            state.contract = contract;
        },
        setAddress(state, address) {
            state.addresss = address;
        },
        setEns(state, ens) {
            state.ens = ens;
        }
    },
    actions: {
        async getWeb3({state, commit}) {
            let contract = state.contract;

            if (state.contract == null) {
                const provider = await detectEthereumProvider();

                const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
                let web3 = new Web3(provider);
                let contract = new web3.eth.Contract(abi, address);

                // let address = web3.eth.getAccounts();
                commit('setEns', ens);

                commit('setContract', contract);
                // commit('setAddress', address[0] || null);
            }

            return contract;
        },
        async getSvg({state}, tokenId) {
            let contract = state.contract;

            //Find Block Death for Token
            let tokenTransfers = await contract.getPastEvents('Transfer', {
                filter: {to: state.memorial, tokenId: parseInt(tokenId)},
                fromBlock: 0,
                toBlock: 'latest'
            });
            // console.log(tokenTransfers);
            if (tokenTransfers.length > 0) {
                let tx = tokenTransfers[0];

                let target = tx.blockNumber - 1;


                return await contract.methods.renderSvg(parseInt(tokenId)).call({}, target);
            } else {
                return await contract.methods.renderSvg(parseInt(tokenId)).call();
            }
        },
    },
    modules: {}
});

export default store;