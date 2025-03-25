import { Comparator } from '../utils/comparator';

/**
 * Generic heap data structure implementation.
 * Can be used as a min-heap or max-heap depending on the comparator function.
 */
export default class Heap<T> {
    private data: T[] = [];
    private comparator: Comparator<T>;

    /**
     * Creates a new heap with the specified comparator function.
     * @param comparator Function to compare values in the heap
     */
    constructor(comparator: Comparator<T>) {
        this.comparator = comparator;
    }

    /**
     * Returns the top element of the heap without removing it.
     * @returns The top element or undefined if the heap is empty
     */
    peek(): T | undefined {
        return this.data[0];
    }

    /**
     * Returns the number of elements in the heap.
     * @returns The size of the heap
     */
    size(): number {
        return this.data.length;
    }

    /**
     * Checks if the heap is empty.
     * @returns True if the heap is empty, false otherwise
     */
    isEmpty(): boolean {
        return this.data.length === 0;
    }

    /**
     * Inserts a value into the heap.
     * @param value The value to insert
     */
    insert(value: T): void {
        this.data.push(value);
        this.bubbleUp(this.data.length - 1);
    }

    /**
     * Extracts the top element from the heap.
     * @returns The top element or undefined if the heap is empty
     */
    extract(): T | undefined {
        if (this.data.length === 0) return undefined;
        if (this.data.length === 1) return this.data.pop();

        const root = this.data[0];
        this.data[0] = this.data.pop()!;
        this.bubbleDown(0);

        return root;
    }

    /**
     * Makes the heap iterable.
     * @returns A generator that yields each element in the heap
     */
    *[Symbol.iterator](): Generator<T> {
        for (const item of this.data) {
            yield item;
        }
    }

    /**
     * Moves an element up the heap to maintain the heap property.
     * @param index The index of the element to bubble up
     */
    private bubbleUp(index: number): void {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.comparator(this.data[index], this.data[parentIndex]) < 0) {
            [this.data[index], this.data[parentIndex]] = [this.data[parentIndex], this.data[index]];
            this.bubbleUp(parentIndex);
        }
    }

    /**
     * Moves an element down the heap to maintain the heap property.
     * @param index The index of the element to bubble down
     */
    private bubbleDown(index: number): void {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallest = index;

        if (
            leftChildIndex < this.data.length &&
            this.comparator(this.data[leftChildIndex], this.data[smallest]) < 0
        ) {
            smallest = leftChildIndex;
        }

        if (
            rightChildIndex < this.data.length &&
            this.comparator(this.data[rightChildIndex], this.data[smallest]) < 0
        ) {
            smallest = rightChildIndex;
        }

        if (smallest !== index) {
            [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
            this.bubbleDown(smallest);
        }
    }
}