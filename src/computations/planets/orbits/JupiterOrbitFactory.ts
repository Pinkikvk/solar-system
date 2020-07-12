import IOrbitFactory from './IOrbitFactory';
import OrbitElements from '@/computations/utils/OrbitElements';
import Angle from '@/computations/utils/geometry/Angle';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';

export default class JupiterOrbitFactory implements IOrbitFactory {

    build(date: Date): OrbitElements {
        const daysSinceMilenium = toDaysSinceMilenium(date);

        const semiMajorAxis = 5.20256;
        const eccentricity = 0.048498 + 4.469E-9 * daysSinceMilenium;
        const meanAnomaly = Angle.ofDeg(19.8950 + 0.0830853001 * daysSinceMilenium);
        const inclination = Angle.ofDeg(1.3030 - 1.557E-7 * daysSinceMilenium);
        const longitudeOfAscendingNode = Angle.ofDeg(100.4542 + 2.76854E-5 * daysSinceMilenium);
        const argumentOfPeriapsis = Angle.ofDeg(273.8777 + 1.64505E-5 * daysSinceMilenium);

        return new OrbitElements(semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPeriapsis, meanAnomaly);
    }

}