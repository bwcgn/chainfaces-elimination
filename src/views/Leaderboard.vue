<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<template>
  <div class="home">
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-bottom: 10px;
      "
    >
      <button class="btn btn-primary" @click="onFirst" style="margin: 5px">
        First
      </button>
      <button class="btn btn-primary" @click="onPrevious" style="margin: 5px">
        {{ "<" }}
      </button>
      <button
        class="btn btn-primary"
        @click="onSwitchElementsToDisplay"
        style="margin: 5px"
      >
        {{ `${currentIndex + 1} - ${currentIndex + elementsToDisplay}` }}
      </button>
      <button class="btn btn-primary" @click="onNext" style="margin: 5px">
        {{ ">" }}
      </button>
      <button class="btn btn-primary" @click="onLast" style="margin: 5px">
        Last
      </button>
    </div>
    <table style="width: 100%">
      <tr>
        <th>Rank</th>
        <th>Address</th>
        <th>Quantity</th>
        <th>Percentage</th>
      </tr>
      <tr v-for="(rank, index) in elementsToDisplay" :key="index">
        <td>{{ rank + currentIndex }}</td>
        <td>{{ leaderboard[index + currentIndex].address }}</td>
        <td>{{ leaderboard[index + currentIndex].token.length }}</td>
        <td>
          {{
            (
              (leaderboard[index + currentIndex].token.length / 26969) *
              100
            ).toFixed(2)
          }}%
        </td>
      </tr>
    </table>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-top: 10px;
      "
    >
      <button class="btn btn-primary" @click="onFirst" style="margin: 5px">
        First
      </button>
      <button class="btn btn-primary" @click="onPrevious" style="margin: 5px">
        {{ "<" }}
      </button>
      <button
        class="btn btn-primary"
        @click="onSwitchElementsToDisplay"
        style="margin: 5px;"
      >
        {{ `${currentIndex + 1} - ${currentIndex + elementsToDisplay}` }}
      </button>
      <button class="btn btn-primary" @click="onNext" style="margin: 5px">
        {{ ">" }}
      </button>
      <button class="btn btn-primary" @click="onLast" style="margin: 5px">
        Last
      </button>
    </div>
  </div>
</template>

<script>
import holder from "../store/data/holder.json";

const latestBlock = 14611087;

export default {
  name: "Leaderboard",
  data() {
    return {
      leaderboard: holder,
      elementsToDisplay: 10,
      currentIndex: 0,
    };
  },
  async mounted() {
    this.fetchTransfers(latestBlock);
  },
  methods: {
    onFirst() {
      this.currentIndex = 0;
    },
    onPrevious() {
      const newIndex = this.currentIndex - this.elementsToDisplay;
      if (newIndex < 0) {
        this.onFirst();
      } else {
        this.currentIndex = newIndex;
      }
    },
    onSwitchElementsToDisplay() {
      switch (this.elementsToDisplay) {
        case 10:
          if (this.currentIndex + 25 > this.leaderboard.length) this.currentIndex -= 15;
          this.elementsToDisplay = 25;
          break;
        case 25:
          if (this.currentIndex + 50 > this.leaderboard.length) this.currentIndex -= 25;
          this.elementsToDisplay = 50;
          break;
        case 50:
          if (this.currentIndex + 100 > this.leaderboard.length) this.currentIndex -= 50;
          this.elementsToDisplay = 100;
          break;
        default:
          this.elementsToDisplay = 10;
          break;
      }
    },
    onNext() {
      const newIndex = this.currentIndex + this.elementsToDisplay;
      if (this.leaderboard.length - this.elementsToDisplay < newIndex) {
        this.onLast();
      } else {
        this.currentIndex = newIndex;
      }
    },
    onLast() {
      this.currentIndex = this.leaderboard.length - this.elementsToDisplay;
    },
    async fetchTransfers(startBlock) {
      const address = "0x93a796b1e846567fe3577af7b7bb89f71680173a";
      const topic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
      const apikey = "REPLACE_WITH_YOUR_API_KEY";
      const url = `https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=${startBlock}&toBlock=latest&address=${address}&topic0=${topic}&apikey=${apikey}`;
      const result = await fetch(url);
      const json = await result.json();
      if (json.status !== "1") {
          console.log("data is up to date");
          return;
      }
      const transactions = json.result;
      transactions.forEach((transaction) => {
        const sender = transaction.topics[1].replace(/^0x0+/, "0x");
        const receiver = transaction.topics[2].replace(/^0x0+/, "0x");
        const token = parseInt(transaction.topics[3], 16);
        const leaderboardSender = this.leaderboard.find(
          (holder) => holder.address === sender
        );
        if (leaderboardSender !== undefined) {
            const index = leaderboardSender.token.indexOf(token);
            if (index > -1) leaderboardSender.token.splice(index, 1);
        }
        const leaderboardReceiver = this.leaderboard.find(
          (holder) => holder.address === receiver
        );
        if (leaderboardReceiver === undefined) {
            this.leaderboard.push({
                address: receiver,
                token: [token]
            })
        } else {
            leaderboardReceiver.token.push(token);
        }
      });
      this.leaderboard = this.leaderboard.sort(
        (left, right) => (left.token.length < right.token.length) ? 1 : (left.token.length > right.token.length) ? -1 :0
    );
      await this.fetchTransfers(parseInt(transactions.slice(-1)[0].blockNumber, 16)+1)
    },
  },
  computed: {},
};
</script>
