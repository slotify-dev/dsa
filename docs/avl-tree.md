# AVL Tree

An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes.

## Import Examples

There are several ways to import the AVL Tree functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use AVL Tree
const avl = new slotify.AVLTree<number>();
```

### Import from data-structure module

```typescript
import * as dataStructure from '@slotify/dsa/data-structure';

// Use AVL Tree directly
const avl = new dataStructure.AVLTree<number>();
```

### Import specific class

```typescript
import { AVLTree } from '@slotify/dsa/avl-tree';

// Use imported class directly
const avl = new AVLTree<number>();
```

## Usage

```typescript
import { AVLTree } from '@slotify/dsa/avl-tree';

// Create an AVL tree for numbers
const avl = new AVLTree<number>();

// Create an AVL tree with custom comparator
const stringAVL = new AVLTree<string>((a, b) => a.localeCompare(b));

// Create an AVL tree with custom objects
interface Person {
  id: number;
  name: string;
}

const personAVL = new AVLTree<Person>((a, b) => a.id - b.id);
```

## API

### Constructor

```typescript
constructor(comparator?: (a: T, b: T) => number)
```

Creates a new AVL tree with an optional comparator function.

- `comparator`: A function that takes two elements and returns a negative number if the first element is less than the second, a positive number if the first element is greater than the second, or zero if they are equal. If not provided, a default comparator is used that works for primitive types.

### Methods

#### `insert(value: T): void`

Inserts a new value into the tree, maintaining the AVL balance property.

- `value`: The value to insert.

#### `search(value: T): boolean`

Searches for a value in the tree.

- `value`: The value to search for.
- Returns: `true` if the value is found, `false` otherwise.

#### `remove(value: T): boolean`

Removes a value from the tree, maintaining the AVL balance property.

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

#### `isBalanced(): boolean`

Returns `true` if the tree is balanced according to the AVL property, `false` otherwise.

## Example

```typescript
import { AVLTree } from '@slotify/data-structure';

// Create an AVL tree
const avl = new AVLTree<number>();

// Insert values
avl.insert(5);
avl.insert(3);
avl.insert(7);
avl.insert(2);
avl.insert(4);
avl.insert(6);
avl.insert(8);

// Search for values
console.log(avl.search(4)); // true
console.log(avl.search(9)); // false

// Traverse the tree
console.log(avl.inOrderTraversal()); // [2, 3, 4, 5, 6, 7, 8]
console.log(avl.preOrderTraversal()); // Tree-specific order, but balanced
console.log(avl.levelOrderTraversal()); // Tree-specific order, but balanced

// Get min and max values
console.log(avl.min()); // 2
console.log(avl.max()); // 8

// Remove a value
avl.remove(3);
console.log(avl.inOrderTraversal()); // [2, 4, 5, 6, 7, 8]

// Check if the tree is balanced
console.log(avl.isBalanced()); // true

// Get tree properties
console.log(avl.size()); // 6
console.log(avl.height()); // Balanced height
```

## Time Complexity

- `insert(value)`: O(log n)
- `search(value)`: O(log n)
- `remove(value)`: O(log n)
- `inOrderTraversal()`: O(n)
- `preOrderTraversal()`: O(n)
- `postOrderTraversal()`: O(n)
- `levelOrderTraversal()`: O(n)
- `min()`: O(log n)
- `max()`: O(log n)
- `isEmpty()`: O(1)
- `size()`: O(1) if tracked during operations, O(n) otherwise
- `height()`: O(1) if tracked during operations, O(n) otherwise
- `isBalanced()`: O(1) if tracked during operations, O(n) otherwise

## Space Complexity

- O(n) for storing the tree
- O(log n) for recursive operations, where log n is the height of the balanced tree

## Advantages Over Regular BST

- Guaranteed O(log n) time complexity for insertions, deletions, and searches
- Self-balancing property ensures the tree doesn't degenerate into a linked list
- More efficient for applications with frequent lookups
