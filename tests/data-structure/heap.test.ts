import { Heap } from "../../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("Heap", () => {
    test("Custom comparator with strings", () => {
        const heap = new Heap<string>((a, b) => a.length - b.length);

        heap.insert("apple");
        heap.insert("banana");
        heap.insert("kiwi");

        expect(heap.peek()).toBe("kiwi");
        expect(heap.extract()).toBe("kiwi");
        expect(heap.extract()).toBe("apple");
        expect(heap.extract()).toBe("banana");
    });

    test("Empty heap operations", () => {
        const heap = new Heap<number>((a, b) => a - b);

        expect(heap.isEmpty()).toBe(true);
        expect(heap.size()).toBe(0);
        expect(heap.peek()).toBeUndefined();
        expect(heap.extract()).toBeUndefined();

        // Test iteration on empty heap
        const items = [...heap];
        expect(items).toEqual([]);
    });

    test("Heap with single element", () => {
        const heap = new Heap<number>((a, b) => a - b);

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
        const heap = new Heap<number>((a, b) => a - b);
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

    test("Alternative iteration methods", () => {
        const heap = new Heap<number>((a, b) => a - b);
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

    test("Complex bubbling up scenario", () => {
        const heap = new Heap<number>((a, b) => a - b);

        // Add elements in a specific order to test bubbling up
        heap.insert(10);
        heap.insert(8);
        heap.insert(6);
        heap.insert(4);
        heap.insert(2); // This should bubble all the way up to the root

        expect(heap.peek()).toBe(2);
        expect(heap.size()).toBe(5);

        // Extract all to verify the order
        expect(heap.extract()).toBe(2);
        expect(heap.extract()).toBe(4);
        expect(heap.extract()).toBe(6);
        expect(heap.extract()).toBe(8);
        expect(heap.extract()).toBe(10);
    });

    test("Complex bubbling down scenario", () => {
        const heap = new Heap<number>((a, b) => a - b);

        // Add elements in ascending order
        heap.insert(1);
        heap.insert(2);
        heap.insert(3);
        heap.insert(4);
        heap.insert(5);

        // Extract the minimum, forcing a bubble down
        expect(heap.extract()).toBe(1);
        expect(heap.peek()).toBe(2);

        // Insert a smaller element to test another bubble up
        heap.insert(0);
        expect(heap.peek()).toBe(0);

        // Extract all to verify the order
        expect(heap.extract()).toBe(0);
        expect(heap.extract()).toBe(2);
        expect(heap.extract()).toBe(3);
        expect(heap.extract()).toBe(4);
        expect(heap.extract()).toBe(5);
    });

    test("Heap with duplicate values", () => {
        const heap = new Heap<number>((a, b) => a - b);

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

    test("Heap with simple objects and priority field", () => {
        interface SimpleTask {
            id: number;
            priority: number;
        }

        // Min heap based on priority
        const taskQueue = new Heap<SimpleTask>((a, b) => a.priority - b.priority);

        taskQueue.insert({ id: 1, priority: 3 });
        taskQueue.insert({ id: 2, priority: 1 });
        taskQueue.insert({ id: 3, priority: 2 });

        expect(taskQueue.size()).toBe(3);

        // Check that the minimum priority task is at the top
        const topTask = taskQueue.peek();
        expect(topTask).toBeDefined();
        expect(topTask?.id).toBe(2);
        expect(topTask?.priority).toBe(1);

        // Extract tasks in priority order
        const task1 = taskQueue.extract();
        expect(task1?.id).toBe(2);
        expect(task1?.priority).toBe(1);

        const task2 = taskQueue.extract();
        expect(task2?.id).toBe(3);
        expect(task2?.priority).toBe(2);

        const task3 = taskQueue.extract();
        expect(task3?.id).toBe(1);
        expect(task3?.priority).toBe(3);

        expect(taskQueue.isEmpty()).toBe(true);
    });

    test("Heap with complex objects and custom comparator", () => {
        interface Person {
            name: string;
            age: number;
            skills: string[];
        }

        // Create a heap that prioritizes people by number of skills (more skills = higher priority)
        const skillsHeap = new Heap<Person>((a, b) => b.skills.length - a.skills.length);

        skillsHeap.insert({ name: "Alice", age: 30, skills: ["JavaScript", "TypeScript", "React"] });
        skillsHeap.insert({ name: "Bob", age: 25, skills: ["Python", "Django"] });
        skillsHeap.insert({ name: "Charlie", age: 35, skills: ["Java", "Spring", "Hibernate", "SQL"] });

        expect(skillsHeap.size()).toBe(3);

        // Check that the person with most skills is at the top
        const topPerson = skillsHeap.peek();
        expect(topPerson).toBeDefined();
        expect(topPerson?.name).toBe("Charlie");
        expect(topPerson?.skills.length).toBe(4);

        // Extract people in order of skills (most to least)
        const person1 = skillsHeap.extract();
        expect(person1?.name).toBe("Charlie");
        expect(person1?.skills.length).toBe(4);

        const person2 = skillsHeap.extract();
        expect(person2?.name).toBe("Alice");
        expect(person2?.skills.length).toBe(3);

        const person3 = skillsHeap.extract();
        expect(person3?.name).toBe("Bob");
        expect(person3?.skills.length).toBe(2);

        expect(skillsHeap.isEmpty()).toBe(true);
    });

    test("Heap with objects using multiple criteria for comparison", () => {
        interface Student {
            name: string;
            grade: number;
            attendance: number; // percentage
        }

        // Create a heap that first compares by grade (higher is better)
        // If grades are equal, compare by attendance (higher is better)
        const studentHeap = new Heap<Student>((a, b) => {
            if (a.grade !== b.grade) {
                return b.grade - a.grade; // Higher grade first
            }
            return b.attendance - a.attendance; // If grades equal, higher attendance first
        });

        studentHeap.insert({ name: "Alice", grade: 90, attendance: 95 });
        studentHeap.insert({ name: "Bob", grade: 85, attendance: 90 });
        studentHeap.insert({ name: "Charlie", grade: 90, attendance: 85 });
        studentHeap.insert({ name: "David", grade: 95, attendance: 80 });

        expect(studentHeap.size()).toBe(4);

        // Extract students in order (highest grade, then highest attendance)
        const student1 = studentHeap.extract();
        expect(student1?.name).toBe("David");
        expect(student1?.grade).toBe(95);

        const student2 = studentHeap.extract();
        expect(student2?.name).toBe("Alice");
        expect(student2?.grade).toBe(90);
        expect(student2?.attendance).toBe(95);

        const student3 = studentHeap.extract();
        expect(student3?.name).toBe("Charlie");
        expect(student3?.grade).toBe(90);
        expect(student3?.attendance).toBe(85);

        const student4 = studentHeap.extract();
        expect(student4?.name).toBe("Bob");
        expect(student4?.grade).toBe(85);

        expect(studentHeap.isEmpty()).toBe(true);
    });

    test("Heap with objects and bubbling operations", () => {
        interface Task {
            id: number;
            priority: number;
            name: string;
        }

        const taskHeap = new Heap<Task>((a, b) => a.priority - b.priority);

        // Add tasks in a specific order to test bubbling
        taskHeap.insert({ id: 1, priority: 5, name: "Task 1" });
        taskHeap.insert({ id: 2, priority: 3, name: "Task 2" });
        taskHeap.insert({ id: 3, priority: 7, name: "Task 3" });
        taskHeap.insert({ id: 4, priority: 1, name: "Task 4" }); // Should bubble up to the top

        expect(taskHeap.size()).toBe(4);

        // Check that the task with lowest priority number is at the top
        const topTask = taskHeap.peek();
        expect(topTask?.id).toBe(4);
        expect(topTask?.priority).toBe(1);

        // Extract the top task, forcing a bubble down
        const task1 = taskHeap.extract();
        expect(task1?.id).toBe(4);

        // Insert a new high-priority task
        taskHeap.insert({ id: 5, priority: 0, name: "Urgent Task" });

        // Check that the new task bubbled to the top
        const newTopTask = taskHeap.peek();
        expect(newTopTask?.id).toBe(5);
        expect(newTopTask?.priority).toBe(0);

        // Extract all remaining tasks to verify order
        expect(taskHeap.extract()?.id).toBe(5);
        expect(taskHeap.extract()?.id).toBe(2);
        expect(taskHeap.extract()?.id).toBe(1);
        expect(taskHeap.extract()?.id).toBe(3);
        expect(taskHeap.isEmpty()).toBe(true);
    });

    test("Heap with objects and iteration", () => {
        interface Product {
            id: number;
            price: number;
            name: string;
        }

        // Create a min heap based on price
        const productHeap = new Heap<Product>((a, b) => a.price - b.price);

        const products = [
            { id: 1, price: 19.99, name: "Book" },
            { id: 2, price: 5.99, name: "Pen" },
            { id: 3, price: 29.99, name: "Headphones" },
            { id: 4, price: 9.99, name: "Notebook" }
        ];

        // Add all products
        for (const product of products) {
            productHeap.insert(product);
        }

        expect(productHeap.size()).toBe(4);

        // Iterate through the heap and collect products
        const collectedProducts: Product[] = [];
        for (const product of productHeap) {
            collectedProducts.push(product);
        }

        // Verify that iteration preserves the original heap
        expect(productHeap.size()).toBe(4);
        expect(collectedProducts.length).toBe(4);

        // Check that all products are in the collection
        const collectedIds = collectedProducts.map(p => p.id);
        expect(collectedIds).toContain(1);
        expect(collectedIds).toContain(2);
        expect(collectedIds).toContain(3);
        expect(collectedIds).toContain(4);

        // Check that the products are in the correct order when extracted
        expect(productHeap.extract()?.id).toBe(2); // Pen ($5.99)
        expect(productHeap.extract()?.id).toBe(4); // Notebook ($9.99)
        expect(productHeap.extract()?.id).toBe(1); // Book ($19.99)
        expect(productHeap.extract()?.id).toBe(3); // Headphones ($29.99)
    });
});