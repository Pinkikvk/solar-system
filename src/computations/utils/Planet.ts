import ObjectCoordinates from './ObjectCoordinates';

export default class Planet {

    public name: string;
    public position?: ObjectCoordinates;

    public constructor(name: string) {
        this.name = name;
    }
}