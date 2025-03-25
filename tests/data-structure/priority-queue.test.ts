import { PriorityQueue } from "../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("PriorityQueue", () => {
    test("Empty queue operations", () => {
        const minPQ = new PriorityQueue<string>();

        expect(minPQ.isEmpty()).toBe(true);
        expect(minPQ.size()).toBe(0);
        expect(minPQ.peek()).toBeUndefined();
        expect(minPQ.dequeue()).toBeUndefined();
    });

    test("Min priority queue operations", () => {
        const minPQ = new PriorityQueue<string>();

        minPQ.enqueue("Task 1", 3);
        minPQ.enqueue("Task 2", 1);
        minPQ.enqueue("Task 3", 2);

        expect(minPQ.isEmpty()).toBe(false);
        expect(minPQ.size()).toBe(3);

        // Peek should return the item with the lowest priority value
        expect(minPQ.peek()).toBe("Task 2");

        // Dequeue should return and remove items in priority order
        expect(minPQ.dequeue()).toBe("Task 2");
        expect(minPQ.dequeue()).toBe("Task 3");
        expect(minPQ.dequeue()).toBe("Task 1");

        expect(minPQ.isEmpty()).toBe(true);
    });

    test("Max priority queue operations", () => {
        const maxPQ = new PriorityQueue<string>(false); // false for max priority

        maxPQ.enqueue("Task 1", 3);
        maxPQ.enqueue("Task 2", 1);
        maxPQ.enqueue("Task 3", 2);

        expect(maxPQ.isEmpty()).toBe(false);
        expect(maxPQ.size()).toBe(3);

        // Peek should return the item with the highest priority value
        expect(maxPQ.peek()).toBe("Task 1");

        // Dequeue should return and remove items in priority order
        expect(maxPQ.dequeue()).toBe("Task 1");
        expect(maxPQ.dequeue()).toBe("Task 3");
        expect(maxPQ.dequeue()).toBe("Task 2");

        expect(maxPQ.isEmpty()).toBe(true);
    });

    test("Priority queue with same priorities", () => {
        const pq = new PriorityQueue<string>();

        pq.enqueue("Task 1", 1);
        pq.enqueue("Task 2", 1);
        pq.enqueue("Task 3", 1);

        expect(pq.size()).toBe(3);

        // Items with the same priority should be dequeued in insertion order
        // (or in an implementation-defined order, but consistently)
        const item1 = pq.dequeue();
        const item2 = pq.dequeue();
        const item3 = pq.dequeue();

        expect([item1, item2, item3]).toContain("Task 1");
        expect([item1, item2, item3]).toContain("Task 2");
        expect([item1, item2, item3]).toContain("Task 3");
    });

    test("Priority queue with negative priorities", () => {
        const pq = new PriorityQueue<string>();

        pq.enqueue("Task 1", -3);
        pq.enqueue("Task 2", -1);
        pq.enqueue("Task 3", -2);

        // For a min priority queue, the most negative value has the highest priority
        expect(pq.peek()).toBe("Task 1");

        expect(pq.dequeue()).toBe("Task 1");
        expect(pq.dequeue()).toBe("Task 3");
        expect(pq.dequeue()).toBe("Task 2");
    });

    test("Priority queue with mixed priority types", () => {
        const pq = new PriorityQueue<string>();

        pq.enqueue("Task 1", 3);
        pq.enqueue("Task 2", -1);
        pq.enqueue("Task 3", 0);

        // For a min priority queue, items should be dequeued in ascending order of priority
        expect(pq.dequeue()).toBe("Task 2"); // -1
        expect(pq.dequeue()).toBe("Task 3"); // 0
        expect(pq.dequeue()).toBe("Task 1"); // 3
    });

    test("Priority queue with object values", () => {
        interface Task {
            id: number;
            name: string;
        }

        const pq = new PriorityQueue<Task>();

        const task1: Task = { id: 1, name: "Task 1" };
        const task2: Task = { id: 2, name: "Task 2" };
        const task3: Task = { id: 3, name: "Task 3" };

        pq.enqueue(task1, 3);
        pq.enqueue(task2, 1);
        pq.enqueue(task3, 2);

        expect(pq.peek()).toBe(task2);

        expect(pq.dequeue()).toBe(task2);
        expect(pq.dequeue()).toBe(task3);
        expect(pq.dequeue()).toBe(task1);
    });

    test("Complex priority queue operations", () => {
        const pq = new PriorityQueue<string>();

        // Add items
        pq.enqueue("Task A", 5);
        pq.enqueue("Task B", 3);
        pq.enqueue("Task C", 7);

        expect(pq.size()).toBe(3);
        expect(pq.peek()).toBe("Task B");

        // Dequeue an item
        expect(pq.dequeue()).toBe("Task B");
        expect(pq.size()).toBe(2);

        // Add more items
        pq.enqueue("Task D", 1);
        pq.enqueue("Task E", 6);

        expect(pq.size()).toBe(4);
        expect(pq.peek()).toBe("Task D");

        // Dequeue all remaining items
        expect(pq.dequeue()).toBe("Task D");
        expect(pq.dequeue()).toBe("Task A");
        expect(pq.dequeue()).toBe("Task E");
        expect(pq.dequeue()).toBe("Task C");

        expect(pq.isEmpty()).toBe(true);
    });

    test("Priority queue with large number of items", () => {
        const pq = new PriorityQueue<number>();

        // Add 1000 items with random priorities
        const items: number[] = [];
        const priorities: number[] = [];

        for (let i = 0; i < 1000; i++) {
            const item = i;
            const priority = Math.floor(Math.random() * 1000);

            items.push(item);
            priorities.push(priority);

            pq.enqueue(item, priority);
        }

        expect(pq.size()).toBe(1000);

        // Create a sorted array of [item, priority] pairs for verification
        const sortedPairs = items.map((item, index) => [item, priorities[index]])
            .sort((a, b) => a[1] - b[1]);

        // Dequeue all items and verify they come out in priority order
        for (let i = 0; i < 1000; i++) {
            const expectedItem = sortedPairs[i][0];
            const item = pq.dequeue();
            expect(item).toBe(expectedItem);
        }

        expect(pq.isEmpty()).toBe(true);
    });
});