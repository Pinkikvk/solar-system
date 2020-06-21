import Planet3D from './Planet3D';

import * as THREE from 'three';

export default class Planet3DBuilder {
    public static build(radius: number, texturePath: string): Promise<Planet3D> {
        return new Promise<Planet3D>((resolve, reject) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.loadAsync(texturePath).then(texture => {
                const geometry = new THREE.SphereGeometry(radius, 50, 50);
                const material = new THREE.MeshBasicMaterial({ map: texture });
                const mesh = new THREE.Mesh(geometry, material);
                resolve(new Planet3D(mesh));
            });
        });
    }
}