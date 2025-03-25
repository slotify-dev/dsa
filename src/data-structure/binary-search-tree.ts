import { Comparator } from '../types/comparator';

/**
 * Represents a node in a binary search tree.
 */
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Binary Search Tree implementation.
 * A binary tree where for each node, all elements in the left subtree are less than the node,
 * and all elements in the right subtree are greater than the node.
 */
export default class BinarySearchTree<T> {
  protected root: TreeNode<T> | null = null;
  protected comparator: Comparator<T>;

  /**
   * Creates a new binary search tree with the specified comparator function.
   * @param comparator Function to compare values in the tree
   */
  constructor(comparator: Comparator<T>) {
    this.comparator = comparator;
  }

  /**
   * Inserts a value into the binary search tree.
   * @param value The value to insert
   */
  insert(value: T): void {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    this.insertNode(this.root, newNode);
  }

  /**
   * Recursively inserts a node into the binary search tree.
   * @param node The current node in the recursion
   * @param newNode The node to insert
   */
  protected insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
    const comparison = this.comparator(newNode.value, node.value);

    if (comparison < 0) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  /**
   * Searches for a value in the binary search tree.
   * @param value The value to search for
   * @returns True if the value is found, false otherwise
   */
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  /**
   * Recursively searches for a value in the binary search tree.
   * @param node The current node in the recursion
   * @param value The value to search for
   * @returns True if the value is found, false otherwise
   */
  private searchNode(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) {
      return false;
    }

    const comparison = this.comparator(value, node.value);

    if (comparison === 0) {
      return true;
    }

    if (comparison < 0) {
      return this.searchNode(node.left, value);
    }

    return this.searchNode(node.right, value);
  }

  /**
   * Removes a value from the binary search tree.
   * @param value The value to remove
   */
  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  /**
   * Recursively removes a value from the binary search tree.
   * @param node The current node in the recursion
   * @param value The value to remove
   * @returns The new root of the subtree after removal
   */
  protected removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    const comparison = this.comparator(value, node.value);

    if (comparison < 0) {
      node.left = this.removeNode(node.left, value);
      return node;
    }

    if (comparison > 0) {
      node.right = this.removeNode(node.right, value);
      return node;
    }

    // Node with the value found
    // Case 1: Leaf node
    if (node.left === null && node.right === null) {
      return null;
    }

    // Case 2: Node with one child
    if (node.left === null) {
      return node.right;
    }

    if (node.right === null) {
      return node.left;
    }

    // Case 3: Node with two children
    // Find the minimum value in the right subtree
    const successor = this.findMinNode(node.right);
    node.value = successor.value;

    // Remove the successor
    node.right = this.removeNode(node.right, successor.value);

    return node;
  }

  /**
   * Finds the node with the minimum value in the subtree rooted at the given node.
   * @param node The root of the subtree
   * @returns The node with the minimum value
   */
  protected findMinNode(node: TreeNode<T>): TreeNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  /**
   * Performs an in-order traversal of the tree.
   * @returns An array of values in sorted order
   */
  inOrderTraversal(): T[] {
    const result: T[] = [];
    this.inOrderTraversalNode(this.root, result);
    return result;
  }

  /**
   * Recursively performs an in-order traversal starting from the given node.
   * @param node The current node in the recursion
   * @param result The array to store the traversal result
   */
  private inOrderTraversalNode(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrderTraversalNode(node.left, result);
      result.push(node.value);
      this.inOrderTraversalNode(node.right, result);
    }
  }

  /**
   * Performs a pre-order traversal of the tree.
   * @returns An array of values in pre-order
   */
  preOrderTraversal(): T[] {
    const result: T[] = [];
    this.preOrderTraversalNode(this.root, result);
    return result;
  }

  /**
   * Recursively performs a pre-order traversal starting from the given node.
   * @param node The current node in the recursion
   * @param result The array to store the traversal result
   */
  private preOrderTraversalNode(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value);
      this.preOrderTraversalNode(node.left, result);
      this.preOrderTraversalNode(node.right, result);
    }
  }

  /**
   * Performs a post-order traversal of the tree.
   * @returns An array of values in post-order
   */
  postOrderTraversal(): T[] {
    const result: T[] = [];
    this.postOrderTraversalNode(this.root, result);
    return result;
  }

  /**
   * Recursively performs a post-order traversal starting from the given node.
   * @param node The current node in the recursion
   * @param result The array to store the traversal result
   */
  private postOrderTraversalNode(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postOrderTraversalNode(node.left, result);
      this.postOrderTraversalNode(node.right, result);
      result.push(node.value);
    }
  }

  /**
   * Checks if the tree is empty.
   * @returns True if the tree is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.root === null;
  }
}