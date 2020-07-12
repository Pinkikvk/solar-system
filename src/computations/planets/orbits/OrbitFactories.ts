import IOrbitFactory from './IOrbitFactory';
import JupiterOrbitFactory from './JupiterOrbitFactory';
import SunOrbitFactory from './SunOrbitFactory';
import MercuryOrbitFactory from './MercuryOrbitFactory';
import VenusOrbitFactory from './VenusOrbitFactory';
import MarsOrbitFactory from './MarsOrbitFactory';
import SaturnOrbitFactory from './SaturnOrbitFactory';
import UranusOrbitFactory from './UranusOrbitFactory';
import NeptuneOrbitFactory from './NeptuneOrbitFactory';

export default class OrbitFactories {
    public static readonly sun: IOrbitFactory = new SunOrbitFactory();
    public static readonly mercury: IOrbitFactory = new MercuryOrbitFactory();
    public static readonly venus: IOrbitFactory = new VenusOrbitFactory();
    public static readonly mars: IOrbitFactory = new MarsOrbitFactory();
    public static readonly jupiter: IOrbitFactory = new JupiterOrbitFactory();
    public static readonly saturn: IOrbitFactory = new SaturnOrbitFactory();
    public static readonly uranus: IOrbitFactory = new UranusOrbitFactory();
    public static readonly neptune: IOrbitFactory = new NeptuneOrbitFactory();
}