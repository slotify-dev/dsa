import { BinarySearchTree } from "../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("BinarySearchTree", () => {
    test("Empty tree operations", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        expect(bst.isEmpty()).toBe(true);
        expect(bst.search(10)).toBe(false);
        expect(bst.inOrderTraversal()).toEqual([]);
        expect(bst.preOrderTraversal()).toEqual([]);
        expect(bst.postOrderTraversal()).toEqual([]);
    });

    test("Insert and search operations", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        expect(bst.isEmpty()).toBe(false);
        expect(bst.search(10)).toBe(true);
        expect(bst.search(5)).toBe(true);
        expect(bst.search(15)).toBe(true);
        expect(bst.search(3)).toBe(true);
        expect(bst.search(7)).toBe(true);
        expect(bst.search(100)).toBe(false);
        expect(bst.search(1)).toBe(false);
    });

    test("Traversal operations", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);

        // In-order traversal should return sorted elements
        expect(bst.inOrderTraversal()).toEqual([3, 5, 7, 10, 15]);

        // Pre-order traversal: root, left, right
        expect(bst.preOrderTraversal()).toEqual([10, 5, 3, 7, 15]);

        // Post-order traversal: left, right, root
        expect(bst.postOrderTraversal()).toEqual([3, 7, 5, 15, 10]);
    });

    test("Remove operations - leaf node", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        // Remove a leaf node
        bst.remove(5);
        expect(bst.search(5)).toBe(false);
        expect(bst.inOrderTraversal()).toEqual([10, 15]);
    });

    test("Remove operations - node with one child", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);

        // Remove a node with one child
        bst.remove(5);
        expect(bst.search(5)).toBe(false);
        expect(bst.search(3)).toBe(true);
        expect(bst.inOrderTraversal()).toEqual([3, 10, 15]);
    });

    test("Remove operations - node with two children", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);
        bst.insert(12);
        bst.insert(17);

        // Remove a node with two children
        bst.remove(15);
        expect(bst.search(15)).toBe(false);
        expect(bst.search(12)).toBe(true);
        expect(bst.search(17)).toBe(true);

        // Check the structure is still valid
        expect(bst.inOrderTraversal()).toEqual([3, 5, 7, 10, 12, 17]);
    });

    test("Remove operations - root node", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        // Remove the root
        bst.remove(10);
        expect(bst.search(10)).toBe(false);
        expect(bst.inOrderTraversal()).toEqual([5, 15]);
    });

    test("Remove operations - non-existent node", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(15);

        // Try to remove a node that doesn't exist
        bst.remove(100);
        expect(bst.inOrderTraversal()).toEqual([5, 10, 15]);
    });

    test("Remove operations - empty tree", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        // Try to remove from an empty tree
        bst.remove(10);
        expect(bst.isEmpty()).toBe(true);
    });

    test("BST with string values", () => {
        const bst = new BinarySearchTree<string>((a, b) => a.localeCompare(b));

        bst.insert("banana");
        bst.insert("apple");
        bst.insert("cherry");

        expect(bst.search("apple")).toBe(true);
        expect(bst.search("banana")).toBe(true);
        expect(bst.search("cherry")).toBe(true);
        expect(bst.search("date")).toBe(false);

        expect(bst.inOrderTraversal()).toEqual(["apple", "banana", "cherry"]);
    });

    test("BST with custom objects", () => {
        interface Person {
            id: number;
            name: string;
        }

        const bst = new BinarySearchTree<Person>((a, b) => a.id - b.id);

        const alice = { id: 2, name: "Alice" };
        const bob = { id: 1, name: "Bob" };
        const charlie = { id: 3, name: "Charlie" };

        bst.insert(alice);
        bst.insert(bob);
        bst.insert(charlie);

        expect(bst.search({ id: 2, name: "Alice" })).toBe(true);
        expect(bst.search({ id: 1, name: "Bob" })).toBe(true);
        expect(bst.search({ id: 3, name: "Charlie" })).toBe(true);
        expect(bst.search({ id: 4, name: "Dave" })).toBe(false);

        // In-order traversal should return objects sorted by id
        const inOrder = bst.inOrderTraversal();
        expect(inOrder.length).toBe(3);
        expect(inOrder[0].id).toBe(1);
        expect(inOrder[1].id).toBe(2);
        expect(inOrder[2].id).toBe(3);
    });

    test("Complex BST operations", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        // Insert elements
        [10, 5, 15, 3, 7, 12, 17, 1, 4, 6, 8, 11, 13, 16, 20].forEach(num => bst.insert(num));

        // Verify in-order traversal
        expect(bst.inOrderTraversal()).toEqual([1, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 20]);

        // Remove some elements
        bst.remove(5);  // Node with two children
        bst.remove(1);  // Leaf node
        bst.remove(15); // Node with two children

        // Verify structure is still valid
        expect(bst.inOrderTraversal()).toEqual([3, 4, 6, 7, 8, 10, 11, 12, 13, 16, 17, 20]);

        // Search for removed and existing elements
        expect(bst.search(5)).toBe(false);
        expect(bst.search(1)).toBe(false);
        expect(bst.search(15)).toBe(false);
        expect(bst.search(10)).toBe(true);
        expect(bst.search(20)).toBe(true);
    });

    test("BST with duplicate values", () => {
        const bst = new BinarySearchTree<number>((a, b) => a - b);

        bst.insert(10);
        bst.insert(5);
        bst.insert(10); // Duplicate

        // The second 10 should be placed to the right of the first 10
        expect(bst.inOrderTraversal()).toEqual([5, 10, 10]);

        // Remove one instance of 10
        bst.remove(10);
        expect(bst.inOrderTraversal()).toEqual([5, 10]);

        // Remove the other instance
        bst.remove(10);
        expect(bst.inOrderTraversal()).toEqual([5]);
    });
});