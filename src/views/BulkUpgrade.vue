<template>
  <div class="home">
    <h1>BULK UPGRADE</h1>
    <div class="row">
      <div class="col-2">
        <button class="btn btn-primary" @click="fetch" :disabled="fetchState">LOAD CFAS</button>
      </div>
    </div>
    <h2 class="lead pt-3">WARRIORS</h2>
    <h4 class="lead">**First time users will be asked to set approval for the upgrade contract to transfer your CFAs.
      This will be your first tx you need to sign. After the upgrade contract has approval you can upgrade as many cfas as you want.
      Max 16 items**</h4>
    <div class="row">
      <div class="col-6 ma-2">
        <table class="table" v-if="tokens.length > 0">
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">#</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="k" v-for="(i,k) in tokens">
            <td><input type="checkbox" v-model="selectedIndexes" :value="i.tokenId" /></td>
            <td>{{i.tokenId}}</td>
          </tr>
          </tbody>
        </table>
        <button class="btn btn-primary" v-show="approved === false && selectedIndexes.length > 0 && selectedIndexes.length <= 16" v-on:click="upgrade">Check Approval</button>
        <button class="btn btn-primary" v-show="approved === true && selectedIndexes.length > 0 && selectedIndexes.length <= 16 && elixirCount >= selectedIndexes.length" v-on:click="upgrade2">Upgrade CFAs</button>

        <div class="text-error" v-if="approved === true && selectedIndexes.length > 0 && selectedIndexes.length <= 16 && elixirCount < selectedIndexes.length">Not enough Elixir</div>
        <div class="text-error" v-if="message">{{this.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const cfaContractAddress = '0x93a796B1E846567Fe3577af7B7BB89F71680173a';
const cfaContractAbi = [{"inputs":[{"internalType":"uint256","name":"_tokenLimit","type":"uint256"},{"internalType":"uint256","name":"_secretCommit","type":"uint256"},{"internalType":"address","name":"_renderer","type":"address"},{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyClaimed","type":"error"},{"inputs":[],"name":"ArenaEntryClosed","type":"error"},{"inputs":[],"name":"ArenaIsActive","type":"error"},{"inputs":[],"name":"ArenaNotActive","type":"error"},{"inputs":[],"name":"BalanceNotWithdrawn","type":"error"},{"inputs":[],"name":"GameOver","type":"error"},{"inputs":[],"name":"InvalidClaimAmount","type":"error"},{"inputs":[],"name":"InvalidClaimValue","type":"error"},{"inputs":[],"name":"InvalidJoinCount","type":"error"},{"inputs":[],"name":"InvalidMintValue","type":"error"},{"inputs":[],"name":"InvalidProof","type":"error"},{"inputs":[],"name":"InvalidReveal","type":"error"},{"inputs":[],"name":"LastManStanding","type":"error"},{"inputs":[],"name":"LeavingProhibited","type":"error"},{"inputs":[],"name":"LionsAreHungry","type":"error"},{"inputs":[],"name":"LionsNotHungry","type":"error"},{"inputs":[],"name":"MainSaleNotComplete","type":"error"},{"inputs":[],"name":"NonExistentToken","type":"error"},{"inputs":[],"name":"NotMainSaleStage","type":"error"},{"inputs":[],"name":"NotPreSaleStage","type":"error"},{"inputs":[],"name":"NotYourWarrior","type":"error"},{"inputs":[],"name":"SaleNotComplete","type":"error"},{"inputs":[],"name":"SaleNotOpen","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arenaActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arenaInfo","outputs":[{"components":[{"internalType":"uint256","name":"fallen","type":"uint256"},{"internalType":"uint256","name":"alive","type":"uint256"},{"internalType":"uint256","name":"currentRound","type":"uint256"},{"internalType":"uint256","name":"bounty","type":"uint256"},{"internalType":"uint256","name":"hunger","type":"uint256"},{"internalType":"uint256","name":"nextFeed","type":"uint256"},{"internalType":"uint256","name":"champion","type":"uint256"},{"internalType":"uint256","name":"entryClosedBlock","type":"uint256"},{"internalType":"bool","name":"hungry","type":"bool"},{"internalType":"bool","name":"open","type":"bool"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"bool","name":"gameOver","type":"bool"}],"internalType":"struct ChainFaces2.ArenaInfo","name":"info","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"arenaWaitBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"assembleFace","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blocksPerRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_ogAmount","type":"uint256"},{"internalType":"uint256","name":"_wlAmount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"createFace","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"currentRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entryClosedBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"entryOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"howHungryAreTheLions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"joinArena","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"leaveArena","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mainSaleComplete","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_tokenIds","type":"uint256[]"}],"name":"multiJoinArena","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_alive","type":"bool"}],"name":"myWarriors","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"openArena","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"bool","name":"_alive","type":"bool"}],"name":"ownerWarriors","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"renderSvg","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renderer","outputs":[{"internalType":"contract ChainFaces2Renderer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundsSurvived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleEnds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"saleLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"salePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stage","outputs":[{"internalType":"enum ChainFaces2.Stage","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startMainSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_secretReveal","type":"uint256"}],"name":"theGreatReveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"theLionsAreHungry","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeToEat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSurvivingWarriors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const elixirAddress = '0x29190d0dc19b6c506d01f4d7f305e7aaf5425092';
const elixirItemId = 0;
const elixirABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"consume","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"consumers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_consumer","type":"address"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setConsumer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_metadata","type":"string"}],"name":"setMetadata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"address","name":"_minter","type":"address"},{"internalType":"bool","name":"_state","type":"bool"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];

const upgradeContractAddress = '0x55b3bd7c074ccb74a245d2546273ba690647e8db';
const upgradeContractABI = [{"inputs":[{"internalType":"address","name":"_renderer","type":"address"},{"internalType":"address","name":"_elixir","type":"address"},{"internalType":"address","name":"_cfa","type":"address"},{"internalType":"address","name":"_cf1","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidERC721Token","type":"error"},{"inputs":[],"name":"NotOwner","type":"error"},{"inputs":[],"name":"UnknownTokenId","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"image","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renderer","outputs":[{"internalType":"contract ChainFacesHDRendererInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_renderer","type":"address"}],"name":"setRenderer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"wrapCF1Multi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_ids","type":"uint256[]"}],"name":"wrapCFAMulti","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export default {
  data() {
    return {
      tokens: [],
      selectedIndexes: [],
      message: null,
      web3: null,
      cfaContract: null,
      fetchState: false,
      elixirContract: null,
      elixirCount: 0,
      upgradeContract: null,
      approved: false
    }
  },
  methods: {
    async upgrade2() {
      let accounts = await this.web3.eth.getAccounts();
      let account = accounts[0];

      let gas = await this.upgradeContract.methods.wrapCFAMulti(this.selectedIndexes).estimateGas({
        from: account
      });

      let tx = await this.upgradeContract.methods.wrapCFAMulti(this.selectedIndexes).send({
        from: account,
        gasLimit: gas
      });

      await this.fetch();
    },
    async upgrade() {
      let accounts = await this.web3.eth.getAccounts();
      let account = accounts[0];

      // console.log(this.selectedIndexes);

      //Check Authorization
      this.approved = await this.cfaContract.methods.isApprovedForAll(account, upgradeContractAddress).call();

      if (! this.approved) {
        // this.cfaContract.methods.isApprovedForAll(account, upgradeContractAddress).call();
        let gas = await this.cfaContract.methods.setApprovalForAll(upgradeContractAddress, true).estimateGas({
          from: accounts[0],
        });

        await this.cfaContract.methods.setApprovalForAll(upgradeContractAddress, true).send({
          from: accounts[0],
          gasLimit: gas,
        });

        this.approved = true;
      }
    },
    async fetch() {
      this.fetchState = true;
      this.tokens = [];
      let accounts = await this.web3.eth.getAccounts();
      let account = accounts[0];

      let number = await this.cfaContract.methods.balanceOf(account).call();
      for (let x=0; x<number; x++) {
        let t = await this.cfaContract.methods.tokenOfOwnerByIndex(account, x).call();
        // let svg = await this.$store.dispatch('getSvg', t);

        this.tokens.push({
          tokenId: t,
          svg: ""//svg
        });
      }

      this.elixirCount = await this.elixirContract.methods.balanceOf(account, elixirItemId).call();

      this.fetchState = false;
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
    this.cfaContract = new this.web3.eth.Contract(cfaContractAbi, cfaContractAddress);
    this.elixirContract = new this.web3.eth.Contract(elixirABI, elixirAddress);
    this.upgradeContract = new this.web3.eth.Contract(upgradeContractABI, upgradeContractAddress);
  }
}
</script>