import { DisjointSet } from "../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("DisjointSet", () => {
    test("MakeSet operation", () => {
        const ds = new DisjointSet();

        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);

        // Each element should be in its own set
        expect(ds.find(1)).toBe(1);
        expect(ds.find(2)).toBe(2);
        expect(ds.find(3)).toBe(3);

        // Elements should not be connected
        expect(ds.connected(1, 2)).toBe(false);
        expect(ds.connected(1, 3)).toBe(false);
        expect(ds.connected(2, 3)).toBe(false);
    });

    test("Find operation with implicit makeSet", () => {
        const ds = new DisjointSet();

        // Find on elements that don't exist yet should create them
        expect(ds.find(1)).toBe(1);
        expect(ds.find(2)).toBe(2);

        // Elements should not be connected
        expect(ds.connected(1, 2)).toBe(false);
    });

    test("Union operation", () => {
        const ds = new DisjointSet();

        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);

        // Union 1 and 2
        ds.union(1, 2);
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.connected(1, 3)).toBe(false);

        // Union 3 and 4
        ds.union(3, 4);
        expect(ds.connected(3, 4)).toBe(true);
        expect(ds.connected(1, 3)).toBe(false);

        // Union 1 and 3 (this should connect all elements)
        ds.union(1, 3);
        expect(ds.connected(1, 3)).toBe(true);
        expect(ds.connected(1, 4)).toBe(true);
        expect(ds.connected(2, 3)).toBe(true);
        expect(ds.connected(2, 4)).toBe(true);
    });

    test("Union with implicit makeSet", () => {
        const ds = new DisjointSet();

        // Union elements that don't exist yet
        ds.union(1, 2);

        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.find(1)).toBe(ds.find(2));
    });

    test("Path compression optimization", () => {
        const ds = new DisjointSet();

        // Create a chain of elements
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);
        ds.makeSet(5);

        ds.union(1, 2);
        ds.union(2, 3);
        ds.union(3, 4);
        ds.union(4, 5);

        // Find operation should compress the path
        const root = ds.find(5);

        // All elements should now point directly to the root
        expect(ds.find(1)).toBe(root);
        expect(ds.find(2)).toBe(root);
        expect(ds.find(3)).toBe(root);
        expect(ds.find(4)).toBe(root);
        expect(ds.find(5)).toBe(root);
    });

    test("Union by rank optimization", () => {
        const ds = new DisjointSet();

        // Create two separate trees
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);
        ds.makeSet(5);
        ds.makeSet(6);

        // Create two trees of different heights
        ds.union(1, 2);
        ds.union(1, 3); // Tree 1 has height 1

        ds.union(4, 5);
        ds.union(4, 6);
        ds.union(5, 6); // Tree 4 has height 2

        // Union the two trees - the smaller tree (1,2,3) should be attached to the larger tree (4,5,6)
        ds.union(1, 4);

        // All elements should have the same root
        const root = ds.find(1);
        expect(ds.find(2)).toBe(root);
        expect(ds.find(3)).toBe(root);
        expect(ds.find(4)).toBe(root);
        expect(ds.find(5)).toBe(root);
        expect(ds.find(6)).toBe(root);
    });

    test("GetSize operation", () => {
        const ds = new DisjointSet();

        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);

        // Initially, each set has size 1
        expect(ds.getSize(1)).toBe(1);
        expect(ds.getSize(2)).toBe(1);

        // Union 1 and 2
        ds.union(1, 2);
        expect(ds.getSize(1)).toBe(2);
        expect(ds.getSize(2)).toBe(2);

        // Union 3 and 4
        ds.union(3, 4);
        expect(ds.getSize(3)).toBe(2);
        expect(ds.getSize(4)).toBe(2);

        // Union 1 and 3 (this should create a set of size 4)
        ds.union(1, 3);
        expect(ds.getSize(1)).toBe(4);
        expect(ds.getSize(2)).toBe(4);
        expect(ds.getSize(3)).toBe(4);
        expect(ds.getSize(4)).toBe(4);
    });

    test("GetSets operation", () => {
        const ds = new DisjointSet();

        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);
        ds.makeSet(5);

        // Initially, there should be 5 sets
        let sets = ds.getSets();
        expect(sets.size).toBe(5);

        // Union 1 and 2
        ds.union(1, 2);
        sets = ds.getSets();
        expect(sets.size).toBe(4);

        // Union 3 and 4
        ds.union(3, 4);
        sets = ds.getSets();
        expect(sets.size).toBe(3);

        // Union 1 and 3
        ds.union(1, 3);
        sets = ds.getSets();
        expect(sets.size).toBe(2);

        // Check the contents of the sets
        const root1 = ds.find(1);
        const root5 = ds.find(5);

        expect(sets.get(root1)?.sort()).toEqual([1, 2, 3, 4]);
        expect(sets.get(root5)).toEqual([5]);
    });

    test("Complex disjoint set operations", () => {
        const ds = new DisjointSet();

        // Create 10 elements
        for (let i = 1; i <= 10; i++) {
            ds.makeSet(i);
        }

        // Create several disjoint sets
        ds.union(1, 2);
        ds.union(3, 4);
        ds.union(5, 6);
        ds.union(7, 8);
        ds.union(9, 10);

        // Verify initial sets
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.connected(3, 4)).toBe(true);
        expect(ds.connected(5, 6)).toBe(true);
        expect(ds.connected(7, 8)).toBe(true);
        expect(ds.connected(9, 10)).toBe(true);

        expect(ds.connected(1, 3)).toBe(false);
        expect(ds.connected(3, 5)).toBe(false);
        expect(ds.connected(5, 7)).toBe(false);
        expect(ds.connected(7, 9)).toBe(false);

        // Merge sets
        ds.union(1, 3);
        ds.union(5, 7);

        // Verify merged sets
        expect(ds.connected(1, 4)).toBe(true);
        expect(ds.connected(5, 8)).toBe(true);
        expect(ds.connected(1, 5)).toBe(false);

        // Merge all sets
        ds.union(1, 5);
        ds.union(1, 9);

        // Verify all elements are in the same set
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                expect(ds.connected(i, j)).toBe(true);
            }
        }

        // Check size
        expect(ds.getSize(1)).toBe(10);

        // Check sets
        const sets = ds.getSets();
        expect(sets.size).toBe(1);
        expect(sets.get(ds.find(1))?.length).toBe(10);
    });
});