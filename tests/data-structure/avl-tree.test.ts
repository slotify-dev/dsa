import { AVLTree } from "../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("AVLTree", () => {
    test("Empty tree operations", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        expect(avl.isEmpty()).toBe(true);
        expect(avl.search(10)).toBe(false);
        expect(avl.inOrderTraversal()).toEqual([]);
    });

    test("Insert and search operations", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(15);
        avl.insert(3);
        avl.insert(7);

        expect(avl.isEmpty()).toBe(false);
        expect(avl.search(10)).toBe(true);
        expect(avl.search(5)).toBe(true);
        expect(avl.search(15)).toBe(true);
        expect(avl.search(3)).toBe(true);
        expect(avl.search(7)).toBe(true);
        expect(avl.search(100)).toBe(false);
        expect(avl.search(1)).toBe(false);
    });

    test("In-order traversal", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(15);
        avl.insert(3);
        avl.insert(7);

        // In-order traversal should return sorted elements
        expect(avl.inOrderTraversal()).toEqual([3, 5, 7, 10, 15]);
    });

    test("Left-Left rotation case", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        // Insert elements that will trigger a left-left rotation
        avl.insert(30);
        avl.insert(20);
        avl.insert(10);

        // After rotation, the tree should be balanced
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
    });

    test("Right-Right rotation case", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        // Insert elements that will trigger a right-right rotation
        avl.insert(10);
        avl.insert(20);
        avl.insert(30);

        // After rotation, the tree should be balanced
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
    });

    test("Left-Right rotation case", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        // Insert elements that will trigger a left-right rotation
        avl.insert(30);
        avl.insert(10);
        avl.insert(20);

        // After rotation, the tree should be balanced
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
    });

    test("Right-Left rotation case", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        // Insert elements that will trigger a right-left rotation
        avl.insert(10);
        avl.insert(30);
        avl.insert(20);

        // After rotation, the tree should be balanced
        expect(avl.inOrderTraversal()).toEqual([10, 20, 30]);
    });

    test("Remove operations - leaf node", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(15);

        // Remove a leaf node
        avl.remove(5);
        expect(avl.search(5)).toBe(false);
        expect(avl.inOrderTraversal()).toEqual([10, 15]);
    });

    test("Remove operations - node with one child", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(15);
        avl.insert(3);

        // Remove a node with one child
        avl.remove(5);
        expect(avl.search(5)).toBe(false);
        expect(avl.search(3)).toBe(true);
        expect(avl.inOrderTraversal()).toEqual([3, 10, 15]);
    });

    test("Remove operations - node with two children", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(15);
        avl.insert(3);
        avl.insert(7);
        avl.insert(12);
        avl.insert(17);

        // Remove a node with two children
        avl.remove(15);
        expect(avl.search(15)).toBe(false);
        expect(avl.search(12)).toBe(true);
        expect(avl.search(17)).toBe(true);

        // Check the structure is still valid
        expect(avl.inOrderTraversal()).toEqual([3, 5, 7, 10, 12, 17]);
    });

    test("Remove operations - root node", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(15);

        // Remove the root
        avl.remove(10);
        expect(avl.search(10)).toBe(false);
        expect(avl.inOrderTraversal()).toEqual([5, 15]);
    });

    test("Remove operations - non-existent node", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(15);

        // Try to remove a node that doesn't exist
        avl.remove(100);
        expect(avl.inOrderTraversal()).toEqual([5, 10, 15]);
    });

    test("Remove operations - empty tree", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        // Try to remove from an empty tree
        avl.remove(10);
        expect(avl.isEmpty()).toBe(true);
    });

    test("Remove operations with rebalancing", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        // Create a tree that will need rebalancing after removal
        avl.insert(10);
        avl.insert(5);
        avl.insert(15);
        avl.insert(3);
        avl.insert(7);
        avl.insert(12);
        avl.insert(17);
        avl.insert(1);
        avl.insert(4);

        // Remove nodes to trigger rebalancing
        avl.remove(15);
        avl.remove(17);

        // Check that the tree is still balanced
        expect(avl.inOrderTraversal()).toEqual([1, 3, 4, 5, 7, 10, 12]);
    });

    test("AVL with string values", () => {
        const avl = new AVLTree<string>((a, b) => a.localeCompare(b));

        avl.insert("banana");
        avl.insert("apple");
        avl.insert("cherry");

        expect(avl.search("apple")).toBe(true);
        expect(avl.search("banana")).toBe(true);
        expect(avl.search("cherry")).toBe(true);
        expect(avl.search("date")).toBe(false);

        expect(avl.inOrderTraversal()).toEqual(["apple", "banana", "cherry"]);
    });

    test("AVL with custom objects", () => {
        interface Person {
            id: number;
            name: string;
        }

        const avl = new AVLTree<Person>((a, b) => a.id - b.id);

        const alice = { id: 2, name: "Alice" };
        const bob = { id: 1, name: "Bob" };
        const charlie = { id: 3, name: "Charlie" };

        avl.insert(alice);
        avl.insert(bob);
        avl.insert(charlie);

        expect(avl.search({ id: 2, name: "Alice" })).toBe(true);
        expect(avl.search({ id: 1, name: "Bob" })).toBe(true);
        expect(avl.search({ id: 3, name: "Charlie" })).toBe(true);
        expect(avl.search({ id: 4, name: "Dave" })).toBe(false);

        // In-order traversal should return objects sorted by id
        const inOrder = avl.inOrderTraversal();
        expect(inOrder.length).toBe(3);
        expect(inOrder[0].id).toBe(1);
        expect(inOrder[1].id).toBe(2);
        expect(inOrder[2].id).toBe(3);
    });

    test("Complex AVL operations", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        // Insert elements in ascending order (would create an unbalanced BST)
        for (let i = 1; i <= 15; i++) {
            avl.insert(i);
        }

        // Verify in-order traversal
        expect(avl.inOrderTraversal()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        // Remove some elements
        avl.remove(8);  // Root or near-root
        avl.remove(1);  // Leaf node
        avl.remove(15); // Leaf node

        // Verify structure is still valid
        expect(avl.inOrderTraversal()).toEqual([2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]);

        // Search for removed and existing elements
        expect(avl.search(8)).toBe(false);
        expect(avl.search(1)).toBe(false);
        expect(avl.search(15)).toBe(false);
        expect(avl.search(7)).toBe(true);
        expect(avl.search(14)).toBe(true);
    });

    test("AVL with duplicate values", () => {
        const avl = new AVLTree<number>((a, b) => a - b);

        avl.insert(10);
        avl.insert(5);
        avl.insert(10); // Duplicate

        // The second 10 should be ignored or placed to the right
        expect(avl.inOrderTraversal()).toContain(5);
        expect(avl.inOrderTraversal()).toContain(10);

        // Remove one instance of 10
        avl.remove(10);
        expect(avl.search(10)).toBe(false); // All instances should be removed
        expect(avl.inOrderTraversal()).toEqual([5]);
    });
});