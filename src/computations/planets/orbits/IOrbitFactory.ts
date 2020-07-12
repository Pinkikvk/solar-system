import OrbitElements from '@/computations/utils/OrbitElements';

export default interface IOrbitFactory {
    build(date: Date) : OrbitElements;
}