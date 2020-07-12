import Angle from './geometry/Angle';
import RectangularCoordinates from './geometry/RectangularCoordinates';
import OrbitElements from './OrbitElements';

export default class KeplerEquation {

    // Calculations based on http://www.stjarnhimlen.se/comp/tutorial.html
    public static calculate(orbit: OrbitElements): RectangularCoordinates {
        var a = orbit.semiMajorAxis();
        var e = orbit.eccentricity();
        var M = orbit.meanAnomaly().rad();
        var i = orbit.inclination().rad();
        var N = orbit.longitudeOfAscendingNode().rad();
        var w = orbit.argumentOfPeriapsis().rad();
        var eccentricyAnomaly = KeplerEquation.calculateEccentricyAnomaly(M, e);
        var E = eccentricyAnomaly.rad();

        var xv = a * (Math.cos(E) - e);
        var yv = a * (Math.sqrt(1.0 - e * e) * Math.sin(E));

        var v = Math.atan2(yv, xv);
        var r = Math.sqrt(xv * xv + yv * yv);

        var xh = r * (Math.cos(N) * Math.cos(v + w) - Math.sin(N) * Math.sin(v + w) * Math.cos(i));
        var yh = r * (Math.sin(N) * Math.cos(v + w) + Math.cos(N) * Math.sin(v + w) * Math.cos(i));
        var zh = r * (Math.sin(v + w) * Math.sin(i));

        return new RectangularCoordinates(xh, yh, zh);
    }

    private static calculateEccentricyAnomaly(M: number, e: number, epsilon: number = 0.0001 * Math.PI / 180): Angle {
        //Kepler's equation
        var E0 = KeplerEquation.calculateFirstApproximation(M, e);
        while (true) {
            var E1 = KeplerEquation.calculateNextApproximation(E0, M, e);
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