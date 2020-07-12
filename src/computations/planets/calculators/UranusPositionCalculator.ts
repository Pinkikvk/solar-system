import PlanetPositionCalculator from './PlanetPositionCalculator';
import OrbitFactories from '../orbits/OrbitFactories';
import RectangularCoordinates from '@/computations/utils/geometry/RectangularCoordinates';
import Angle from '@/computations/utils/geometry/Angle';

export default class UranusPositionCalculator extends PlanetPositionCalculator {

    public constructor() {
        super(OrbitFactories.uranus)
    }

    protected calculateHeliocentricCoordinates(date: Date): RectangularCoordinates {
        var coords = super.calculateHeliocentricCoordinates(date).toSphericalCoordinates();

        var jupierMeanAnomaly = OrbitFactories.jupiter.build(date).meanAnomaly();
        var saturnMeanAnomaly = OrbitFactories.saturn.build(date).meanAnomaly();
        var uranusMeanAnomaly = OrbitFactories.uranus.build(date).meanAnomaly();

        var longitudePerturbation = this.computeLongitudePerturbations(jupierMeanAnomaly, saturnMeanAnomaly, uranusMeanAnomaly);
        coords.longitude = coords.longitude.add(longitudePerturbation);

        return coords.toRectangularCoordinates();
    }

    private computeLongitudePerturbations(jupierMeanAnomaly: Angle, saturnMeanAnomaly: Angle, uranusMeanAnomaly: Angle): Angle {
        var mj = jupierMeanAnomaly.rad();
        var ms = saturnMeanAnomaly.rad();
        var mu = uranusMeanAnomaly.rad();

        return Angle.ofDeg(
            0.040 * Math.sin(ms - 2 * mu + Angle.ofDeg(6).rad())
            + 0.035 * Math.sin(ms - 3 * mu + Angle.ofDeg(33).rad())
            - 0.015 * Math.sin(mj - mu + Angle.ofDeg(20).rad())
        );
    }

}