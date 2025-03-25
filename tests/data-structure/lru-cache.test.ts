import { LRUCache } from "../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("LRUCache", () => {
    test("Empty cache operations", () => {
        const cache = new LRUCache<string, number>(5);

        expect(cache.get("key1")).toBeUndefined();
        expect(cache.size()).toBe(0);
        expect(cache.keys()).toEqual([]);
        expect(cache.values()).toEqual([]);
    });

    test("Put and get operations", () => {
        const cache = new LRUCache<string, number>(5);

        cache.put("key1", 1);
        cache.put("key2", 2);
        cache.put("key3", 3);

        expect(cache.get("key1")).toBe(1);
        expect(cache.get("key2")).toBe(2);
        expect(cache.get("key3")).toBe(3);
        expect(cache.get("key4")).toBeUndefined();

        expect(cache.size()).toBe(3);
    });

    test("LRU eviction policy", () => {
        const cache = new LRUCache<string, number>(3);

        // Fill the cache
        cache.put("key1", 1);
        cache.put("key2", 2);
        cache.put("key3", 3);

        expect(cache.size()).toBe(3);

        // Add a new item, which should evict the least recently used (key1)
        cache.put("key4", 4);

        expect(cache.size()).toBe(3);
        expect(cache.get("key1")).toBeUndefined(); // key1 should be evicted
        expect(cache.get("key2")).toBe(2);
        expect(cache.get("key3")).toBe(3);
        expect(cache.get("key4")).toBe(4);
    });

    test("Accessing items updates LRU order", () => {
        const cache = new LRUCache<string, number>(3);

        // Fill the cache
        cache.put("key1", 1);
        cache.put("key2", 2);
        cache.put("key3", 3);

        // Access key1, making key2 the least recently used
        cache.get("key1");

        // Add a new item, which should evict the least recently used (key2)
        cache.put("key4", 4);

        expect(cache.size()).toBe(3);
        expect(cache.get("key1")).toBe(1);
        expect(cache.get("key2")).toBeUndefined(); // key2 should be evicted
        expect(cache.get("key3")).toBe(3);
        expect(cache.get("key4")).toBe(4);
    });

    test("Updating existing items", () => {
        const cache = new LRUCache<string, number>(3);

        cache.put("key1", 1);
        cache.put("key2", 2);

        // Update an existing key
        cache.put("key1", 10);

        expect(cache.get("key1")).toBe(10);
        expect(cache.size()).toBe(2);

        // Updating should also make the item most recently used
        cache.put("key3", 3);
        cache.put("key4", 4); // This should evict key2, not key1

        expect(cache.get("key1")).toBe(10);
        expect(cache.get("key2")).toBeUndefined();
        expect(cache.get("key3")).toBe(3);
        expect(cache.get("key4")).toBe(4);
    });

    test("Clear operation", () => {
        const cache = new LRUCache<string, number>(5);

        cache.put("key1", 1);
        cache.put("key2", 2);
        cache.put("key3", 3);

        expect(cache.size()).toBe(3);

        cache.clear();

        expect(cache.size()).toBe(0);
        expect(cache.get("key1")).toBeUndefined();
        expect(cache.get("key2")).toBeUndefined();
        expect(cache.get("key3")).toBeUndefined();
    });

    test("Keys and values operations", () => {
        const cache = new LRUCache<string, number>(5);

        cache.put("key1", 1);
        cache.put("key2", 2);
        cache.put("key3", 3);

        const keys = cache.keys();
        expect(keys.length).toBe(3);
        expect(keys).toContain("key1");
        expect(keys).toContain("key2");
        expect(keys).toContain("key3");

        const values = cache.values();
        expect(values.length).toBe(3);
        expect(values).toContain(1);
        expect(values).toContain(2);
        expect(values).toContain(3);
    });

    test("Cache with capacity 1", () => {
        const cache = new LRUCache<string, number>(1);

        cache.put("key1", 1);
        expect(cache.get("key1")).toBe(1);

        // Adding a new item should evict the only existing item
        cache.put("key2", 2);
        expect(cache.get("key1")).toBeUndefined();
        expect(cache.get("key2")).toBe(2);

        // Updating the existing item should not evict it
        cache.put("key2", 20);
        expect(cache.get("key2")).toBe(20);
    });

    test("Cache with object keys and values", () => {
        interface Person {
            id: number;
            name: string;
        }

        interface Address {
            street: string;
            city: string;
        }

        const cache = new LRUCache<Person, Address>(3);

        const person1: Person = { id: 1, name: "Alice" };
        const person2: Person = { id: 2, name: "Bob" };
        const person3: Person = { id: 3, name: "Charlie" };

        const address1: Address = { street: "123 Main St", city: "New York" };
        const address2: Address = { street: "456 Oak Ave", city: "Los Angeles" };
        const address3: Address = { street: "789 Pine Rd", city: "Chicago" };

        cache.put(person1, address1);
        cache.put(person2, address2);
        cache.put(person3, address3);

        expect(cache.get(person1)).toBe(address1);
        expect(cache.get(person2)).toBe(address2);
        expect(cache.get(person3)).toBe(address3);

        // Add a new item to test eviction
        const person4: Person = { id: 4, name: "Dave" };
        const address4: Address = { street: "101 Elm St", city: "Boston" };

        cache.put(person4, address4);

        expect(cache.get(person1)).toBeUndefined(); // Should be evicted
        expect(cache.get(person2)).toBe(address2);
        expect(cache.get(person3)).toBe(address3);
        expect(cache.get(person4)).toBe(address4);
    });

    test("Complex LRU cache operations", () => {
        const cache = new LRUCache<string, number>(3);

        // Fill the cache
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);

        // Access items in a specific order
        cache.get("A"); // LRU order: B, C, A
        cache.get("B"); // LRU order: C, A, B

        // Add a new item, evicting the least recently used (C)
        cache.put("D", 4); // LRU order: A, B, D

        expect(cache.get("C")).toBeUndefined();
        expect(cache.get("A")).toBe(1);
        expect(cache.get("B")).toBe(2);
        expect(cache.get("D")).toBe(4);

        // Access A, making it most recently used
        cache.get("A"); // LRU order: B, D, A

        // Add a new item, evicting the least recently used (B)
        cache.put("E", 5); // LRU order: D, A, E

        expect(cache.get("B")).toBeUndefined();
        expect(cache.get("D")).toBe(4);
        expect(cache.get("A")).toBe(1);
        expect(cache.get("E")).toBe(5);

        // Update an existing item
        cache.put("A", 10); // LRU order: D, E, A

        expect(cache.get("A")).toBe(10);

        // Add a new item, evicting the least recently used (D)
        cache.put("F", 6); // LRU order: E, A, F

        expect(cache.get("D")).toBeUndefined();
        expect(cache.get("E")).toBe(5);
        expect(cache.get("A")).toBe(10);
        expect(cache.get("F")).toBe(6);
    });
});