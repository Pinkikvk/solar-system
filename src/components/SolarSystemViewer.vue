<template>
  <div class="hello" id="divContainer" ref="divContainer"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";
import { Loader } from "three";
import "../visualization/Planet3DBuilder";
import "../visualization/Planet3D";
import Planet3DBuilder from "../visualization/Planet3DBuilder";
import SolarSystem from "../visualization/SolarSystem";

@Component
export default class SolarSystemViewer extends Vue {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private sun!: THREE.Object3D;

  $refs!: {
    divContainer: HTMLDivElement;
  };

  constructor() {
    super();
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
  }

  mounted() {
    const width = this.$refs.divContainer.clientWidth;
    const height = this.$refs.divContainer.clientHeight;

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.y = 18;
    this.camera.position.z = 28;
    this.camera.rotation.x = -Math.PI / 6;
    this.renderer.setSize(width, height);
    this.$refs.divContainer.appendChild(this.renderer.domElement);

    SolarSystem.build().then(solarSystem => {
      this.scene.add(solarSystem.sun.getObject3D())
      this.sun = solarSystem.sun.getObject3D();

      this.scene.add(solarSystem.mercury.getObject3D());
      solarSystem.mercury.move(4,0);

      this.scene.add(solarSystem.venus.getObject3D());
      solarSystem.venus.move(6,0);

      this.scene.add(solarSystem.earth.getObject3D());
      solarSystem.earth.move(8,0);

      this.scene.add(solarSystem.mars.getObject3D());
      solarSystem.mars.move(10,0);

      this.scene.add(solarSystem.jupiter.getObject3D());
      solarSystem.jupiter.move(15,0);

      this.scene.add(solarSystem.saturn.getObject3D());
      solarSystem.saturn.move(18,0);

      this.scene.add(solarSystem.uranus.getObject3D());
      solarSystem.uranus.move(21,0);

      this.scene.add(solarSystem.neptune.getObject3D());
      solarSystem.neptune.move(24,0);
    })

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.sun) {
      //this.earth.rotation.x += 0.001;
      this.sun.rotation.y -= 0.003;
    }

    this.renderer.render(this.scene, this.camera);
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
