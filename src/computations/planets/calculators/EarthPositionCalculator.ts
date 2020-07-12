import PlanetPositionCalculator from './PlanetPositionCalculator';
import OrbitFactories from '../orbits/OrbitFactories';
import RectangularCoordinates from '@/computations/utils/geometry/RectangularCoordinates';
import Angle from '@/computations/utils/geometry/Angle';

export default class EarthPositionCalculator extends PlanetPositionCalculator {

    public constructor() {
        super(OrbitFactories.sun)
    }

    protected calculateHeliocentricCoordinates(date: Date): RectangularCoordinates {
        return super.calculateHeliocentricCoordinates(date).negate();
    }
}