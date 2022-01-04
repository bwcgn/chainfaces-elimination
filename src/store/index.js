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
    BlockNumber : json.blockNumber
  },
  getters: {
      owners : state => {
          return state.ownerList
      },
      deadTokens : state => state.memorialList,
      totalTokensByAddress: state => (id) => state.ownerCount[id],
      totalDeathsByAddress: state => (id) => state.deathCount[id],
      getOwnerOfToken: state => (id) => state.ownerList[id],
      uniqueOwners: (state, getters) => {
        let list = {};
        for (const i in state.ownerList) {
          let addr = state.ownerList[i];
          list[addr] = true;
        }

        return Object.keys(list);
      },
      findAllDeadPlayers: (state,getters) => {
        let uniqueOwners = getters.uniqueOwners;

        let list = {};
        for(const i in uniqueOwners) {
          let eth = uniqueOwners[i];
          if (getters.totalDeathsByAddress(eth) === getters.totalTokensByAddress(eth)) {
            list[eth] = true;
          }
        }

        return Object.keys(list);
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