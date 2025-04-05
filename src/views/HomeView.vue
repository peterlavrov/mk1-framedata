<template>
  <div>
    <h2>Choose your destiny:</h2>
    <ul>
      <li v-for="fighter in fighters" :key="fighter.name">
        <router-link :to="`/fighter/${fighter.name}`">
          {{ fighter.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import fightersData from '../data/fighters.json'; // Импортируем JSON

export default {
  name: 'HomeView',
  data() {
    return {
      fighters: fightersData // Присваиваем данные в состояние компонента
    };
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>