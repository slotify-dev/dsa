import Heap from './heap';

const MaxHeap = <T extends number | string>() =>
    new Heap<T>((a: T, b: T): number => {
        if (typeof a === 'number' && typeof b === 'number') {
            return b - a;
        }
        return String(b).localeCompare(String(a));
    });

export default MaxHeap;