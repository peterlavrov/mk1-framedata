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
  margin: 0 auto;
  color: var(--text-color);
  padding-top: 60px;
}

section {
  margin-bottom: 2rem;
}

.character-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;

  li {
    a {
      display: block;
      padding: 10px 20px;
      background-color: #223e6b; // Фон для обеих тем
      color: #b2c1d8; // Цвет текста для обеих тем
      text-decoration: none;
      font-size: 1.2rem;
      border-radius: 5px;
      transition: color 0.3s ease;

      &:hover {
        color: #c1950e; // Цвет при наведении для обеих тем
        background-color: #223e6b; // Фон не меняется
      }
    }
  }
}

@media (max-width: 768px) {
  .character-list li a {
    padding: 8px 15px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .character-list li a {
    padding: 6px 10px;
    font-size: 0.9rem;
  }
}
</style>