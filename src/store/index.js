import Vue from 'vue'
import Vuex from 'vuex'
import json from './data/data.json';

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    ownerList : json.ownerList,
    memorialList : json.memorialList,
    ownerCount : json.ownerCount,
    deathCount : json.deathCount,
    BlockNumber : json.blockNumber,
    warriorList : json.warriors,
    cowardList : json.cowards,
    cowardCount : json.cowardCount,
  },
  getters: {
      owners : state => {
          return state.ownerList
      },
      deadTokens : (state,getters) => {
          let list = [];
          for (const tokenId in state.memorialList) {
              list.push({
                  tokenId : tokenId,
                  owner: state.memorialList[tokenId],
                  totalTokens : getters.totalTokensByAddress(state.memorialList[tokenId]),
                  totalDeadTokens: getters.totalDeathsByAddress(state.memorialList[tokenId]),
              });
          }
          list.sort(function (a,b) {
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
                  totalTokens : getters.totalTokensByAddress(addr),
                  totalCowards: getters.totalCowardsByAddress(addr),
              });
          }

          list.sort(function (a,b) {
              return b.totalCowards - a.totalCowards
          })
          return list;// [] = {}}
      },
      getLeaderList: (state, getters) => {
        let users = getters.uniqueOwners;
        let users2 = getters.uniqueOwners;

          let usersEnteredArenaTokens = {};
          for (const tokenId in state.warriorList) {
              if(usersEnteredArenaTokens[state.warriorList[tokenId]] == null){
                usersEnteredArenaTokens[state.warriorList[tokenId]] = 0;
              }
              usersEnteredArenaTokens[state.warriorList[tokenId]]++;
          }
          console.log(usersEnteredArenaTokens);
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
              list.push({
                  owner: addr,
                  totalTokens: total,
                  totalEntered: totalEntered,
                  totalCowards: cowards,
                  totalDeaths: deaths,
                  totalAlive: alive,
                  percentageOfAlive: ((alive / aliveTotal) * 100).toFixed(4) + '%'
              });
          }

          list.sort(function (a,b) {
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
      findAllDeadPlayers: (state,getters) => {
        let uniqueOwners = getters.uniqueOwners;

        let list = [];
        for(const i in uniqueOwners) {
          let eth = uniqueOwners[i];
          if (getters.totalDeathsByAddress(eth) === getters.totalTokensByAddress(eth)) {
            list.push( {
                address : eth,
                count : parseInt(getters.totalTokensByAddress(eth))
            })
          }
        }

        console.log(list);

        list.sort(function (a,b) {
            return b.count - a.count
        });

        return list;
      },
      getBlockNumber : (state) => state.BlockNumber
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});

export default store;