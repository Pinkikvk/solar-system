import Angle from './geometry/Angle';
import RectangularCoordinates from './geometry/RectangularCoordinates';
import OrbitElements from './OrbitElements';

export default class KeplerEquation {

    // Calculations based on http://www.stjarnhimlen.se/comp/tutorial.html
    public static calculate(orbit: OrbitElements): RectangularCoordinates {
        const a = orbit.semiMajorAxis();
        const e = orbit.eccentricity();
        const M = orbit.meanAnomaly().rad();
        const i = orbit.inclination().rad();
        const N = orbit.longitudeOfAscendingNode().rad();
        const w = orbit.argumentOfPeriapsis().rad();
        const eccentricyAnomaly = KeplerEquation.calculateEccentricyAnomaly(M, e);
        const E = eccentricyAnomaly.rad();

        const xv = a * (Math.cos(E) - e);
        const yv = a * (Math.sqrt(1.0 - e * e) * Math.sin(E));

        const v = Math.atan2(yv, xv);
        const r = Math.sqrt(xv * xv + yv * yv);

        const xh = r * (Math.cos(N) * Math.cos(v + w) - Math.sin(N) * Math.sin(v + w) * Math.cos(i));
        const yh = r * (Math.sin(N) * Math.cos(v + w) + Math.cos(N) * Math.sin(v + w) * Math.cos(i));
        const zh = r * (Math.sin(v + w) * Math.sin(i));

        return new RectangularCoordinates(xh, yh, zh);
    }

    private static calculateEccentricyAnomaly(M: number, e: number, epsilon: number = 0.0001 * Math.PI / 180): Angle {
        //Kepler's equation
        let E0 = KeplerEquation.calculateFirstApproximation(M, e);
        while (true) {
            const E1 = KeplerEquation.calculateNextApproximation(E0, M, e);
            if (Math.abs(E0 - E1) < epsilon) {
                return Angle.ofRad(E1).normalize();
            }
            E0 = E1;
        }
    }

    private static calculateFirstApproximation(M: number, e: number): number {
        return M + e * Math.sin(M) * (1.0 + e * Math.cos(M));
    }

    private static calculateNextApproximation(E0: number, M: number, e: number): number {
        return E0 - (E0 - e * Math.sin(E0) - M) / (1 - e * Math.cos(E0));
    }
}