<template>
  <div class="fighter-page">
    <h1>{{ fighter.name }} - Move List</h1>
    
    <section v-if="isMainFighter">
      <h2>Strings</h2>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr><th>Name</th><td v-for="move in strings" :key="move.name">{{ move.name }}</td></tr>
            <tr><th>Type</th><td v-for="move in strings" :key="move.name">{{ move.type }}</td></tr>
            <tr><th>Attack Type</th><td v-for="move in strings" :key="move.name">{{ move.attackType }}</td></tr>
            <tr><th>Input</th><td v-for="move in strings" :key="move.name">{{ move.input }}</td></tr>
            <tr><th>Startup</th><td v-for="move in strings" :key="move.name">{{ move.startup }}</td></tr>
            <tr><th>Active</th><td v-for="move in strings" :key="move.name">{{ move.active }}</td></tr>
            <tr><th>Recovery</th><td v-for="move in strings" :key="move.name">{{ move.recovery }}</td></tr>
            <tr><th>On Block</th><td v-for="move in strings" :key="move.name" :class="getOnBlockClass(move.onBlock)">{{ move.onBlock }}</td></tr>
            <tr><th>Cancelable</th><td v-for="move in strings" :key="move.name">{{ move.cancelable ? 'Yes' : 'No' }}</td></tr>
            <tr><th>Cancel Advantage</th><td v-for="move in strings" :key="move.name">{{ move.cancelable ? move.cancelAdvantage : '-' }}</td></tr>
            <tr v-if="hasExtraOptions(strings)"><th>Extra Options</th><td v-for="move in strings" :key="move.name"><div v-if="move.extraOptions" class="extra-options"><span v-for="(option, index) in move.extraOptions" :key="index" class="option">{{ option }}</span></div><span v-else>-</span></td></tr>
            <tr><th>Damage</th><td v-for="move in strings" :key="move.name">{{ move.damage }}</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Special Moves</h2>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr><th>Name</th><td v-for="move in specialMoves" :key="move.name">{{ move.name }}</td></tr>
            <tr><th>Type</th><td v-for="move in specialMoves" :key="move.name">{{ move.type }}</td></tr>
            <tr><th>Attack Type</th><td v-for="move in specialMoves" :key="move.name">{{ move.attackType }}</td></tr>
            <tr><th>Input</th><td v-for="move in specialMoves" :key="move.name">{{ move.input }}</td></tr>
            <tr><th>Startup</th><td v-for="move in specialMoves" :key="move.name">{{ move.startup }}</td></tr>
            <tr><th>Active</th><td v-for="move in specialMoves" :key="move.name">{{ move.active }}</td></tr>
            <tr><th>Recovery</th><td v-for="move in specialMoves" :key="move.name">{{ move.recovery }}</td></tr>
            <tr><th>On Block</th><td v-for="move in specialMoves" :key="move.name" :class="getOnBlockClass(move.onBlock)">{{ move.onBlock }}</td></tr>
            <tr><th>Cancelable</th><td v-for="move in specialMoves" :key="move.name">{{ move.cancelable ? 'Yes' : 'No' }}</td></tr>
            <tr><th>Cancel Advantage</th><td v-for="move in specialMoves" :key="move.name">{{ move.cancelable ? move.cancelAdvantage : '-' }}</td></tr>
            <tr v-if="hasExtraOptions(specialMoves)"><th>Extra Options</th><td v-for="move in specialMoves" :key="move.name"><div v-if="move.extraOptions" class="extra-options"><span v-for="(option, index) in move.extraOptions" :key="index" class="option">{{ option }}</span></div><span v-else>-</span></td></tr>
            <tr><th>Damage</th><td v-for="move in specialMoves" :key="move.name">{{ move.damage }}</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="isKameoFighter">
      <h2>Kameo Moves</h2>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr><th>Name</th><td v-for="move in fighter.moves" :key="move.name">{{ move.name }}</td></tr>
            <tr><th>Type</th><td v-for="move in fighter.moves" :key="move.name">{{ move.type }}</td></tr>
            <tr><th>Attack Type</th><td v-for="move in fighter.moves" :key="move.name">{{ move.attackType }}</td></tr>
            <tr><th>Input</th><td v-for="move in fighter.moves" :key="move.name">{{ move.input }}</td></tr>
            <tr><th>Startup</th><td v-for="move in fighter.moves" :key="move.name">{{ move.startup }}</td></tr>
            <tr><th>Active</th><td v-for="move in fighter.moves" :key="move.name">{{ move.active }}</td></tr>
            <tr><th>Recovery</th><td v-for="move in fighter.moves" :key="move.name">{{ move.recovery }}</td></tr>
            <tr><th>On Block</th><td v-for="move in fighter.moves" :key="move.name" :class="getOnBlockClass(move.onBlock)">{{ move.onBlock }}</td></tr>
            <tr><th>Cancelable</th><td v-for="move in fighter.moves" :key="move.name">{{ move.cancelable ? 'Yes' : 'No' }}</td></tr>
            <tr><th>Cancel Advantage</th><td v-for="move in fighter.moves" :key="move.name">{{ move.cancelable ? move.cancelAdvantage : '-' }}</td></tr>
            <tr v-if="hasExtraOptions(fighter.moves)"><th>Extra Options</th><td v-for="move in fighter.moves" :key="move.name"><div v-if="move.extraOptions" class="extra-options"><span v-for="(option, index) in move.extraOptions" :key="index" class="option">{{ option }}</span></div><span v-else>-</span></td></tr>
            <tr><th>Ambush</th><td v-for="move in fighter.moves" :key="move.name">{{ move.ambush ? 'Yes' : 'No' }}</td></tr>
            <tr><th>Damage</th><td v-for="move in fighter.moves" :key="move.name">{{ move.damage }}</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <router-link to="/" class="back-link">Back to Home</router-link>
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
  computed: {
    isMainFighter() {
      return this.fighter.type === 'main';
    },
    isKameoFighter() {
      return this.fighter.type === 'kameo';
    },
    strings() {
      return this.fighter.moves.filter(move => move.type === 'string');
    },
    specialMoves() {
      return this.fighter.moves.filter(move => move.type === 'special move');
    }
  },
  created() {
    const fighterName = this.$route.params.name;
    this.fighter = fightersData.find(f => f.name === fighterName) || {};
  },
  methods: {
    getOnBlockClass(onBlock) {
      if (onBlock >= 0) return 'safe';
      if (onBlock >= -6) return 'unsafe';
      return 'punishable';
    },
    hasExtraOptions(moves) {
      return moves.some(move => move.extraOptions && move.extraOptions.length > 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.fighter-page {
  max-width: 1000px;
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

.table-wrapper {
  overflow-x: auto;
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    border: 1px solid #333;
    text-align: center;
  }

  th {
    background-color: var(--accent-color);
    color: var(--bg-color);
    white-space: nowrap;
  }

  td {
    background-color: var(--table-bg);

    &:hover {
      background-color: var(--table-hover);
    }
  }

  .safe {
    color: #00cc00;
  }

  .unsafe {
    color: #ffcc00;
  }

  .punishable {
    color: #ff3333;
  }

  .extra-options {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .option {
    display: block;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
}

.back-link {
  display: inline-block;
  color: var(--link-color);
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: var(--link-hover);
  }
}

@media (max-width: 768px) {
  .fighter-page {
    max-width: 100%;
  }
  table {
    font-size: 14px;
  }
  th, td {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  table {
    font-size: 12px;
  }
  th, td {
    padding: 6px;
  }
  .option {
    padding: 3px;
    font-size: 11px;
  }
}

@media (min-width: 1110px) {
  .fighter-page {
    max-width: 1400px;
  }
}

@media (min-width: 1240px) {
  .fighter-page {
    max-width: 1600px;
  }
}

@media (min-width: 1440px) {
  .fighter-page {
    max-width: 1800px;
  }
}

@media (min-width: 1600px) {
  .fighter-page {
    max-width: 2000px;
  }
}
</style>