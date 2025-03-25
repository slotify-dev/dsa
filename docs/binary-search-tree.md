# Binary Search Tree

A binary search tree (BST) is a binary tree data structure where each node has at most two children, and for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater than the node.

## Usage

```typescript
import { BinarySearchTree } from '@slotify/data-structure';

// Create a BST for numbers
const bst = new BinarySearchTree<number>();

// Create a BST with custom comparator
const stringBST = new BinarySearchTree<string>((a, b) => a.localeCompare(b));

// Create a BST with custom objects
interface Person {
  id: number;
  name: string;
}

const personBST = new BinarySearchTree<Person>((a, b) => a.id - b.id);
```

## API

### Constructor

```typescript
constructor(comparator?: (a: T, b: T) => number)
```

Creates a new binary search tree with an optional comparator function.

- `comparator`: A function that takes two elements and returns a negative number if the first element is less than the second, a positive number if the first element is greater than the second, or zero if they are equal. If not provided, a default comparator is used that works for primitive types.

### Methods

#### `insert(value: T): void`

Inserts a new value into the tree.

- `value`: The value to insert.

#### `search(value: T): boolean`

Searches for a value in the tree.

- `value`: The value to search for.
- Returns: `true` if the value is found, `false` otherwise.

#### `remove(value: T): boolean`

Removes a value from the tree.

- `value`: The value to remove.
- Returns: `true` if the value was found and removed, `false` otherwise.

#### `inOrderTraversal(): T[]`

Returns an array of all values in the tree in in-order traversal (left-root-right).

#### `preOrderTraversal(): T[]`

Returns an array of all values in the tree in pre-order traversal (root-left-right).

#### `postOrderTraversal(): T[]`

Returns an array of all values in the tree in post-order traversal (left-right-root).

#### `levelOrderTraversal(): T[]`

Returns an array of all values in the tree in level-order traversal (breadth-first).

#### `min(): T | undefined`

Returns the minimum value in the tree, or `undefined` if the tree is empty.

#### `max(): T | undefined`

Returns the maximum value in the tree, or `undefined` if the tree is empty.

#### `isEmpty(): boolean`

Returns `true` if the tree is empty, `false` otherwise.

#### `size(): number`

Returns the number of nodes in the tree.

#### `height(): number`

Returns the height of the tree (the length of the longest path from the root to a leaf).

## Example

```typescript
import { BinarySearchTree } from '@slotify/data-structure';

// Create a BST
const bst = new BinarySearchTree<number>();

// Insert values
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
bst.insert(4);
bst.insert(6);
bst.insert(8);

// Search for values
console.log(bst.search(4)); // true
console.log(bst.search(9)); // false

// Traverse the tree
console.log(bst.inOrderTraversal()); // [2, 3, 4, 5, 6, 7, 8]
console.log(bst.preOrderTraversal()); // [5, 3, 2, 4, 7, 6, 8]
console.log(bst.postOrderTraversal()); // [2, 4, 3, 6, 8, 7, 5]
console.log(bst.levelOrderTraversal()); // [5, 3, 7, 2, 4, 6, 8]

// Get min and max values
console.log(bst.min()); // 2
console.log(bst.max()); // 8

// Remove a value
bst.remove(3);
console.log(bst.inOrderTraversal()); // [2, 4, 5, 6, 7, 8]

// Get tree properties
console.log(bst.size()); // 6
console.log(bst.height()); // 2
```

## Time Complexity

- `insert(value)`: O(log n) average case, O(n) worst case
- `search(value)`: O(log n) average case, O(n) worst case
- `remove(value)`: O(log n) average case, O(n) worst case
- `inOrderTraversal()`: O(n)
- `preOrderTraversal()`: O(n)
- `postOrderTraversal()`: O(n)
- `levelOrderTraversal()`: O(n)
- `min()`: O(log n) average case, O(n) worst case
- `max()`: O(log n) average case, O(n) worst case
- `isEmpty()`: O(1)
- `size()`: O(1) if tracked during operations, O(n) otherwise
- `height()`: O(n)

## Space Complexity

- O(n) for storing the tree
- O(h) for recursive operations, where h is the height of the tree (O(log n) average case, O(n) worst case)
