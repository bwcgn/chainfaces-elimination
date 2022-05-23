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
        <td>
          <a :href="'https://opensea.io/' + leaderboard[index + currentIndex].address" target="_blank" rel="noreferrer noopener">
            {{
              renderAddress(leaderboard[index + currentIndex].address)
            }}
          </a>
        </td>
        <td>{{ leaderboard[index + currentIndex].total }}</td>
        <td>
          {{
            (
              (leaderboard[index + currentIndex].total / 26969) *
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
import holder from "../store/data/holders.json";

export default {
  name: "Leaderboard",
  data() {
    return {
      leaderboard: holder,
      elementsToDisplay: 50,
      currentIndex: 0,
    };
  },
  async mounted() {
    this.onSetLeaderboard(holder);
    this.onFetchCurrentENS();
  },
  methods: {
    renderAddress(addr) {
      if (addr === '0x7039d65e346fdeebbc72514d718c88699c74ba4b') {
        return 'Dead Faces';
      }

      return addr;
    },

onSetLeaderboard(database) {
      this.leaderboard = database.sort(
        (left, right) => (left.total < right.total) ? 1 : (left.total > right.total) ? -1 : 0
      );
    },
    onFetchCurrentENS() {
      const index = this.currentIndex;
      const elementsToDisplay = this.elementsToDisplay;
      for (let i = index; i < index + elementsToDisplay; i++) {
        this.fetchENS(i);
      }
    },
    async fetchENS(index) {

    },
    onFirst() {
      this.currentIndex = 0;
      this.onFetchCurrentENS();
    },
    onPrevious() {
      const newIndex = this.currentIndex - this.elementsToDisplay;
      if (newIndex < 0) {
        this.onFirst();
      } else {
        this.currentIndex = newIndex;
      }
      this.onFetchCurrentENS();
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
      this.onFetchCurrentENS();
    },
    onNext() {
      const newIndex = this.currentIndex + this.elementsToDisplay;
      if (this.leaderboard.length - this.elementsToDisplay < newIndex) {
        this.onLast();
      } else {
        this.currentIndex = newIndex;
      }
      this.onFetchCurrentENS();
    },
    onLast() {
      this.currentIndex = this.leaderboard.length - this.elementsToDisplay;
      this.onFetchCurrentENS();
    }
  },
  computed: {},
};
</script>
