import * as THREE from 'three';

export default class Planet3D {

    private readonly planetGeometry: THREE.Object3D

    public constructor(planetGeometry: THREE.Object3D) {
        this.planetGeometry = planetGeometry;
    }

    public getObject3D(): THREE.Object3D {
        return this.planetGeometry;
    }

    public move(x: number, y: number) {
        this.planetGeometry.position.set(x, 0, -y);
    }
}