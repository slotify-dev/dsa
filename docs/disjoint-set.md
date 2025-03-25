# Disjoint Set (Union-Find)

A disjoint-set data structure (also called a union–find data structure) keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets. It provides near-constant-time operations to add new sets, merge existing sets, and determine whether elements are in the same set.

## Import Examples

There are several ways to import the Disjoint Set functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use Disjoint Set
const ds = new slotify.DisjointSet<string>();
```

### Import from data-structure module

```typescript
import * as dataStructure from '@slotify/dsa/data-structure';

// Use Disjoint Set directly
const ds = new dataStructure.DisjointSet<string>();
```

### Import specific class

```typescript
import { DisjointSet } from '@slotify/dsa/disjoint-set';

// Use imported class directly
const ds = new DisjointSet<string>();
```

## Usage

```typescript
import { DisjointSet } from '@slotify/dsa/disjoint-set';

// Create a disjoint set
const ds = new DisjointSet<string>();

// Add elements
ds.makeSet('A');
ds.makeSet('B');
ds.makeSet('C');
ds.makeSet('D');

// Union elements
ds.union('A', 'B');
ds.union('C', 'D');
```

## API

### Constructor

```typescript
constructor();
```

Creates a new empty disjoint set.

### Methods

#### `makeSet(element: T): void`

Creates a new set containing only the given element.

- `element`: The element to add to a new set.

#### `find(element: T): T | undefined`

Finds the representative (root) element of the set containing the given element.

- `element`: The element to find the representative for.
- Returns: The representative element of the set, or `undefined` if the element doesn't exist.

#### `union(element1: T, element2: T): boolean`

Merges the sets containing the two given elements.

- `element1`: The first element.
- `element2`: The second element.
- Returns: `true` if the sets were merged, `false` if the elements were already in the same set or if either element doesn't exist.

#### `connected(element1: T, element2: T): boolean`

Checks if two elements are in the same set.

- `element1`: The first element.
- `element2`: The second element.
- Returns: `true` if the elements are in the same set, `false` otherwise.

#### `getConnectedComponents(): T[][]`

Gets all connected components (sets) in the disjoint set.

- Returns: An array of sets, where each set is an array of elements.

#### `size(): number`

Returns the number of elements in the disjoint set.

#### `componentCount(): number`

Returns the number of disjoint sets.

## Example

```typescript
import { DisjointSet } from '@slotify/data-structure';

// Create a disjoint set
const ds = new DisjointSet<string>();

// Add elements
ds.makeSet('A');
ds.makeSet('B');
ds.makeSet('C');
ds.makeSet('D');
ds.makeSet('E');
ds.makeSet('F');

// Initially, each element is in its own set
console.log(ds.componentCount()); // 6
console.log(ds.connected('A', 'B')); // false

// Union some elements
ds.union('A', 'B');
ds.union('C', 'D');
ds.union('E', 'F');
ds.union('A', 'C');

// Now we have 2 components: {A, B, C, D} and {E, F}
console.log(ds.componentCount()); // 2
console.log(ds.connected('A', 'D')); // true
console.log(ds.connected('A', 'E')); // false

// Find representatives
console.log(ds.find('A') === ds.find('D')); // true
console.log(ds.find('E') === ds.find('F')); // true

// Get all connected components
const components = ds.getConnectedComponents();
console.log(components); // [["A", "B", "C", "D"], ["E", "F"]]

// Total number of elements
console.log(ds.size()); // 6
```

## Applications

- Kruskal's algorithm for finding minimum spanning trees
- Detecting cycles in undirected graphs
- Finding connected components in a graph
- Image processing (connected component labeling)
- Network connectivity
- Least common ancestor in trees

## Time Complexity

With path compression and union by rank optimizations:

- `makeSet(element)`: O(1)
- `find(element)`: O(α(n)) amortized, where α is the inverse Ackermann function (practically constant time)
- `union(element1, element2)`: O(α(n)) amortized
- `connected(element1, element2)`: O(α(n)) amortized
- `getConnectedComponents()`: O(n)
- `size()`: O(1)
- `componentCount()`: O(1)

## Space Complexity

- O(n) where n is the number of elements

## Implementation Details

This implementation uses two key optimizations:

1. **Path Compression**: When `find` is called, all nodes along the path to the root are made to point directly to the root, flattening the tree structure.

2. **Union by Rank**: When `union` is called, the smaller tree (by rank) is attached to the root of the larger tree, keeping the tree balanced.
