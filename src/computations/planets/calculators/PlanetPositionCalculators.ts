import OrbitFactories from '../orbits/OrbitFactories';
import PlanetPositionCalculator from './PlanetPositionCalculator';
import EarthPositionCalculator from './EarthPositionCalculator';
import JupiterPositionCalculator from './JupiterPositionCalculator';
import SaturnPositionCalculator from './SaturnPositionCalculator';
import UranusPositionCalculator from './UranusPositionCalculator';

export default class PlanetPositionCalculators {
    public static readonly mercury: PlanetPositionCalculator = new PlanetPositionCalculator(OrbitFactories.mercury);
    public static readonly venus: PlanetPositionCalculator = new PlanetPositionCalculator(OrbitFactories.venus);
    public static readonly earth: PlanetPositionCalculator = new EarthPositionCalculator();
    public static readonly mars: PlanetPositionCalculator = new PlanetPositionCalculator(OrbitFactories.mars);
    public static readonly jupiter: PlanetPositionCalculator = new JupiterPositionCalculator();
    public static readonly saturn: PlanetPositionCalculator = new SaturnPositionCalculator();
    public static readonly uranus: PlanetPositionCalculator = new UranusPositionCalculator();
    public static readonly neptune: PlanetPositionCalculator = new PlanetPositionCalculator(OrbitFactories.neptune);

}