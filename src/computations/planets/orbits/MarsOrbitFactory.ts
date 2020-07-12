import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';

export default class MarsOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 1.523688;
        const eccentricity = 0.093405 + 2.516E-9 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(18.6021 + 0.5240207766 * daysSinceMilenium);
        const inclination = Angle.ofDeg(1.8497 - 1.78E-8 * daysSinceMilenium);
        const longitudeOfAscendingNode = Angle.ofDeg(49.5574 + 2.11081E-5 * daysSinceMilenium);
        const argumentOfPeriapsis = Angle.ofDeg(286.5016 + 2.92961E-5 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}