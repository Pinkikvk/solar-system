import PlanetPositionCalculator from './PlanetPositionCalculator';
import OrbitFactories from '../orbits/OrbitFactories';
import RectangularCoordinates from '@/computations/utils/geometry/RectangularCoordinates';
import Angle from '@/computations/utils/geometry/Angle';

export default class SaturnPositionCalculator extends PlanetPositionCalculator {

    public constructor() {
        super(OrbitFactories.saturn)
    }

    protected calculateHeliocentricCoordinates(date: Date): RectangularCoordinates {
        var coords = super.calculateHeliocentricCoordinates(date).toSphericalCoordinates();

        var jupierMeanAnomaly = OrbitFactories.jupiter.build(date).meanAnomaly();
        var saturnMeanAnomaly = OrbitFactories.saturn.build(date).meanAnomaly();

        var longitudePerturbation = this.computeLongitudePerturbations(jupierMeanAnomaly, saturnMeanAnomaly);
        coords.longitude = coords.longitude.add(longitudePerturbation);
        var latitudePerturbations = this.computeLatitudePerturbations(jupierMeanAnomaly, saturnMeanAnomaly);
        coords.latitude = coords.latitude.add(latitudePerturbations);

        return coords.toRectangularCoordinates();
    }

    private computeLongitudePerturbations(jupierMeanAnomaly: Angle, saturnMeanAnomaly: Angle): Angle {
        var mj = jupierMeanAnomaly.rad();
        var ms = saturnMeanAnomaly.rad();

        return Angle.ofDeg(
            0.812 * Math.sin(2 * mj - 5 * ms - Angle.ofDeg(67.6).rad())
            - 0.229 * Math.cos(2 * mj - 4 * ms - Angle.ofDeg(2).rad())
            + 0.119 * Math.sin(mj - 2 * ms - Angle.ofDeg(3).rad())
            + 0.046 * Math.sin(2 * mj - 6 * ms - Angle.ofDeg(69).rad())
            + 0.014 * Math.sin(mj - 3 * ms + Angle.ofDeg(32).rad())
        );
    }

    private computeLatitudePerturbations(jupierMeanAnomaly: Angle, saturnMeanAnomaly: Angle): Angle {
        var mj = jupierMeanAnomaly.rad();
        var ms = saturnMeanAnomaly.rad();

        return Angle.ofDeg(
            -0.020 * Math.cos(2 * mj - 4 * ms - Angle.ofDeg(2).rad())
            + 0.018 * Math.sin(2 * mj - 6 * ms - Angle.ofDeg(49).rad())
        );
    }

}