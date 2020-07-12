import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';

export default class UranusOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 19.18171 - 1.55E-8 * daysSinceMilenium;
        const eccentricity = 0.047318 + 7.45E-9 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(142.5905 + 0.011725806 * daysSinceMilenium);
        const inclination = Angle.ofDeg(0.7733 + 1.9E-8 * daysSinceMilenium);
        const longitudeOfAscendingNode = Angle.ofDeg(74.0005 + 1.3978E-5 * daysSinceMilenium);
        const argumentOfPeriapsis = Angle.ofDeg(96.6612 + 3.0565E-5 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}