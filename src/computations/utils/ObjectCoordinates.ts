import RectangularCoordinates from './geometry/RectangularCoordinates';
import SphericalCoordinates from './geometry/SphericalCoordinates';

export default class ObjectCoordinates {
    public heliocentricRectangular: RectangularCoordinates;
    public heliocentricSpherical: SphericalCoordinates;
    public geocentricEclipticRectangular: RectangularCoordinates;
    public geocentricEclipticSpherical: SphericalCoordinates;
    public geocentricEquatorialRectangular: RectangularCoordinates;
    public geocentricEquatorialSpherical: SphericalCoordinates;

    public constructor(heliocentricRectangular: RectangularCoordinates, heliocentricSpherical: SphericalCoordinates,
        geocentricEclipticRectangular: RectangularCoordinates, geocentricEclipticSpherical: SphericalCoordinates,
        geocentricEquatorialRectangular: RectangularCoordinates, geocentricEquatorialSpherical: SphericalCoordinates) {
        this.heliocentricRectangular = heliocentricRectangular;
        this.heliocentricSpherical = heliocentricSpherical;
        this.geocentricEclipticRectangular = geocentricEclipticRectangular;
        this.geocentricEclipticSpherical = geocentricEclipticSpherical;
        this.geocentricEquatorialRectangular = geocentricEquatorialRectangular;
        this.geocentricEquatorialSpherical = geocentricEquatorialSpherical;
    }
}