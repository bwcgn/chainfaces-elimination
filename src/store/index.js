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