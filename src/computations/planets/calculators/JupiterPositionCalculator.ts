import PlanetPositionCalculator from './PlanetPositionCalculator';
import OrbitFactories from '../orbits/OrbitFactories';
import RectangularCoordinates from '@/computations/utils/geometry/RectangularCoordinates';
import Angle from '@/computations/utils/geometry/Angle';

export default class JupiterPositionCalculator extends PlanetPositionCalculator {

    public constructor() {
        super(OrbitFactories.jupiter)
    }

    protected calculateHeliocentricCoordinates(date: Date): RectangularCoordinates {
        let coords = super.calculateHeliocentricCoordinates(date).toSphericalCoordinates();

        let jupierMeanAnomaly = OrbitFactories.jupiter.build(date).meanAnomaly();
        let saturnMeanAnomaly = OrbitFactories.saturn.build(date).meanAnomaly();

        let longitudePerturbation = this.computeLongitudePerturbations(jupierMeanAnomaly, saturnMeanAnomaly);
        coords.longitude = coords.longitude.add(longitudePerturbation);

        return coords.toRectangularCoordinates();
    }

    private computeLongitudePerturbations(jupierMeanAnomaly: Angle, saturnMeanAnomaly: Angle): Angle {
        var mj = jupierMeanAnomaly.rad();
        var ms = saturnMeanAnomaly.rad();

        return Angle.ofDeg(
            -0.332 * Math.sin(2 * mj - 5 * ms - Angle.ofDeg(67.6).rad())
            - 0.056 * Math.sin(2 * mj - 2 * ms + Angle.ofDeg(21).rad())
            + 0.042 * Math.sin(3 * mj - 5 * ms + Angle.ofDeg(21).rad())
            - 0.036 * Math.sin(mj - 2 * ms)
            + 0.022 * Math.cos(mj - ms)
            + 0.023 * Math.sin(2 * mj - 3 * ms + Angle.ofDeg(52).rad())
            - 0.016 * Math.sin(mj - 5 * ms - Angle.ofDeg(69).rad())
        );
    }

}