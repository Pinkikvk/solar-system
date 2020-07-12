import SphericalCoordinates from './SphericalCoordinates';
import Angle from './Angle';

export default class RectangularCoordinates {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public negate(): RectangularCoordinates {
        return new RectangularCoordinates(-this.x, -this.y, -this.z);
    }

    public add(rc: RectangularCoordinates): RectangularCoordinates {
        return new RectangularCoordinates(this.x + rc.x, this.y + rc.y, this.z + rc.z);
    }

    public toSphericalCoordinates(): SphericalCoordinates {
        let radius = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        let longitude = Angle.ofRad(Math.atan2(this.y, this.x)).normalize();
        let latitude = Angle.ofRad(Math.atan2(this.z, Math.sqrt(this.x * this.x + this.y * this.y)));

        return new SphericalCoordinates(longitude, latitude, radius);
    }
}