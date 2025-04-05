<template>
  <div class="home">
    <h1>Choose your destiny:</h1>
    <section class="main-fighters">
      <h2>Main Fighters</h2>
      <ul class="fighter-list">
        <li v-for="fighter in mainFighters" :key="fighter.name">
          <router-link :to="`/fighter/${fighter.name}`">
            {{ fighter.name }}
          </router-link>
        </li>
      </ul>
    </section>
    <section class="kameo-fighters">
      <h2>Kameo Fighters</h2>
      <ul class="fighter-list">
        <li v-for="fighter in kameoFighters" :key="fighter.name">
          <router-link :to="`/kameo/${fighter.name}`">
            {{ fighter.name }}
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import fightersData from '../data/fighters.json';

export default {
  name: 'HomeView',
  computed: {
    mainFighters() {
      return fightersData.filter(f => f.type === 'main');
    },
    kameoFighters() {
      return fightersData.filter(f => f.type === 'kameo');
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  color: var(--text-color);
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: var(--accent-color);
  font-size: 1.3rem;
}

.fighter-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;

  li {
    a {
      color: var(--link-color);
      text-decoration: none;
      font-size: 1.2rem;

      &:hover {
        color: var(--link-hover);
      }
    }
  }
}

@media (max-width: 768px) {
  .fighter-list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) {
  .fighter-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .fighter-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1240px) {
  .fighter-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1440px) {
  .fighter-list {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1600px) {
  .fighter-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>