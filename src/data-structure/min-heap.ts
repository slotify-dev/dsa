import Heap from './heap';

const MinHeap = <T extends number | string>() =>
    new Heap<T>((a: T, b: T): number => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return String(a).localeCompare(String(b));
    });

export default MinHeap