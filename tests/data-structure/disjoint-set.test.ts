import { describe, test, expect } from "bun:test";
import { DisjointSet } from "../../src/data-structure";

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

    // Additional tests to improve coverage
    test("Union with same set", () => {
        const ds = new DisjointSet();
        
        ds.makeSet(1);
        ds.makeSet(2);
        
        // Union 1 and 2
        ds.union(1, 2);
        const root = ds.find(1);
        
        // Union elements that are already in the same set
        ds.union(1, 2);
        
        // The root should remain the same
        expect(ds.find(1)).toBe(root);
        expect(ds.find(2)).toBe(root);
        expect(ds.getSize(1)).toBe(2);
    });

    test("Union by rank with equal ranks", () => {
        const ds = new DisjointSet();
        
        // Create two sets with equal rank
        ds.makeSet(1);
        ds.makeSet(2);
        
        // Both have rank 0 initially
        ds.union(1, 2);
        
        // Create two more sets with equal rank
        ds.makeSet(3);
        ds.makeSet(4);
        
        // Both have rank 0 initially
        ds.union(3, 4);
        
        // Now union the two sets with equal rank (both have rank 1 after previous unions)
        ds.union(1, 3);
        
        // All should be in the same set
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.connected(1, 3)).toBe(true);
        expect(ds.connected(1, 4)).toBe(true);
        expect(ds.connected(2, 3)).toBe(true);
        expect(ds.connected(2, 4)).toBe(true);
        expect(ds.connected(3, 4)).toBe(true);
        
        // Size should be 4
        expect(ds.getSize(1)).toBe(4);
    });

    test("Union by rank with different ranks - smaller to larger", () => {
        const ds = new DisjointSet();
        
        // Create a set with rank 0
        ds.makeSet(1);
        
        // Create a set with rank 1
        ds.makeSet(2);
        ds.makeSet(3);
        ds.union(2, 3);
        
        // Union the smaller rank set to the larger rank set
        ds.union(1, 2);
        
        // All should be in the same set
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.connected(1, 3)).toBe(true);
        expect(ds.connected(2, 3)).toBe(true);
        
        // Size should be 3
        expect(ds.getSize(1)).toBe(3);
    });

    test("Union by rank with different ranks - larger to smaller", () => {
        const ds = new DisjointSet();
        
        // Create a set with rank 1
        ds.makeSet(1);
        ds.makeSet(2);
        ds.union(1, 2);
        
        // Create a set with rank 0
        ds.makeSet(3);
        
        // Union the larger rank set to the smaller rank set
        ds.union(1, 3);
        
        // All should be in the same set
        expect(ds.connected(1, 2)).toBe(true);
        expect(ds.connected(1, 3)).toBe(true);
        expect(ds.connected(2, 3)).toBe(true);
        
        // Size should be 3
        expect(ds.getSize(1)).toBe(3);
    });

    test("GetSets with empty DisjointSet", () => {
        const ds = new DisjointSet();
        
        const sets = ds.getSets();
        expect(sets.size).toBe(0);
    });

    test("GetSets after multiple operations", () => {
        const ds = new DisjointSet();
        
        // Create several sets
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);
        ds.makeSet(5);
        
        // Union some sets
        ds.union(1, 2);
        ds.union(3, 4);
        
        // Get the sets
        let sets = ds.getSets();
        expect(sets.size).toBe(3);
        
        // Union all sets
        ds.union(1, 3);
        ds.union(1, 5);
        
        // Get the sets again
        sets = ds.getSets();
        expect(sets.size).toBe(1);
        
        // Check the content of the set
        const root = ds.find(1);
        const elements = sets.get(root);
        expect(elements?.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    test("Multiple makeSet calls on the same element", () => {
        const ds = new DisjointSet();
        
        // Call makeSet multiple times on the same element
        ds.makeSet(1);
        ds.makeSet(1); // Second call should have no effect
        ds.makeSet(1); // Third call should have no effect
        
        // The element should still be in its own set
        expect(ds.find(1)).toBe(1);
        expect(ds.getSize(1)).toBe(1);
        
        // Add another element and union
        ds.makeSet(2);
        ds.union(1, 2);
        
        // Size should be 2, not more
        expect(ds.getSize(1)).toBe(2);
    });

    test("Find with path compression - complex case", () => {
        const ds = new DisjointSet();
        
        // Create a deep chain
        for (let i = 1; i <= 10; i++) {
            ds.makeSet(i);
        }
        
        // Create a chain-like structure
        for (let i = 1; i < 10; i++) {
            ds.union(i, i + 1);
        }
        
        // Find the root of element 1 (should compress the path)
        const root = ds.find(1);
        
        // All elements should now point directly to the root
        for (let i = 1; i <= 10; i++) {
            expect(ds.find(i)).toBe(root);
        }
        
        // Size should be 10
        expect(ds.getSize(1)).toBe(10);
    });

    test("Union operations with different rank scenarios", () => {
        const ds = new DisjointSet();
        
        // Create sets with different ranks
        
        // Set 1: rank 0
        ds.makeSet(1);
        
        // Set 2: rank 1
        ds.makeSet(2);
        ds.makeSet(3);
        ds.union(2, 3);
        
        // Set 3: rank 2
        ds.makeSet(4);
        ds.makeSet(5);
        ds.makeSet(6);
        ds.makeSet(7);
        ds.union(4, 5);
        ds.union(6, 7);
        ds.union(4, 6);
        
        // Union rank 0 with rank 2
        ds.union(1, 4);
        expect(ds.find(1)).toBe(ds.find(4));
        expect(ds.getSize(1)).toBe(5);
        
        // Union rank 1 with the combined set (rank 2)
        ds.union(2, 4);
        
        // All elements should be in the same set
        for (let i = 1; i <= 7; i++) {
            for (let j = 1; j <= 7; j++) {
                expect(ds.connected(i, j)).toBe(true);
            }
        }
        
        // Size should be 7
        expect(ds.getSize(1)).toBe(7);
    });

    test("Comprehensive test for all rank scenarios in union", () => {
        // Test case 1: rootX rank < rootY rank
        const ds1 = new DisjointSet();
        
        // Create a set with rank 0
        ds1.makeSet(1);
        
        // Create a set with rank 1
        ds1.makeSet(2);
        ds1.makeSet(3);
        ds1.union(2, 3);
        
        // Union them - rootX (1) has lower rank than rootY (2)
        ds1.union(1, 2);
        
        // Check that 1 is now in the same set as 2 and 3
        expect(ds1.connected(1, 2)).toBe(true);
        expect(ds1.connected(1, 3)).toBe(true);
        expect(ds1.getSize(1)).toBe(3);
        
        // Test case 2: rootX rank > rootY rank
        const ds2 = new DisjointSet();
        
        // Create a set with rank 1
        ds2.makeSet(1);
        ds2.makeSet(2);
        ds2.union(1, 2);
        
        // Create a set with rank 0
        ds2.makeSet(3);
        
        // Union them - rootX (1) has higher rank than rootY (3)
        ds2.union(1, 3);
        
        // Check that 3 is now in the same set as 1 and 2
        expect(ds2.connected(3, 1)).toBe(true);
        expect(ds2.connected(3, 2)).toBe(true);
        expect(ds2.getSize(3)).toBe(3);
        
        // Test case 3: rootX rank == rootY rank
        const ds3 = new DisjointSet();
        
        // Create two sets with rank 0
        ds3.makeSet(1);
        ds3.makeSet(2);
        
        // Union them - ranks are equal, so rootX's rank should increase
        ds3.union(1, 2);
        
        // Check that they're in the same set
        expect(ds3.connected(1, 2)).toBe(true);
        expect(ds3.getSize(1)).toBe(2);
        
        // Create another set with rank 0
        ds3.makeSet(3);
        
        // Union with the combined set - rootX (1) now has rank 1, rootY (3) has rank 0
        ds3.union(1, 3);
        
        // Check that all are in the same set
        expect(ds3.connected(1, 3)).toBe(true);
        expect(ds3.connected(2, 3)).toBe(true);
        expect(ds3.getSize(1)).toBe(3);
    });

    test("Comprehensive test for find with path compression", () => {
        const ds = new DisjointSet();
        
        // Create a chain-like structure
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);
        ds.makeSet(5);
        
        // Manually set parent relationships to create a chain
        // 1 <- 2 <- 3 <- 4 <- 5
        ds.union(1, 2);
        ds.union(2, 3);
        ds.union(3, 4);
        ds.union(4, 5);
        
        // Find the root of 5, which should compress the path
        const root = ds.find(5);
        
        // All elements should now point directly to the root
        expect(ds.find(1)).toBe(root);
        expect(ds.find(2)).toBe(root);
        expect(ds.find(3)).toBe(root);
        expect(ds.find(4)).toBe(root);
        expect(ds.find(5)).toBe(root);
    });

    test("Edge cases for getSets", () => {
        const ds = new DisjointSet();
        
        // Empty disjoint set
        let sets = ds.getSets();
        expect(sets.size).toBe(0);
        
        // Single element
        ds.makeSet(1);
        sets = ds.getSets();
        expect(sets.size).toBe(1);
        expect(sets.get(1)).toEqual([1]);
        
        // Multiple single-element sets
        ds.makeSet(2);
        ds.makeSet(3);
        sets = ds.getSets();
        expect(sets.size).toBe(3);
        
        // After unions
        ds.union(1, 2);
        ds.union(1, 3);
        sets = ds.getSets();
        expect(sets.size).toBe(1);
        
        // Add more elements and check
        ds.makeSet(4);
        ds.makeSet(5);
        sets = ds.getSets();
        expect(sets.size).toBe(3);
        
        // Union all
        ds.union(1, 4);
        ds.union(1, 5);
        sets = ds.getSets();
        expect(sets.size).toBe(1);
        expect(sets.get(ds.find(1))?.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    test("Extremely detailed test for all union rank scenarios", () => {
        // Test all three rank comparison scenarios in isolation
        
        // Scenario 1: rootX.rank < rootY.rank
        const ds1 = new DisjointSet();
        ds1.makeSet(1); // rank 0
        ds1.makeSet(2); // rank 0
        ds1.makeSet(3); // rank 0
        
        // Make rootY have higher rank
        ds1.union(2, 3); // Now root of 2,3 has rank 1
        
        // Union with rootX having lower rank
        ds1.union(1, 2);
        
        // Verify the union worked correctly
        expect(ds1.connected(1, 2)).toBe(true);
        expect(ds1.connected(1, 3)).toBe(true);
        expect(ds1.getSize(1)).toBe(3);
        
        // Scenario 2: rootX.rank > rootY.rank
        const ds2 = new DisjointSet();
        ds2.makeSet(1); // rank 0
        ds2.makeSet(2); // rank 0
        ds2.makeSet(3); // rank 0
        
        // Make rootX have higher rank
        ds2.union(1, 2); // Now root of 1,2 has rank 1
        
        // Union with rootX having higher rank
        ds2.union(1, 3);
        
        // Verify the union worked correctly
        expect(ds2.connected(1, 3)).toBe(true);
        expect(ds2.connected(2, 3)).toBe(true);
        expect(ds2.getSize(1)).toBe(3);
        
        // Scenario 3: rootX.rank == rootY.rank
        const ds3 = new DisjointSet();
        ds3.makeSet(1); // rank 0
        ds3.makeSet(2); // rank 0
        
        // Union with equal ranks
        ds3.union(1, 2);
        
        // Verify the union worked correctly
        expect(ds3.connected(1, 2)).toBe(true);
        expect(ds3.getSize(1)).toBe(2);
        
        // Add another element to test that the rank increased
        ds3.makeSet(3); // rank 0
        ds3.union(1, 3);
        
        // Verify the union worked correctly
        expect(ds3.connected(1, 3)).toBe(true);
        expect(ds3.connected(2, 3)).toBe(true);
        expect(ds3.getSize(1)).toBe(3);
    });

    test("Extremely detailed test for find with path compression", () => {
        const ds = new DisjointSet();
        
        // Create elements
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        ds.makeSet(4);
        ds.makeSet(5);
        
        // Create a chain: 1 <- 2 <- 3 <- 4 <- 5
        ds.union(1, 2);
        ds.union(2, 3);
        ds.union(3, 4);
        ds.union(4, 5);
        
        // Find the root of 5, which should compress the path
        const root = ds.find(5);
        
        // All elements should now point directly to the root
        expect(ds.find(1)).toBe(root);
        expect(ds.find(2)).toBe(root);
        expect(ds.find(3)).toBe(root);
        expect(ds.find(4)).toBe(root);
        expect(ds.find(5)).toBe(root);
        
        // Test find on a non-existent element (should create it)
        const newRoot = ds.find(6);
        expect(newRoot).toBe(6);
        
        // Test find on an element that is its own parent
        expect(ds.find(6)).toBe(6);
    });

    test("Extremely detailed test for all union operations", () => {
        const ds = new DisjointSet();
        
        // Create elements
        for (let i = 1; i <= 10; i++) {
            ds.makeSet(i);
        }
        
        // Test union of elements that are already in the same set
        ds.union(1, 2);
        const root1 = ds.find(1);
        ds.union(1, 2); // This should have no effect
        expect(ds.find(1)).toBe(root1);
        expect(ds.find(2)).toBe(root1);
        expect(ds.getSize(1)).toBe(2);
        
        // Test union with different rank scenarios
        
        // Create sets with different ranks
        ds.union(3, 4); // Rank 1
        ds.union(5, 6);
        ds.union(5, 7); // Rank 1
        
        ds.union(8, 9);
        ds.union(8, 10); // Rank 1
        
        // Union sets with equal ranks
        ds.union(3, 5); // Both rank 1, result should be rank 2
        
        // Union a set with lower rank to higher rank
        ds.union(1, 3); // Rank 1 to rank 2
        
        // Union a set with higher rank to lower rank
        ds.union(8, 3); // Rank 1 to rank 2
        
        // All elements should be in the same set
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                expect(ds.connected(i, j)).toBe(true);
            }
        }
        
        // Size should be 10
        expect(ds.getSize(1)).toBe(10);
    });

    test("Extremely detailed test for all getSets scenarios", () => {
        const ds = new DisjointSet();
        
        // Empty set
        expect(ds.getSets().size).toBe(0);
        
        // Add elements but don't union them
        for (let i = 1; i <= 5; i++) {
            ds.makeSet(i);
        }
        
        // Each element should be in its own set
        let sets = ds.getSets();
        expect(sets.size).toBe(5);
        for (let i = 1; i <= 5; i++) {
            expect(sets.has(i)).toBe(true);
            expect(sets.get(i)).toEqual([i]);
        }
        
        // Union some elements
        ds.union(1, 2);
        ds.union(3, 4);
        
        // Should now have 3 sets
        sets = ds.getSets();
        expect(sets.size).toBe(3);
        
        // Check the contents of each set
        const root1 = ds.find(1);
        const root3 = ds.find(3);
        const root5 = ds.find(5);
        
        expect(sets.get(root1)?.sort()).toEqual([1, 2]);
        expect(sets.get(root3)?.sort()).toEqual([3, 4]);
        expect(sets.get(root5)).toEqual([5]);
        
        // Union all elements
        ds.union(1, 3);
        ds.union(1, 5);
        
        // Should now have 1 set
        sets = ds.getSets();
        expect(sets.size).toBe(1);
        
        // Check the contents of the set
        const root = ds.find(1);
        expect(sets.get(root)?.sort()).toEqual([1, 2, 3, 4, 5]);
    });

    test("Targeted test for makeSet with existing element", () => {
        const ds = new DisjointSet();
        
        // Create a set with element 1
        ds.makeSet(1);
        expect(ds.find(1)).toBe(1);
        
        // Call makeSet again on the same element
        ds.makeSet(1);
        expect(ds.find(1)).toBe(1);
        
        // The size should still be 1
        expect(ds.getSize(1)).toBe(1);
    });

    test("Targeted test for find with path compression", () => {
        const ds = new DisjointSet();
        
        // Create a chain of elements
        ds.makeSet(1);
        ds.makeSet(2);
        ds.makeSet(3);
        
        // Manually set parent relationships to create a chain
        // 1 <- 2 <- 3
        ds.union(1, 2);
        ds.union(2, 3);
        
        // Find the root of 3, which should compress the path
        const root = ds.find(3);
        expect(root).toBe(ds.find(1));
        
        // All elements should now point directly to the root
        expect(ds.find(2)).toBe(root);
    });

    test("Targeted test for all union rank scenarios", () => {
        // Test case 1: rootX rank < rootY rank
        const ds1 = new DisjointSet();
        ds1.makeSet(1);
        ds1.makeSet(2);
        ds1.makeSet(3);
        
        // Make rootY have higher rank
        ds1.union(2, 3);
        
        // Union with rootX having lower rank
        ds1.union(1, 2);
        expect(ds1.connected(1, 2)).toBe(true);
        expect(ds1.connected(1, 3)).toBe(true);
        
        // Test case 2: rootX rank > rootY rank
        const ds2 = new DisjointSet();
        ds2.makeSet(1);
        ds2.makeSet(2);
        ds2.makeSet(3);
        
        // Make rootX have higher rank
        ds2.union(1, 2);
        
        // Union with rootX having higher rank
        ds2.union(1, 3);
        expect(ds2.connected(1, 3)).toBe(true);
        expect(ds2.connected(2, 3)).toBe(true);
        
        // Test case 3: rootX rank == rootY rank
        const ds3 = new DisjointSet();
        ds3.makeSet(1);
        ds3.makeSet(2);
        
        // Union with equal ranks
        ds3.union(1, 2);
        expect(ds3.connected(1, 2)).toBe(true);
    });

    test("Targeted test for connected method", () => {
        const ds = new DisjointSet();
        
        // Create two separate sets
        ds.makeSet(1);
        ds.makeSet(2);
        
        // Elements should not be connected initially
        expect(ds.connected(1, 2)).toBe(false);
        
        // Connect the elements
        ds.union(1, 2);
        
        // Elements should now be connected
        expect(ds.connected(1, 2)).toBe(true);
        
        // Test with elements that don't exist yet
        expect(ds.connected(3, 4)).toBe(false);
        
        // Connect one new element to existing set
        ds.union(1, 3);
        expect(ds.connected(2, 3)).toBe(true);
    });

    test("Targeted test for getSize method", () => {
        const ds = new DisjointSet();
        
        // Create a set with one element
        ds.makeSet(1);
        expect(ds.getSize(1)).toBe(1);
        
        // Add another element to the set
        ds.makeSet(2);
        ds.union(1, 2);
        expect(ds.getSize(1)).toBe(2);
        expect(ds.getSize(2)).toBe(2);
        
        // Add more elements
        ds.makeSet(3);
        ds.makeSet(4);
        ds.union(3, 4);
        expect(ds.getSize(3)).toBe(2);
        
        // Union the two sets
        ds.union(1, 3);
        expect(ds.getSize(1)).toBe(4);
        expect(ds.getSize(2)).toBe(4);
        expect(ds.getSize(3)).toBe(4);
        expect(ds.getSize(4)).toBe(4);
    });
});