import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';


export default class SunOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 1.0;
        const eccentricity = 0.016709 - 1.151E-9 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(356.0470 + 0.9856002585 * daysSinceMilenium);
        const inclination = Angle.ofDeg(0.0);
        const longitudeOfAscendingNode = Angle.ofDeg(0.0);
        const argumentOfPeriapsis = Angle.ofDeg(282.9404 + 4.70935E-5 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}