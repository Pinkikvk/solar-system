import Angle from './geometry/Angle';

export default class OrbitElements {
    private readonly a: number;
    private readonly e: number;
    private readonly i: Angle;
    private readonly N: Angle;
    private readonly w: Angle;
    private readonly M: Angle;

    public constructor(semiMajorAxis: number, eccentricity: number, inclination: Angle,
        longitudeOfAscendingNode: Angle, argumentOfPeriapsis: Angle, meanAnomaly: Angle) {

        this.a = semiMajorAxis;
        this.e = eccentricity;
        this.i = inclination.normalize();
        this.N = longitudeOfAscendingNode.normalize();
        this.w = argumentOfPeriapsis.normalize();
        this.M = meanAnomaly.normalize();
    }

    public semiMajorAxis(): number {
        return this.a;
    }

    public eccentricity(): number {
        return this.e;
    }

    public inclination(): Angle {
        return this.i;
    }

    public longitudeOfAscendingNode(): Angle {
        return this.N;
    }

    public argumentOfPeriapsis(): Angle {
        return this.w;
    }

    public meanAnomaly(): Angle {
        return this.M;
    }

    public longitudeOfPeriapsis(): Angle {
        return this.longitudeOfAscendingNode().add(this.argumentOfPeriapsis()).normalize();
    }

    public meanLongitude(): Angle {
        return this.meanAnomaly().add(this.longitudeOfPeriapsis()).normalize();
    }
}