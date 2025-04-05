<template>
  <div class="fighter-page">
    <h1>{{ fighter.name }} - Move List</h1>
    
    <section v-if="isMainFighter">
      <div class="tabs">
        <button :class="{ active: activeTab === 'strings' }" @click="activeTab = 'strings'">Strings</button>
        <button :class="{ active: activeTab === 'special' }" @click="activeTab = 'special'">Special Moves</button>
        <button :class="{ active: activeTab === 'air' }" @click="activeTab = 'air'">Air Attacks</button>
      </div>

      <div class="tab-content" v-if="activeTab === 'strings'">
        <h2>Strings</h2>
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr><th>Name</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).variationName }}</td></tr>
              <tr><th>Type</th><td v-for="(move, index) in strings" :key="move.name">{{ move.type }}</td></tr>
              <tr><th>Input</th><td v-for="(move, index) in strings" :key="move.name">
                <select v-model="stringSelections[index]" @change="updateSelection('strings', index)">
                  <option v-for="variation in move.variations" :key="variation.input" :value="variation.input">{{ variation.input }}</option>
                </select>
              </td></tr>
              <tr><th>Attack Type</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).attackType }}</td></tr>
              <tr><th>Startup</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).startup }}</td></tr>
              <tr><th>Active</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).active }}</td></tr>
              <tr><th>Recovery</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).recovery }}</td></tr>
              <tr><th>On Block</th><td v-for="(move, index) in strings" :key="move.name" :class="getOnBlockClass(selectedStringVariation(move, index).onBlock)">{{ selectedStringVariation(move, index).onBlock }}</td></tr>
              <tr><th>Cancelable</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).cancelable ? 'Yes' : 'No' }}</td></tr>
              <tr><th>Cancel Advantage</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).cancelable ? selectedStringVariation(move, index).cancelAdvantage : '-' }}</td></tr>
              <tr v-if="hasExtraOptions(strings)"><th>Extra Options</th><td v-for="(move, index) in strings" :key="move.name"><div v-if="move.extraOptions" class="extra-options"><span v-for="(option, idx) in move.extraOptions" :key="idx" class="option">{{ option }}</span></div><span v-else>-</span></td></tr>
              <tr><th>Damage</th><td v-for="(move, index) in strings" :key="move.name">{{ selectedStringVariation(move, index).damage }}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="tab-content" v-if="activeTab === 'special'">
        <h2>Special Moves</h2>
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr><th>Name</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ move.name }}</td></tr>
              <tr><th>Type</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ move.type }}</td></tr>
              <tr><th>Input</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ move.input }}</td></tr>
              <tr><th>Enhanced</th><td v-for="(move, index) in specialMoves" :key="move.name">
                <select v-model="specialSelections[index]" @change="updateSelection('special', index)">
                  <option value="normal">Normal</option>
                  <option v-if="move.enhanced" value="enhanced">Enhanced ({{ move.enhanced.cost }})</option>
                </select>
              </td></tr>
              <tr><th>Attack Type</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ selectedSpecialVariation(move, index).attackType }}</td></tr>
              <tr><th>Startup</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ selectedSpecialVariation(move, index).startup }}</td></tr>
              <tr><th>Active</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ selectedSpecialVariation(move, index).active }}</td></tr>
              <tr><th>Recovery</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ selectedSpecialVariation(move, index).recovery }}</td></tr>
              <tr><th>On Block</th><td v-for="(move, index) in specialMoves" :key="move.name" :class="getOnBlockClass(selectedSpecialVariation(move, index).onBlock)">{{ selectedSpecialVariation(move, index).onBlock }}</td></tr>
              <tr><th>Cancelable</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ selectedSpecialVariation(move, index).cancelable ? 'Yes' : 'No' }}</td></tr>
              <tr><th>Cancel Advantage</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ selectedSpecialVariation(move, index).cancelable ? selectedSpecialVariation(move, index).cancelAdvantage : '-' }}</td></tr>
              <tr v-if="hasExtraOptions(specialMoves)"><th>Extra Options</th><td v-for="(move, index) in specialMoves" :key="move.name"><div v-if="move.extraOptions" class="extra-options"><span v-for="(option, idx) in move.extraOptions" :key="idx" class="option">{{ option }}</span></div><span v-else>-</span></td></tr>
              <tr><th>Usable in Air</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ move.usableInAir ? 'Yes' : 'No' }}</td></tr>
              <tr><th>Damage</th><td v-for="(move, index) in specialMoves" :key="move.name">{{ selectedSpecialVariation(move, index).damage }}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="tab-content" v-if="activeTab === 'air'">
        <h2>Air Attacks</h2>
        <div class="table-wrapper">
          <table>
            <tbody>
              <tr><th>Name</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).variationName }}</td></tr>
              <tr><th>Type</th><td v-for="(move, index) in airMoves" :key="move.name">{{ move.type }}</td></tr>
              <tr><th>Input</th><td v-for="(move, index) in airMoves" :key="move.name">
                <select v-model="airSelections[index]" @change="updateSelection('air', index)">
                  <option v-for="variation in move.variations" :key="variation.input" :value="variation.input">{{ variation.input }}</option>
                </select>
              </td></tr>
              <tr><th>Attack Type</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).attackType }}</td></tr>
              <tr><th>Startup</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).startup }}</td></tr>
              <tr><th>Active</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).active }}</td></tr>
              <tr><th>Recovery</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).recovery }}</td></tr>
              <tr><th>Cancelable</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).cancelable ? 'Yes' : 'No' }}</td></tr>
              <tr><th>Cancel Advantage</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).cancelable ? selectedAirVariation(move, index).cancelAdvantage : '-' }}</td></tr>
              <tr v-if="hasExtraOptions(airMoves)"><th>Extra Options</th><td v-for="(move, index) in airMoves" :key="move.name"><div v-if="move.extraOptions" class="extra-options"><span v-for="(option, idx) in move.extraOptions" :key="idx" class="option">{{ option }}</span></div><span v-else>-</span></td></tr>
              <tr><th>Damage</th><td v-for="(move, index) in airMoves" :key="move.name">{{ selectedAirVariation(move, index).damage }}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section v-if="isKameoFighter">
      <h2>Kameo Moves</h2>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr><th>Name</th><td v-for="move in fighter.moves" :key="move.name">{{ move.name }}</td></tr>
            <tr><th>Type</th><td v-for="move in fighter.moves" :key="move.name">{{ move.type }}</td></tr>
            <tr><th>Input</th><td v-for="move in fighter.moves" :key="move.name">{{ move.input }}</td></tr>
            <tr><th>Attack Type</th><td v-for="move in fighter.moves" :key="move.name">{{ move.attackType }}</td></tr>
            <tr><th>Startup</th><td v-for="move in fighter.moves" :key="move.name">{{ move.startup }}</td></tr>
            <tr><th>Active</th><td v-for="move in fighter.moves" :key="move.name">{{ move.active }}</td></tr>
            <tr><th>Recovery</th><td v-for="move in fighter.moves" :key="move.name">{{ move.recovery }}</td></tr>
            <tr><th>On Block</th><td v-for="move in fighter.moves" :key="move.name" :class="getOnBlockClass(move.onBlock)">{{ move.onBlock }}</td></tr>
            <tr><th>Cancelable</th><td v-for="move in fighter.moves" :key="move.name">{{ move.cancelable ? 'Yes' : 'No' }}</td></tr>
            <tr><th>Cancel Advantage</th><td v-for="move in fighter.moves" :key="move.name">{{ move.cancelable ? move.cancelAdvantage : '-' }}</td></tr>
            <tr v-if="hasExtraOptions(fighter.moves)"><th>Extra Options</th><td v-for="move in fighter.moves" :key="move.name"><div v-if="move.extraOptions" class="extra-options"><span v-for="(option, index) in move.extraOptions" :key="index" class="option">{{ option }}</span></div><span v-else>-</span></td></tr>
            <tr><th>Ambush</th><td v-for="move in fighter.moves" :key="move.name">{{ move.ambush ? 'Yes' : 'No' }}</td></tr>
            <tr><th>Kameo Meter Cost</th><td v-for="move in fighter.moves" :key="move.name">{{ move.kameoMeterCost }}</td></tr>
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
      fighter: {},
      activeTab: 'strings',
      stringSelections: [],
      specialSelections: [],
      airSelections: []
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
    },
    airMoves() {
      return this.fighter.moves.filter(move => move.type === 'air');
    }
  },
  created() {
    const fighterName = this.$route.params.name;
    this.fighter = fightersData.find(f => f.name === fighterName) || {};
    this.initializeSelections();
  },
  methods: {
    initializeSelections() {
      this.stringSelections = this.strings.map(move => move.variations[move.variations.length - 1].input);
      this.specialSelections = this.specialMoves.map(() => 'normal');
      this.airSelections = this.airMoves.map(move => move.variations[move.variations.length - 1].input);
    },
    getOnBlockClass(onBlock) {
      if (onBlock >= 0) return 'no-initiative-loss'; // Без потери инициативы
      if (onBlock >= -6) return 'initiative-loss'; // С потерей инициативы
      return 'unsafe'; // Небезопасный
    },
    hasExtraOptions(moves) {
      return moves.some(move => move.extraOptions && move.extraOptions.length > 0);
    },
    selectedStringVariation(move, index) {
      return move.variations.find(v => v.input === this.stringSelections[index]) || move.variations[0];
    },
    selectedSpecialVariation(move, index) {
      if (this.specialSelections[index] === 'enhanced' && move.enhanced) {
        return { ...move, ...move.enhanced };
      }
      return move;
    },
    selectedAirVariation(move, index) {
      return move.variations.find(v => v.input === this.airSelections[index]) || move.variations[0];
    },
    updateSelection(type, index) {
      if (type === 'strings') this.stringSelections = [...this.stringSelections];
      if (type === 'special') this.specialSelections = [...this.specialSelections];
      if (type === 'air') this.airSelections = [...this.airSelections];
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
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 1); /* Та же тень, что в main.scss */
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  background-color: var(--table-bg);
  border: 1px solid #333;
  border-radius: 5px;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tabs button.active {
  background-color: var(--accent-color);
  color: var(--bg-color);
}

.tabs button:hover:not(.active) {
  background-color: var(--table-hover);
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
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
  }

  td {
    background-color: var(--table-bg);

    &:hover {
      background-color: var(--table-hover);
    }
  }

  select {
    background-color: var(--table-bg);
    color: var(--text-color);
    border: 1px solid #333;
    border-radius: 3px;
    padding: 5px;
  }

  .no-initiative-loss { /* Было .safe */
    color: #008000;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
  }

  .initiative-loss { /* Было .unsafe */
    color: #e6b800;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
  }

  .unsafe { /* Было .punishable */
    color: #ff3333;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
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

/* Медиа-запросы без изменений */
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
  .tabs button {
    padding: 8px 15px;
    font-size: 0.9rem;
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
  .tabs button {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
  select {
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