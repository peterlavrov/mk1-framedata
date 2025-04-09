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
        <div class="tab-header">
          <h2>Strings</h2>
          <router-link to="/" class="back-link">Back to Choose Your Destiny</router-link>
        </div>
        <div class="table-wrapper" ref="tableWrapper">
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
        <div class="tab-header">
          <h2>Special Moves</h2>
          <router-link to="/" class="back-link">Back to Choose Your Destiny</router-link>
        </div>
        <div class="table-wrapper" ref="tableWrapper">
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
        <div class="tab-header">
          <h2>Air Attacks</h2>
          <router-link to="/" class="back-link">Back to Choose Your Destiny</router-link>
        </div>
        <div class="table-wrapper" ref="tableWrapper">
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
      <div class="tab-header">
        <h2>Kameo Moves</h2>
        <router-link to="/" class="back-link">Back to Choose Your Destiny</router-link>
      </div>
      <div class="table-wrapper" ref="tableWrapper">
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
            <tr><th>Activation Cost</th><td v-for="move in fighter.moves" :key="move.name">{{ typeof move.kameoMeterCost === 'object' ? move.kameoMeterCost.activation : move.kameoMeterCost }}</td></tr>
            <tr v-if="hasHoldCost(fighter.moves)"><th>Hold Cost</th><td v-for="move in fighter.moves" :key="move.name">{{ typeof move.kameoMeterCost === 'object' && move.kameoMeterCost.hold ? move.kameoMeterCost.hold : '-' }}</td></tr>
            <tr><th>Damage</th><td v-for="move in fighter.moves" :key="move.name">{{ move.damage }}</td></tr>
          </tbody>
        </table>
      </div>
    </section>
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
      airSelections: [],
      isDragging: false,
      startX: 0,
      scrollLeft: 0
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
  mounted() {
    this.setupDragScroll();
  },
  watch: {
    activeTab() {
      this.$nextTick(() => {
        this.setupDragScroll();
      });
    }
  },
  methods: {
    initializeSelections() {
      this.stringSelections = this.strings.map(move => move.variations[move.variations.length - 1].input);
      this.specialSelections = this.specialMoves.map(() => 'normal');
      this.airSelections = this.airMoves.map(move => move.variations[move.variations.length - 1].input);
    },
    getOnBlockClass(onBlock) {
      if (onBlock >= 0) return 'no-initiative-loss';
      if (onBlock >= -6) return 'initiative-loss';
      return 'unsafe';
    },
    hasExtraOptions(moves) {
      return moves.some(move => move.extraOptions && move.extraOptions.length > 0);
    },
    hasHoldCost(moves) {
      return moves.some(move => typeof move.kameoMeterCost === 'object' && move.kameoMeterCost.hold);
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
    },
    setupDragScroll() {
      const wrapper = this.$refs.tableWrapper;
      if (!wrapper) return;

      wrapper.removeEventListener('mousedown', this.handleMouseDown);
      wrapper.removeEventListener('mouseleave', this.handleMouseLeave);
      wrapper.removeEventListener('mouseup', this.handleMouseUp);
      wrapper.removeEventListener('mousemove', this.handleMouseMove);

      this.handleMouseDown = (e) => {
        this.isDragging = true;
        this.startX = e.pageX - wrapper.offsetLeft;
        this.scrollLeft = wrapper.scrollLeft;
        wrapper.classList.add('dragging');
      };

      this.handleMouseLeave = () => {
        this.isDragging = false;
        wrapper.classList.remove('dragging');
      };

      this.handleMouseUp = () => {
        this.isDragging = false;
        wrapper.classList.remove('dragging');
      };

      this.handleMouseMove = (e) => {
        if (!this.isDragging) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = x - this.startX;
        wrapper.scrollLeft = this.scrollLeft - walk;

        if (wrapper.scrollLeft < 0) wrapper.scrollLeft = 0;
        if (wrapper.scrollLeft > wrapper.scrollWidth - wrapper.clientWidth) {
          wrapper.scrollLeft = wrapper.scrollWidth - wrapper.clientWidth;
        }
      };

      wrapper.addEventListener('mousedown', this.handleMouseDown);
      wrapper.addEventListener('mouseleave', this.handleMouseLeave);
      wrapper.addEventListener('mouseup', this.handleMouseUp);
      wrapper.addEventListener('mousemove', this.handleMouseMove);
    }
  }
};
</script>

