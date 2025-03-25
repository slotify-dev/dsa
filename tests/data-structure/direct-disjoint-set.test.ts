import { describe, test, expect } from "bun:test";
import DisjointSet from "../../src/data-structure/disjoint-set";

describe("DisjointSet Direct Testing", () => {
    test("Direct test for makeSet method", () => {
        const ds = new DisjointSet();
        
        // Test makeSet on a new element
        ds.makeSet(1);
        expect(ds.find(1)).toBe(1);
        
        // Test makeSet on an existing element
        ds.makeSet(1); // This should be a no-op
        expect(ds.find(1)).toBe(1);
    });
    
    test("Direct test for find method", () => {
        const ds = new DisjointSet();
        
        // Test find on a non-existent element (should create it)
        expect(ds.find(1)).toBe(1);
        
        // Test find with path compression
        ds.makeSet(2);
        ds.makeSet(3);
        ds.union(1, 2);
        ds.union(2, 3);
        
        // Find should compress the path
        const root = ds.find(3);
        expect(ds.find(1)).toBe(root);
        expect(ds.find(2)).toBe(root);
    });
    
    test("Direct test for union method - all branches", () => {
        // Test case 1: Union elements in the same set
        const ds1 = new DisjointSet();
        ds1.makeSet(1);
        ds1.makeSet(2);
        ds1.union(1, 2);
        
        // Union again - should be a no-op
        ds1.union(1, 2);
        expect(ds1.getSize(1)).toBe(2);
        
        // Test case 2: rootX rank < rootY rank
        const ds2 = new DisjointSet();
        ds2.makeSet(1);
        ds2.makeSet(2);
        ds2.makeSet(3);
        
        // Create a set with higher rank
        ds2.union(2, 3);
        
        // Union with lower rank set
        ds2.union(1, 2);
        expect(ds2.connected(1, 3)).toBe(true);
        
        // Test case 3: rootX rank > rootY rank
        const ds3 = new DisjointSet();
        ds3.makeSet(1);
        ds3.makeSet(2);
        ds3.makeSet(3);
        
        // Create a set with higher rank
        ds3.union(1, 2);
        
        // Union with lower rank set
        ds3.union(1, 3);
        expect(ds3.connected(2, 3)).toBe(true);
        
        // Test case 4: rootX rank == rootY rank
        const ds4 = new DisjointSet();
        ds4.makeSet(1);
        ds4.makeSet(2);
        
        // Union sets with equal rank
        ds4.union(1, 2);
        expect(ds4.connected(1, 2)).toBe(true);
    });
    
    test("Direct test for connected method", () => {
        const ds = new DisjointSet();
        
        // Test connected with non-existent elements
        expect(ds.connected(1, 2)).toBe(false);
        
        // Test connected with existing elements
        ds.makeSet(1);
        ds.makeSet(2);
        expect(ds.connected(1, 2)).toBe(false);
        
        // Test connected after union
        ds.union(1, 2);
        expect(ds.connected(1, 2)).toBe(true);
    });
    
    test("Direct test for getSize method", () => {
        const ds = new DisjointSet();
        
        // Test getSize with a new element
        ds.makeSet(1);
        expect(ds.getSize(1)).toBe(1);
        
        // Test getSize after union
        ds.makeSet(2);
        ds.union(1, 2);
        expect(ds.getSize(1)).toBe(2);
        expect(ds.getSize(2)).toBe(2);
    });
    
    test("Direct test for getSets method", () => {
        const ds = new DisjointSet();
        
        // Test getSets with empty set
        expect(ds.getSets().size).toBe(0);
        
        // Test getSets with one element
        ds.makeSet(1);
        let sets = ds.getSets();
        expect(sets.size).toBe(1);
        expect(sets.get(1)).toEqual([1]);
        
        // Test getSets with multiple elements
        ds.makeSet(2);
        ds.makeSet(3);
        sets = ds.getSets();
        expect(sets.size).toBe(3);
        
        // Test getSets after union
        ds.union(1, 2);
        sets = ds.getSets();
        expect(sets.size).toBe(2);
        
        // Test getSets after more unions
        ds.union(1, 3);
        sets = ds.getSets();
        expect(sets.size).toBe(1);
        expect(sets.get(ds.find(1))?.sort()).toEqual([1, 2, 3]);
    });
    
    test("Comprehensive test for all DisjointSet methods", () => {
        const ds = new DisjointSet();
        
        // Test all methods in sequence
        
        // 1. Create sets
        for (let i = 1; i <= 10; i++) {
            ds.makeSet(i);
        }
        
        // 2. Check initial state
        for (let i = 1; i <= 10; i++) {
            expect(ds.find(i)).toBe(i);
            expect(ds.getSize(i)).toBe(1);
        }
        
        // 3. Perform unions
        ds.union(1, 2);
        ds.union(3, 4);
        ds.union(5, 6);
        ds.union(7, 8);
        ds.union(9, 10);
        
        // 4. Check connected status
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.connected(3, 4)).toBe(true);
        expect(ds.connected(5, 6)).toBe(true);
        expect(ds.connected(7, 8)).toBe(true);
        expect(ds.connected(9, 10)).toBe(true);
        expect(ds.connected(1, 3)).toBe(false);
        
        // 5. Check sizes
        expect(ds.getSize(1)).toBe(2);
        expect(ds.getSize(3)).toBe(2);
        expect(ds.getSize(5)).toBe(2);
        expect(ds.getSize(7)).toBe(2);
        expect(ds.getSize(9)).toBe(2);
        
        // 6. Check sets
        let sets = ds.getSets();
        expect(sets.size).toBe(5);
        
        // 7. Perform more unions
        ds.union(1, 3);
        ds.union(5, 7);
        ds.union(1, 5);
        ds.union(1, 9);
        
        // 8. Check final state
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                expect(ds.connected(i, j)).toBe(true);
            }
            expect(ds.getSize(i)).toBe(10);
        }
        
        // 9. Check final sets
        sets = ds.getSets();
        expect(sets.size).toBe(1);
        expect(sets.get(ds.find(1))?.length).toBe(10);
    });
});