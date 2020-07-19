import Planet from './Planet';

export default interface Planets {
    mercury: Planet;
    venus: Planet;
    earth: Planet;
    mars: Planet;
    jupiter: Planet;
    saturn: Planet;
    uranus: Planet;
    neptune: Planet;
}

export function buildPlanets(): Planets {
    return {
        mercury: new Planet("Mercury"),
        venus: new Planet("Venus"),
        earth: new Planet("Earth"),
        mars: new Planet("Mars"),
        jupiter: new Planet("Jupiter"),
        saturn: new Planet("Saturn"),
        uranus: new Planet("Uranus"),
        neptune: new Planet("Neptune")
    }
}