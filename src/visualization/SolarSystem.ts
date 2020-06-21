import { Plane } from 'three';
import Planet3D from './Planet3D';
import Planet3DBuilder from './Planet3DBuilder';

export default class SolarSystem {

    public readonly sun: Planet3D;
    public readonly mercury: Planet3D;
    public readonly venus: Planet3D;
    public readonly earth: Planet3D;
    public readonly mars: Planet3D;
    public readonly jupiter: Planet3D;
    public readonly saturn: Planet3D;
    public readonly uranus: Planet3D;
    public readonly neptune: Planet3D;

    public constructor(sun: Planet3D, mercury: Planet3D, venus: Planet3D, earth: Planet3D, mars: Planet3D,
        jupiter: Planet3D, saturn: Planet3D, uranus: Planet3D, neptune: Planet3D) {
        this.sun = sun;
        this.mercury = mercury;
        this.venus = venus;
        this.earth = earth;
        this.mars = mars;
        this.jupiter = jupiter;
        this.saturn = saturn;
        this.uranus = uranus;
        this.neptune = neptune;
    }

    public static build(): Promise<SolarSystem> {
        return new Promise<SolarSystem>((resolve, reject) => {
            let planetPromisies = [
                Planet3DBuilder.build(2, "textures/sun.jpg"),
                Planet3DBuilder.build(0.2, "textures/mercury.jpg"),
                Planet3DBuilder.build(0.2, "textures/venus.jpg"),
                Planet3DBuilder.build(0.4, "textures/earth.jpg"),
                Planet3DBuilder.build(0.3, "textures/mars.jpg"),
                Planet3DBuilder.build(1, "textures/jupiter.jpg"),
                Planet3DBuilder.build(0.7, "textures/saturn.jpg"),
                Planet3DBuilder.build(0.5, "textures/uranus.jpg"),
                Planet3DBuilder.build(0.5, "textures/neptune.jpg")
            ]

            Promise.all(planetPromisies).then((planets: Planet3D[]) => {
                const solarSystem = new SolarSystem(planets[0], planets[1], planets[2], planets[3], planets[4], planets[5], planets[6], planets[7], planets[8]);
                resolve(solarSystem);
            })
        });
    }

}