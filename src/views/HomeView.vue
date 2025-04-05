<template>
  <div class="home">
    <h1>Choose your destiny:</h1>
    <section class="main-characters">
      <h2>Main Characters</h2>
      <ul class="character-list">
        <li v-for="character in mainCharacters" :key="character.name">
          <router-link :to="`/fighter/${character.name}`">
            {{ character.name }}
          </router-link>
        </li>
      </ul>
    </section>
    <section class="kameo-characters">
      <h2>Kameo Characters</h2>
      <ul class="character-list">
        <li v-for="character in kameoCharacters" :key="character.name">
          <router-link :to="`/kameo/${character.name}`">
            {{ character.name }}
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
    mainCharacters() {
      return fightersData.filter(f => f.type === 'main');
    },
    kameoCharacters() {
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

.character-list {
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
  .character-list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) {
  .character-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .character-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1240px) {
  .character-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1440px) {
  .character-list {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1600px) {
  .character-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>