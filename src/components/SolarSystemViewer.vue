<template>
  <div class="hello" id="divContainer" ref="divContainer"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as THREE from "three";
import "../visualization/Planet3DBuilder";
import "../visualization/Planet3D";
import SolarSystem from "../visualization/SolarSystem";
import Planets from "@/computations/utils/Planets";
import Planet from "@/computations/utils/Planet";
import Planet3D from '../visualization/Planet3D';

@Component
export default class SolarSystemViewer extends Vue {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private sun!: THREE.Object3D;
  private solarSystem?: SolarSystem;

  @Prop() private planets!: Planets;

  $refs!: {
    divContainer: HTMLDivElement;
  };

  constructor() {
    super();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene = new THREE.Scene();
  }

  mounted() {
    const width = this.$refs.divContainer.clientWidth;
    const height = this.$refs.divContainer.clientHeight;

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.y = 20;
    this.camera.position.z = 40;
    this.camera.rotation.x = -Math.PI / 6;
    this.renderer.setSize(width, height);
    this.$refs.divContainer.appendChild(this.renderer.domElement);

    SolarSystem.build().then(solarSystem => {
      this.solarSystem = solarSystem;

      this.scene.add(solarSystem.sun.getObject3D());
      this.sun = solarSystem.sun.getObject3D();

      this.scene.add(solarSystem.mercury.getObject3D());
      solarSystem.mercury.move(4, 0);

      this.scene.add(solarSystem.venus.getObject3D());
      solarSystem.venus.move(6, 0);

      this.scene.add(solarSystem.earth.getObject3D());
      solarSystem.earth.move(8, 0);

      this.scene.add(solarSystem.mars.getObject3D());
      solarSystem.mars.move(10, 0);

      this.scene.add(solarSystem.jupiter.getObject3D());
      solarSystem.jupiter.move(15, 0);

      this.scene.add(solarSystem.saturn.getObject3D());
      solarSystem.saturn.move(18, 0);

      this.scene.add(solarSystem.uranus.getObject3D());
      solarSystem.uranus.move(21, 0);

      this.scene.add(solarSystem.neptune.getObject3D());
      solarSystem.neptune.move(24, 0);
    });

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.sun) {
      //this.earth.rotation.x += 0.001;
      this.sun.rotation.y -= 0.003;
    }

    if (this.solarSystem) {
      this.movePlanet(this.solarSystem.mercury, this.planets.mercury, 4);
      this.movePlanet(this.solarSystem.venus, this.planets.venus, 6);
      this.movePlanet(this.solarSystem.earth, this.planets.earth, 8);
      this.movePlanet(this.solarSystem.mars, this.planets.mars, 10);
      this.movePlanet(this.solarSystem.jupiter, this.planets.jupiter, 18);
      this.movePlanet(this.solarSystem.saturn, this.planets.saturn, 22);
      this.movePlanet(this.solarSystem.uranus, this.planets.uranus, 25);
      this.movePlanet(this.solarSystem.neptune, this.planets.neptune, 28);
    }

    this.renderer.render(this.scene, this.camera);
  }

  private movePlanet(planet3D: Planet3D, planet: Planet, radius: number): void {
    if (planet.position) {
      const positionSpherical = planet.position.heliocentricSpherical;
      const x = radius * Math.cos(positionSpherical.longitude.rad()) * Math.cos(positionSpherical.latitude.rad());
      const y = radius * Math.sin(positionSpherical.longitude.rad()) * Math.cos(positionSpherical.latitude.rad());
      planet3D.move(x, y);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#divContainer {
  background: black;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
</style>
