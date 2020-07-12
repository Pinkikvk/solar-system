import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';

export default class SaturnOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 9.55475;
        const eccentricity = 0.055546 - 9.499E-9 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(316.9670 + 0.0334442282 * daysSinceMilenium);
        const inclination = Angle.ofDeg(2.4886 - 1.081E-7 * daysSinceMilenium);
        const longitudeOfAscendingNode = Angle.ofDeg(113.6634 + 2.38980E-5 * daysSinceMilenium);
        const argumentOfPeriapsis = Angle.ofDeg(339.3939 + 2.97661E-5 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}