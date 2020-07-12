import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';

export default class VenusOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 0.723330;
        const eccentricity = 0.006773 - 1.302E-9 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(48.0052 + 1.6021302244 * daysSinceMilenium);
        const inclination = Angle.ofDeg(3.3946 + 2.75E-8 * daysSinceMilenium);
        const longitudeOfAscendingNode = Angle.ofDeg(76.6799 + 2.46590E-5 * daysSinceMilenium);
        const argumentOfPeriapsis = Angle.ofDeg(54.8910 + 1.38374E-5 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}