<style lang="scss" scoped>
.fighter-page {
  margin: 0 auto;
  color: var(--text-color);
  padding-top: 60px;
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
}

section {
  margin-bottom: 2rem;
  max-width: 100%;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  max-width: 100%;
}

.tab-content {
  max-width: 100%;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  max-width: 100%;
  flex-wrap: wrap;

  button {
    padding: 10px 20px;
    background-color: var(--table-bg);
    border: 1px solid #333333;
    border-radius: 5px;
    color: var(--text-color);
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
      background-color: var(--accent-color);
      color: #ffffff;
      text-shadow: 2px 2px 4px #000000;
    }

    &:hover:not(.active) {
      background-color: var(--table-hover);
    }
  }
}

.table-wrapper {
  overflow-x: auto;
  margin: 20px 0;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
  user-select: none;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: hidden;

  &.dragging {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

table {
  width: 100%;
  position: relative;
  border-spacing: 0;

  tr {
    margin: 0;
  }

  th {
    padding: 12px;
    border: 1px solid #333333;
    text-align: center;
    background-color: var(--accent-color);
    color: #ffffff;
    text-shadow: 2px 2px 4px #000000;
    position: sticky;
    left: 0;
    min-width: 120px;
    z-index: 2;
    vertical-align: middle;
    line-height: 1;
    box-sizing: border-box;
  }

  td {
    padding: 12px;
    border: 1px solid #333333;
    text-align: center;
    background-color: var(--table-bg);
    min-width: 80px;
    vertical-align: middle;
    line-height: 1;
    z-index: 1;
    box-sizing: border-box;

    &:hover {
      background-color: var(--table-hover);
    }
  }

  select {
    background-color: var(--table-bg);
    color: var(--text-color);
    border: 1px solid #333333;
    border-radius: 3px;
    padding: 5px;
  }

  .no-initiative-loss {
    background-color: #006600;
    color: #ffffff;
    text-shadow: 3px 3px 12px #ff0000;

    &:hover {
      background-color: #008000;
    }
  }

  .initiative-loss {
    background-color: #b38600;
    color: #ffffff;
    text-shadow: 3px 3px 12px #ff0000;

    &:hover {
      background-color: #e6b800;
    }
  }

  .unsafe {
    background-color: #cc2929;
    color: #ffffff;
    text-shadow: 3px 3px 12px #ff0000;

    &:hover {
      background-color: #ff3333;
    }
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
  padding: 5px 10px;
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

@media (max-width: 600px) {
  .tab-header {
    flex-direction: column-reverse;
    align-items: stretch;

    h2 {
      align-self: flex-start;
    }

    .back-link {
      align-self: flex-end;
    }
  }
}

@media (max-width: 768px) {
  table {
    font-size: 14px;

    th,
    td {
      padding: 8px;
    }
  }

  .tabs {
    button {
      padding: 8px 15px;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 480px) {
  .back-link {
    font-size: 1rem;
  }

  table {
    font-size: 11px;

    th {
      padding: 6px;
      min-width: 100px;
    }

    td {
      padding: 6px;
      min-width: 60px;
    }
  }

  .option {
    padding: 3px;
    font-size: 10px;
  }

  .tabs {
    button {
      padding: 6px 10px;
      font-size: 0.8rem;
    }
  }

  select {
    padding: 3px;
    font-size: 10px;
  }
}
</style>