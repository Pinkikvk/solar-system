import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';

export default class MercuryOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 0.387098;
        const eccentricity = 0.205635 + 5.59E-10 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(168.6562 + 4.0923344368 * daysSinceMilenium);
        const inclination = Angle.ofDeg(7.0047 + 5.00E-8 * daysSinceMilenium);
        const longitudeOfAscendingNode = Angle.ofDeg(48.3313 + 3.24587E-5 * daysSinceMilenium);
        const argumentOfPeriapsis = Angle.ofDeg(29.1241 + 1.01444E-5 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}