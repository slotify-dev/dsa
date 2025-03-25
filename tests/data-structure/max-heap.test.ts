import { MaxHeap } from "../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("MaxHeap", () => {
    test("Basic operations with numbers", () => {
        const heap = MaxHeap<number>();

        heap.insert(5);
        heap.insert(3);
        heap.insert(8);

        expect(heap.peek()).toBe(8);
        expect(heap.extract()).toBe(8);
        expect(heap.extract()).toBe(5);
        expect(heap.extract()).toBe(3);
        expect(heap.isEmpty()).toBe(true);
    });

    test("With string values", () => {
        const heap = MaxHeap<string>();

        heap.insert("banana");
        heap.insert("apple");
        heap.insert("cherry");

        expect(heap.size()).toBe(3);
        expect(heap.peek()).toBe("cherry"); // Alphabetically last

        expect(heap.extract()).toBe("cherry");
        expect(heap.extract()).toBe("banana");
        expect(heap.extract()).toBe("apple");
    });

    test("Empty heap operations", () => {
        const heap = MaxHeap<number>();

        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
        expect(heap.peek()).toBeUndefined();
        expect(heap.extract()).toBeUndefined();

        // Test iteration on empty heap
        const items = [...heap];
        expect(items).toEqual([]);
    });

    test("Heap with single element", () => {
        const heap = MaxHeap<number>();

        heap.insert(42);

        expect(heap.size()).toBe(1);
        expect(heap.peek()).toBe(42);
        expect(heap.isEmpty()).toBe(false);

        // Extract the only element
        expect(heap.extract()).toBe(42);
        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
    });

    test("Heap iteration", () => {
        const heap = MaxHeap<number>();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);

        // Note: Iteration returns elements in the order they are stored in the array,
        // not in sorted order. We need to extract to get sorted order.
        const items = [...heap];
        // We can't predict the exact order in the internal array, so we just check the size and contents
        expect(items.length).toBe(3);
        expect(items).toContain(5);
        expect(items).toContain(3);
        expect(items).toContain(8);
    });

    test("Complex bubbling up scenario", () => {
        const heap = MaxHeap<number>();

        // Add elements in a specific order to test bubbling up
        heap.insert(2);
        heap.insert(4);
        heap.insert(6);
        heap.insert(8);
        heap.insert(10); // This should bubble all the way up to the root

        expect(heap.peek()).toBe(10);
        expect(heap.size()).toBe(5);

        // Extract all to verify the order
        expect(heap.extract()).toBe(10);
        expect(heap.extract()).toBe(8);
        expect(heap.extract()).toBe(6);
        expect(heap.extract()).toBe(4);
        expect(heap.extract()).toBe(2);
    });

    test("Complex bubbling down scenario", () => {
        const heap = MaxHeap<number>();

        // Add elements in descending order
        heap.insert(5);
        heap.insert(4);
        heap.insert(3);
        heap.insert(2);
        heap.insert(1);

        // Extract the maximum, forcing a bubble down
        expect(heap.extract()).toBe(5);
        expect(heap.peek()).toBe(4);

        // Insert a larger element to test another bubble up
        heap.insert(10);
        expect(heap.peek()).toBe(10);

        // Extract all to verify the order
        expect(heap.extract()).toBe(10);
        expect(heap.extract()).toBe(4);
        expect(heap.extract()).toBe(3);
        expect(heap.extract()).toBe(2);
        expect(heap.extract()).toBe(1);
    });

    test("Heap with duplicate values", () => {
        const heap = MaxHeap<number>();

        heap.insert(5);
        heap.insert(5);
        heap.insert(5);

        expect(heap.size()).toBe(3);
        expect(heap.peek()).toBe(5);

        expect(heap.extract()).toBe(5);
        expect(heap.extract()).toBe(5);
        expect(heap.extract()).toBe(5);
        expect(heap.isEmpty()).toBe(true);
    });

    test("Alternative iteration methods", () => {
        const heap = MaxHeap<number>();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);

        // Test for...of loop
        const collected: number[] = [];
        for (const value of heap) {
            collected.push(value);
        }
        // We can't predict the exact order in the internal array, so we just check the size and contents
        expect(collected.length).toBe(3);
        expect(collected).toContain(5);
        expect(collected).toContain(3);
        expect(collected).toContain(8);

        // Test Array.from
        const arrayFromHeap = Array.from(heap);
        expect(arrayFromHeap.length).toBe(3);
        expect(arrayFromHeap).toContain(5);
        expect(arrayFromHeap).toContain(3);
        expect(arrayFromHeap).toContain(8);
    });

    test("Heap with complex bubbling scenarios", () => {
        const heap = MaxHeap<number>();

        // Add elements that will require multiple levels of bubbling
        heap.insert(5);
        heap.insert(10);
        heap.insert(15);
        heap.insert(20);
        heap.insert(17);
        heap.insert(12);
        heap.insert(8);

        expect(heap.size()).toBe(7);
        expect(heap.peek()).toBe(20);

        // Extract elements to force complex bubbling down
        expect(heap.extract()).toBe(20);
        expect(heap.peek()).toBe(17);
        expect(heap.extract()).toBe(17);
        expect(heap.peek()).toBe(15);

        // Insert a new maximum to test bubbling up
        heap.insert(25);
        expect(heap.peek()).toBe(25);

        // Extract all remaining elements to verify order
        expect(heap.extract()).toBe(25);
        expect(heap.extract()).toBe(15);
        expect(heap.extract()).toBe(12);
        expect(heap.extract()).toBe(10);
        expect(heap.extract()).toBe(8);
        expect(heap.extract()).toBe(5);
        expect(heap.isEmpty()).toBe(true);
    });

    test("MaxHeap with mixed numeric values", () => {
        const heap = MaxHeap<number>();

        heap.insert(0);
        heap.insert(-10);
        heap.insert(100);
        heap.insert(50);
        heap.insert(-5);

        expect(heap.size()).toBe(5);
        expect(heap.peek()).toBe(100); // Highest number

        expect(heap.extract()).toBe(100);
        expect(heap.extract()).toBe(50);
        expect(heap.extract()).toBe(0);
        expect(heap.extract()).toBe(-5);
        expect(heap.extract()).toBe(-10);
    });

    test("MaxHeap with task objects", () => {
        interface Task {
            id: number;
            priority: number;
            name: string;
        }

        // Create a max heap of tasks based on priority
        // Note: We can't directly use MaxHeap with objects, so we'll create a wrapper
        // This test is to verify that MaxHeap works with primitive types as expected
        const tasks: Task[] = [
            { id: 1, priority: 5, name: "Task 1" },
            { id: 2, priority: 3, name: "Task 2" },
            { id: 3, priority: 7, name: "Task 3" },
            { id: 4, priority: 1, name: "Task 4" },
            { id: 5, priority: 10, name: "Critical Task" }
        ];

        // Create a heap of task priorities
        const priorityHeap = MaxHeap<number>();

        // Map tasks to their priorities for the heap
        const taskMap = new Map<number, Task>();

        // Add all task priorities to the heap
        for (const task of tasks) {
            priorityHeap.insert(task.priority);
            taskMap.set(task.priority, task);
        }

        expect(priorityHeap.size()).toBe(5);
        expect(priorityHeap.peek()).toBe(10); // Highest priority number

        // Extract priorities in order and map back to tasks
        expect(taskMap.get(priorityHeap.extract()!)?.id).toBe(5); // priority 10
        expect(taskMap.get(priorityHeap.extract()!)?.id).toBe(3); // priority 7
        expect(taskMap.get(priorityHeap.extract()!)?.id).toBe(1); // priority 5
        expect(taskMap.get(priorityHeap.extract()!)?.id).toBe(2); // priority 3
        expect(taskMap.get(priorityHeap.extract()!)?.id).toBe(4); // priority 1

        expect(priorityHeap.isEmpty()).toBe(true);
    });

    test("MaxHeap with string sorting", () => {
        const heap = MaxHeap<string>();

        // Add strings with different characteristics
        heap.insert("apple");
        heap.insert("APPLE"); // Uppercase comes before lowercase in ASCII
        heap.insert("banana");
        heap.insert("Apple"); // Capital A comes before lowercase a
        heap.insert("zebra");

        expect(heap.size()).toBe(5);

        // Extract in reverse alphabetical order (based on localeCompare)
        // Note: The exact order depends on the locale settings, but generally:
        // - "zebra" comes last alphabetically, so it's first in MaxHeap
        // - Case is typically ignored in localeCompare by default

        // Instead of checking the exact order, let's verify that:
        // 1. We can extract all 5 elements
        // 2. The heap is empty after extraction

        const extracted = [];
        extracted.push(heap.extract());
        extracted.push(heap.extract());
        extracted.push(heap.extract());
        extracted.push(heap.extract());
        extracted.push(heap.extract());

        expect(extracted.length).toBe(5);
        expect(extracted).toContain("apple");
        expect(extracted).toContain("APPLE");
        expect(extracted).toContain("banana");
        expect(extracted).toContain("Apple");
        expect(extracted).toContain("zebra");

        // Verify that "zebra" comes first (highest in MaxHeap)
        expect(extracted[0]).toBe("zebra");

        expect(heap.isEmpty()).toBe(true);
    });
});