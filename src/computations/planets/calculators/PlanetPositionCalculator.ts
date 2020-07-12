import OrbitElements from '../../utils/OrbitElements';
import IOrbitFactory from '../orbits/IOrbitFactory';
import KeplerEquation from '@/computations/utils/KeplerEquation';
import RectangularCoordinates from '@/computations/utils/geometry/RectangularCoordinates';
import OrbitFactories from '../orbits/OrbitFactories';
import { toDaysSinceMilenium } from '@/computations/utils/DateUtils';
import Angle from '@/computations/utils/geometry/Angle';
import ObjectCoordinates from '@/computations/utils/ObjectCoordinates';

export default class PlanetPositionCalculator {

    protected readonly orbitFactory: IOrbitFactory;

    public constructor(orbitFactory: IOrbitFactory) {
        this.orbitFactory = orbitFactory;
    }

    public calculate(date: Date): ObjectCoordinates {
        var helio = this.calculateHeliocentricCoordinates(date);
        var sunPos = this.calculateSunPosition(date);
        var geoEclip = helio.add(sunPos);
        var geoEquat = this.eclipticToEquatorial(geoEclip, date);

        return new ObjectCoordinates(helio, helio.toSphericalCoordinates(), geoEclip, geoEclip.toSphericalCoordinates(), geoEquat, geoEquat.toSphericalCoordinates());
    }

    private eclipticToEquatorial(eclip: RectangularCoordinates, date: Date): RectangularCoordinates {
        var oblecl = Angle.ofDeg(23.4393 - 3.563E-7 * toDaysSinceMilenium(date)).rad();
        var xequat = eclip.x;
        var yequat = eclip.y * Math.cos(oblecl) - eclip.z * Math.sin(oblecl);
        var zequat = eclip.y * Math.sin(oblecl) + eclip.z * Math.cos(oblecl);

        return new RectangularCoordinates(xequat, yequat, zequat);
    }

    private calculateSunPosition(date: Date): RectangularCoordinates {
        var sunOrbit = OrbitFactories.sun.build(date);
        return KeplerEquation.calculate(sunOrbit);
    }

    protected calculateHeliocentricCoordinates(date: Date): RectangularCoordinates {
        var orbit = this.orbitFactory.build(date);
        return KeplerEquation.calculate(orbit);
    }
}