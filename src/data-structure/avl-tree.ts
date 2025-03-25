import { Comparator } from '../utils/comparator';

/**
 * Represents a node in an AVL tree.
 */
class AVLNode<T> {
  value: T;
  left: AVLNode<T> | null = null;
  right: AVLNode<T> | null = null;
  height: number = 1;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Self-balancing AVL Tree implementation.
 * Maintains balance by ensuring the height difference between left and right subtrees
 * is at most 1 for every node.
 */
export default class AVLTree<T> {
  private root: AVLNode<T> | null = null;
  private comparator: Comparator<T>;

  /**
   * Creates a new AVL tree with the specified comparator function.
   * @param comparator Function to compare values in the tree
   */
  constructor(comparator: Comparator<T>) {
    this.comparator = comparator;
  }

  /**
   * Inserts a value into the AVL tree.
   * @param value The value to insert
   */
  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  /**
   * Recursively inserts a value into the AVL tree starting from the given node.
   * Performs necessary rotations to maintain AVL balance property.
   * @param node The current node in the recursion
   * @param value The value to insert
   * @returns The new root of the subtree after insertion and rebalancing
   */
  private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (node === null) {
      return new AVLNode(value);
    }

    const comparison = this.comparator(value, node.value);

    if (comparison < 0) {
      node.left = this.insertNode(node.left, value);
    } else if (comparison > 0) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node; // Duplicate values not allowed
    }

    node.height = 1 + Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    );

    const balance = this.getBalanceFactor(node);

    // Left Left Case
    if (balance > 1 && node.left && this.comparator(value, node.left.value) < 0) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && node.right && this.comparator(value, node.right.value) > 0) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && node.left && this.comparator(value, node.left.value) > 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && node.right && this.comparator(value, node.right.value) < 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  /**
   * Removes a value from the AVL tree.
   * @param value The value to remove
   */
  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  /**
   * Recursively removes a value from the AVL tree starting from the given node.
   * Performs necessary rotations to maintain AVL balance property.
   * @param node The current node in the recursion
   * @param value The value to remove
   * @returns The new root of the subtree after removal and rebalancing
   */
  private removeNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (node === null) {
      return null;
    }

    const comparison = this.comparator(value, node.value);

    if (comparison < 0) {
      node.left = this.removeNode(node.left, value);
    } else if (comparison > 0) {
      node.right = this.removeNode(node.right, value);
    } else {
      // Node with the value found

      // Case 1: Leaf node or node with one child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Case 2: Node with two children
      // Find the inorder successor (smallest in the right subtree)
      const successor = this.findMinNode(node.right);
      node.value = successor.value;

      // Delete the successor
      node.right = this.removeNode(node.right, successor.value);
    }

    // If the tree had only one node, return
    if (node === null) {
      return null;
    }

    // Update height
    node.height = 1 + Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    );

    // Get balance factor
    const balance = this.getBalanceFactor(node);

    // Left Left Case
    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  /**
   * Searches for a value in the AVL tree.
   * @param value The value to search for
   * @returns True if the value is found, false otherwise
   */
  search(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  /**
   * Recursively searches for a value in the AVL tree starting from the given node.
   * @param node The current node in the recursion
   * @param value The value to search for
   * @returns True if the value is found, false otherwise
   */
  private searchNode(node: AVLNode<T> | null, value: T): boolean {
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
   * Finds the node with the minimum value in the subtree rooted at the given node.
   * @param node The root of the subtree
   * @returns The node with the minimum value
   */
  private findMinNode(node: AVLNode<T>): AVLNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  /**
   * Gets the height of a node.
   * @param node The node to get the height of
   * @returns The height of the node, or 0 if the node is null
   */
  private getHeight(node: AVLNode<T> | null): number {
    if (node === null) {
      return 0;
    }
    return node.height;
  }

  /**
   * Calculates the balance factor of a node.
   * @param node The node to calculate the balance factor for
   * @returns The balance factor (height of left subtree - height of right subtree)
   */
  private getBalanceFactor(node: AVLNode<T> | null): number {
    if (node === null) {
      return 0;
    }
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  /**
   * Performs a right rotation on the given node.
   * @param y The node to rotate
   * @returns The new root of the subtree after rotation
   */
  private rightRotate(y: AVLNode<T>): AVLNode<T> {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));

    return x;
  }

  /**
   * Performs a left rotation on the given node.
   * @param x The node to rotate
   * @returns The new root of the subtree after rotation
   */
  private leftRotate(x: AVLNode<T>): AVLNode<T> {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

    return y;
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
  private inOrderTraversalNode(node: AVLNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrderTraversalNode(node.left, result);
      result.push(node.value);
      this.inOrderTraversalNode(node.right, result);
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