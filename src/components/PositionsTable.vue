<template>
  <div class="positions-table">
    <p>{{ date | formatDate }}</p>
    <table>
      <tr>
        <th>Name</th>
        <th>Hx [AU]</th>
        <th>Hy [AU]</th>
        <th>Hz [AU]</th>
      </tr>
      <tr v-for="planet in planets" :key="planet.name">
        <td>{{ planet.name }}</td>
        <td>{{ planet.position.heliocentricRectangular.x | formatNumber }}</td>
        <td>{{ planet.position.heliocentricRectangular.y | formatNumber }}</td>
        <td>{{ planet.position.heliocentricRectangular.z | formatNumber }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Planet from "../computations/utils/Planet";

@Component({
  filters: {
    formatDate(date: Date): string {
      return date.toDateString();
    },
    formatNumber(number: number): string {
      return number.toFixed(3);
    }
  }
})
export default class PositionsTable extends Vue {
  @Prop({ default: () => [] }) private planets!: Planet[];
  @Prop({ default: () => new Date() }) private date!: Date;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.positions-table {
  font-size: 12px;
}
</style>
