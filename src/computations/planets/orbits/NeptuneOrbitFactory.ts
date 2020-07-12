import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';

export default class NeptuneOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 30.05826 + 3.313E-8 * daysSinceMilenium;
        const eccentricity = 0.008606 + 2.15E-9 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(260.2471 + 0.005995147 * daysSinceMilenium);
        const inclination = Angle.ofDeg(1.7700 - 2.55E-7 * daysSinceMilenium);
        const longitudeOfAscendingNode = Angle.ofDeg(131.7806 + 3.0173E-5 * daysSinceMilenium);
        const argumentOfPeriapsis = Angle.ofDeg(272.8461 - 6.027E-6 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}