import Angle from './Angle';
import RectangularCoordinates from './RectangularCoordinates';

export default class SphericalCoordinates {
    public longitude: Angle;
    public latitude: Angle;
    public radius: number;

    public constructor(longitude: Angle, latitude: Angle, radius: number) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.radius = radius;
    }

    public toRectangularCoordinates(): RectangularCoordinates {
        let x = this.radius * Math.cos(this.longitude.rad()) * Math.cos(this.latitude.rad());
        let y = this.radius * Math.sin(this.longitude.rad()) * Math.cos(this.latitude.rad());
        let z = this.radius * Math.sin(this.latitude.rad());

        return new RectangularCoordinates(x, y, z);
    }
}