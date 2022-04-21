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
        <td>{{ leaderboard[index + currentIndex].tokens.length }}</td>
        <td>
          {{
            (
              (leaderboard[index + currentIndex].tokens.length / 26969) *
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
import API from "../Contract";

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
    this.onSetLeaderboard(await API.fetchLeaderboard(this.onSetLeaderboard, holder));
  },
  methods: {
    onSetLeaderboard(database) {
      this.leaderboard = database.sort(
        (left, right) => (left.tokens.length < right.tokens.length) ? 1 : (left.tokens.length > right.tokens.length) ? -1 : 0
      );
    },
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
    }
  },
  computed: {},
};
</script>
