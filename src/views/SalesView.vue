<template>
    <div class="about">
            <h1>Collection View</h1>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Attribute</th>
                    <th scope="col">Total</th>
                    <th scope="col">Available</th>
                    <th scope="col">Cheapest</th>
                    <th scope="col">Examples</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(v,i) in attributes" :key="i">
                  <td>{{v.attribute}}</td>
                  <td>{{v.total}}</td>
                  <td>{{v.available}}</td>
                  <td>{{v.price}}</td>
                  <td>{{v.examples}}</td>
                </tr>
                </tbody>
            </table>
        </div>
</template>

<script>
export default {
    data() {
        return {
          attributes: []
        }
    },
    computed: {

    },
}
</script>
