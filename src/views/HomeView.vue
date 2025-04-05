<template>
  <div class="home">
    <h1>Choose your destiny:</h1>
    <ul class="fighter-list">
      <li v-for="fighter in fighters" :key="fighter.name">
        <router-link :to="`/fighter/${fighter.name}`">
          {{ fighter.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import fightersData from '../data/fighters.json';

export default {
  name: 'HomeView',
  data() {
    return {
      fighters: fightersData
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.fighter-list {
  list-style: none;
  padding: 0;

  li {
    margin: 10px 0;

    a {
      color: $link-blue;
      text-decoration: none;
      font-size: 1.2rem;

      &:hover {
        color: lighten($link-blue, 20%);
      }
    }
  }
}
</style>