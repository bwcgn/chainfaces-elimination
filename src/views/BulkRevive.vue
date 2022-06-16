<template>
  <div class="home">
    <h1>BULK REVIVE</h1>
    <div class="row">
      <div class="col-2">
        <button class="btn btn-primary" @click="fetch">LOAD FALLEN</button>
      </div>
    </div>
    <h2 class="lead pt-3">WARRIORS</h2>
    <h4 class="lead">**It is up to you, to know what tokens you have revived. Max 20 items**</h4>
    <div class="row">
      <div class="col-6 ma-2">
        <table class="table" v-if="tokens.length > 0">
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">#</th>
            <th scope="col">Rounds Survived</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="k" v-for="(i,k) in tokens">
            <td><input type="checkbox" v-model="selectedIndexes" :value="i.tokenId" /></td>
            <td>{{i.tokenId}}</td>
            <td>{{i.roundsSurvived}}</td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-primary" v-show="selectedIndexes.length > 0 && selectedIndexes.length <= 20" v-on:click="revive">Revive</button>
        <div class="text-error" v-if="message">{{this.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const shrine = '0x8D020b5652764dAdD4ad7d9ff27B8F9a96Ef0F30';
const shrineAbi = [{"inputs":[{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyClaimed","type":"error"},{"inputs":[],"name":"AlreadyRevealed","type":"error"},{"inputs":[],"name":"InvalidProof","type":"error"},{"inputs":[],"name":"InvalidSecret","type":"error"},{"inputs":[],"name":"MinterNotSet","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_key","type":"uint256"}],"name":"getString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isRevealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_roundsSurvived","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"resurrect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_index","type":"uint256[]"},{"internalType":"uint256[]","name":"_id","type":"uint256[]"},{"internalType":"uint256[]","name":"_roundsSurvived","type":"uint256[]"},{"internalType":"bytes32[][]","name":"_merkleProof","type":"bytes32[][]"}],"name":"resurrectMulti","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_secretReveal","type":"uint256"}],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundsSurvived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"secret","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_key","type":"uint256"},{"internalType":"string","name":"_string","type":"string"}],"name":"setString","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export default {
  data() {
    return {
      merkleTree: null,
      tokens: [],
      selectedIndexes: [],
      message: null,
      web3: null
    }
  },
  methods: {
    async revive() {
      this.message = null;
      let web3 = this.web3;
      let shrineContraact = new web3.eth.Contract(shrineAbi, shrine);

      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];

      let tokenIds = [];
      let proofs = [];
      let roundsSurvived = [];
      let indexes = [];

      let items = this.merkleTree.claims[account];

      for (let i of this.selectedIndexes)
      {
        let item = items.filter( item => item.id === i);

        let result = await shrineContraact.methods.isClaimed(i).call();

        if (!result) {
          console.error(`You have already claimed token ${i}`);
          this.message = `You have already claimed token ${i}`;
          return;
        }

        if (item.length === 1) {
          tokenIds.push(i);
          proofs.push(item[0].proof);
          roundsSurvived.push(item[0].roundsSurvived);
          indexes.push(item[0].index);
        }
      }

      let gas = await shrineContraact.methods.resurrectMulti(
          indexes,
          tokenIds,
          roundsSurvived,
          proofs
      ).estimateGas({
        from: account,
      });

      let tx = await shrineContraact.methods.resurrectMulti(
          indexes,
          tokenIds,
          roundsSurvived,
          proofs
      ).send({
        from: account,
        gasLimit: gas
      });
    },
    async fetch() {
      let result = await axios.get('/merkleRoot.json');
      this.merkleTree = result.data;
      // console.log(this.merkleTree);
      let web3 = this.web3;
      let accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        let account = accounts[0];
        // console.log(this.merkleTree.claims[account]);
        this.tokens = this.merkleTree.claims[account].map(i => {
          return {
            roundsSurvived: web3.utils.hexToNumber(i.roundsSurvived),
            proof: i.proof,
            tokenId: i.id,
          }
        });
      }
    }
  },
  computed: {
  },
  async mounted() {
    const providerOptions = {
      /* See Provider Options Section */
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: process.env.INFURA_PROJECT_ID, // required
        }
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "CFA", // Required
          infuraId: process.env.INFURA_PROJECT_ID, // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 1, // Optional. It defaults to 1 if not provided
          darkMode: false // Optional. Use dark theme, defaults to false
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(0,0,23)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(197,156,108)",
        hover: "rgb(16, 26, 32)"
      }
    });

    const provider = await web3Modal.connect();

    this.web3 = new Web3(provider);
  }
}
</script>