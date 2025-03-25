import { describe, test, expect } from "bun:test";
import DisjointSet from "../../src/data-structure/disjoint-set";

describe("DisjointSet Union Method Testing", () => {
    test("Union with same root", () => {
        const ds = new DisjointSet();
        
        // Create elements
        ds.makeSet(1);
        ds.makeSet(2);
        
        // Union them
        ds.union(1, 2);
        
        // Try to union again - should be a no-op
        ds.union(1, 2);
        ds.union(2, 1);
        
        // Size should still be 2
        expect(ds.getSize(1)).toBe(2);
    });
    
    test("Union with rootX.rank < rootY.rank", () => {
        const ds = new DisjointSet();
        
        // Create elements
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        
        // Make rootY have higher rank
        ds.union(2, 3);
        
        // Union with rootX having lower rank
        ds.union(1, 2);
        
        // Check that the union worked correctly
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.connected(1, 3)).toBe(true);
        expect(ds.getSize(1)).toBe(3);
        
        // Check that the root is correct
        const root = ds.find(2);
        expect(ds.find(1)).toBe(root);
        expect(ds.find(3)).toBe(root);
    });
    
    test("Union with rootX.rank > rootY.rank", () => {
        const ds = new DisjointSet();
        
        // Create elements
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        
        // Make rootX have higher rank
        ds.union(1, 2);
        
        // Union with rootX having higher rank
        ds.union(1, 3);
        
        // Check that the union worked correctly
        expect(ds.connected(1, 3)).toBe(true);
        expect(ds.connected(2, 3)).toBe(true);
        expect(ds.getSize(1)).toBe(3);
        
        // Check that the root is correct
        const root = ds.find(1);
        expect(ds.find(2)).toBe(root);
        expect(ds.find(3)).toBe(root);
    });
    
    test("Union with rootX.rank == rootY.rank", () => {
        const ds = new DisjointSet();
        
        // Create elements
        ds.makeSet(1);
        ds.makeSet(2);
        
        // Both have rank 0
        ds.union(1, 2);
        
        // Check that the union worked correctly
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.getSize(1)).toBe(2);
        
        // Check that the root is correct
        const root = ds.find(1);
        expect(ds.find(2)).toBe(root);
        
        // Add another element to verify rank increased
        ds.makeSet(3);
        ds.union(1, 3);
        
        // Check that the union worked correctly
        expect(ds.connected(1, 3)).toBe(true);
        expect(ds.connected(2, 3)).toBe(true);
        expect(ds.getSize(1)).toBe(3);
    });
    
    test("Multiple unions with different rank scenarios", () => {
        const ds = new DisjointSet();
        
        // Create 10 elements
        for (let i = 1; i <= 10; i++) {
            ds.makeSet(i);
        }
        
        // Create sets with different ranks
        
        // Set 1-2: rank 1
        ds.union(1, 2);
        
        // Set 3-4-5: rank 1
        ds.union(3, 4);
        ds.union(3, 5);
        
        // Set 6-7-8-9-10: rank 2
        ds.union(6, 7);
        ds.union(8, 9);
        ds.union(6, 8);
        ds.union(6, 10);
        
        // Union set 1-2 with set 3-4-5 (equal ranks)
        ds.union(1, 3);
        
        // Check that the union worked correctly
        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 5; j++) {
                expect(ds.connected(i, j)).toBe(true);
            }
        }
        
        // Union set 1-2-3-4-5 with set 6-7-8-9-10 (lower rank to higher rank)
        ds.union(1, 6);
        
        // Check that all elements are in the same set
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                expect(ds.connected(i, j)).toBe(true);
            }
        }
        
        // Size should be 10
        expect(ds.getSize(1)).toBe(10);
    });
});