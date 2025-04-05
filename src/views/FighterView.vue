<template>
  <div>
    <h1>{{ fighter.name }} - Move List</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Input</th>
          <th>Startup</th>
          <th>Active</th>
          <th>Recovery</th>
          <th>On Block</th>
          <th>Damage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="move in fighter.moves" :key="move.name">
          <td>{{ move.name }}</td>
          <td>{{ move.input }}</td>
          <td>{{ move.startup }}</td>
          <td>{{ move.active }}</td>
          <td>{{ move.recovery }}</td>
          <td>{{ move.onBlock }}</td>
          <td>{{ move.damage }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/">Back to Choose your destiny</router-link>
  </div>
</template>

<script>
import fightersData from '../data/fighters.json';

export default {
  name: 'FighterView',
  data() {
    return {
      fighter: {}
    };
  },
  created() {
    const fighterName = this.$route.params.name; // Получаем имя бойца из URL
    this.fighter = fightersData.find(f => f.name === fighterName) || {};
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f4f4f4;
}
</style>