<template>
    <div class="home">
        <h1>Chainfaces HD Rarity Statistics</h1>
        <h3>These stats are derived by eliminating dead tokens</h3>

      <div class="container text-center">
        <div class="row">
          <div class="col-3" v-for="(k,i) in keys">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{k}}</h5>
                <table>
                  <tbody>
                  <tr v-for="(attr, index) in data[k]">
                    <td>{{index}}</td>
                    <td>{{attr}}</td>
                    <td>{{calcRarity(attr)}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import data from '@/hd_metadata_db.json';


export default {
    name: 'Home',
    data() {
        return {
          total: 14192,
          keys: Object.keys(data),
          data: data,
        }
    },
    methods: {
      calcRarity(i) {
        return (parseFloat(i) / this.total * 100).toFixed(4) + "%"
      }
    },
}
</script>
