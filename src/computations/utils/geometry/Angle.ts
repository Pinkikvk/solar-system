export default class Angle {
    private readonly valueInRad: number;

    private constructor(radValue: number) {
        this.valueInRad = radValue;
    }

    public rad(): number {
        return this.valueInRad;
    }

    public deg(): number {
        return this.valueInRad * 180 / Math.PI;
    }

    public normalize(): Angle {
        let value = this.valueInRad % (2 * Math.PI);
        value = value < 0 ? value + (2 * Math.PI) : value;
        return Angle.ofRad(value);
    }

    public add(angle: Angle): Angle {
        return Angle.ofRad(this.rad() + angle.rad()).normalize();
    }

    public static ofRad(radValue: number): Angle {
        return new Angle(radValue);
    }

    public static ofDeg(degValue: number): Angle {
        return new Angle(degValue * Math.PI / 180);
    }
}