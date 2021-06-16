<template>
  <div id="app">
    <SolarSystemViewer v-bind:planets="planets" />
    <div class="app-stats">
      <PositionsTable
        v-bind:planets="planets"
        v-bind:date="date"
        :key="updateKey"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import SolarSystemViewer from "./components/SolarSystemViewer.vue";
import PositionsTable from "./components/PositionsTable.vue";
import Planet from "./computations/utils/Planet";
import Planets, { buildPlanets } from "./computations/utils/Planets";
import PlanetPositionCalculators from "./computations/planets/calculators/PlanetPositionCalculators";

@Component({
  components: {
    HelloWorld,
    SolarSystemViewer,
    PositionsTable
  }
})
export default class App extends Vue {
  private date = new Date();
  private updateKey = 0;
  private planets!: Planets;
  private planetsList!: Planet[];

  private created() {
    this.planets = buildPlanets();
    this.planetsList = [
      this.planets.mercury,
      this.planets.venus,
      this.planets.earth,
      this.planets.mars,
      this.planets.jupiter,
      this.planets.saturn,
      this.planets.uranus,
      this.planets.neptune
    ];

    this.updatePositions(this.date);
  }

  private mounted() {
    setInterval(
      (() => {
        this.date.setDate(this.date.getDate() + 1);
        this.updateKey += 2;
        console.log(this.date);
        this.updatePositions(this.date);
      }).bind(this),
      100
    );
  }

  private updatePositions(date: Date): void {
    this.planets.mercury.position = PlanetPositionCalculators.mercury.calculate(date);
    this.planets.venus.position = PlanetPositionCalculators.venus.calculate(date);
    this.planets.earth.position = PlanetPositionCalculators.earth.calculate(date);
    this.planets.mars.position = PlanetPositionCalculators.mars.calculate(date);
    this.planets.jupiter.position = PlanetPositionCalculators.jupiter.calculate(date);
    this.planets.saturn.position = PlanetPositionCalculators.saturn.calculate(date);
    this.planets.uranus.position = PlanetPositionCalculators.uranus.calculate(date);
    this.planets.neptune.position = PlanetPositionCalculators.neptune.calculate(date);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-stats {
  position: absolute;
  padding: 10px;
  background: rgba($color: #fcfcfc, $alpha: 0.8);
}
</style>
