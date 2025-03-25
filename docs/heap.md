# Heap

A binary heap is a complete binary tree where the value of each node is greater than or equal to (max heap) or less than or equal to (min heap) the values of its children.

## Import Examples

There are several ways to import the Heap functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use Heap
const minHeap = new slotify.Heap<number>((a, b) => a - b);
```

### Import from data-structure module

```typescript
import * as dataStructure from '@slotify/dsa/data-structure';

// Use Heap directly
const minHeap = new dataStructure.Heap<number>((a, b) => a - b);
```

### Import specific class

```typescript
import { Heap } from '@slotify/dsa/heap';

// Use imported class directly
const minHeap = new Heap<number>((a, b) => a - b);
```

## Usage

```typescript
import { Heap } from '@slotify/dsa/heap';

// Create a min heap
const minHeap = new Heap<number>((a, b) => a - b);

// Create a max heap
const maxHeap = new Heap<number>((a, b) => b - a);

// Create a heap with custom objects
interface Task {
  id: number;
  priority: number;
}

const taskHeap = new Heap<Task>((a, b) => a.priority - b.priority);
```

## API

### Constructor

```typescript
constructor(comparator: (a: T, b: T) => number)
```

Creates a new heap with the given comparator function.

- `comparator`: A function that takes two elements and returns a negative number if the first element should be higher in the heap, a positive number if the second element should be higher, or zero if they are equal.

### Methods

#### `peek(): T | undefined`

Returns the root element of the heap without removing it, or `undefined` if the heap is empty.

#### `size(): number`

Returns the number of elements in the heap.

#### `isEmpty(): boolean`

Returns `true` if the heap is empty, `false` otherwise.

#### `insert(value: T): void`

Inserts a new element into the heap.

- `value`: The element to insert.

#### `extract(): T | undefined`

Removes and returns the root element of the heap, or `undefined` if the heap is empty.

#### `[Symbol.iterator](): Generator<T>`

Makes the heap iterable, allowing you to use it in a `for...of` loop.

## Example

```typescript
import { Heap } from '@slotify/data-structure';

// Create a min heap
const minHeap = new Heap<number>((a, b) => a - b);

// Insert elements
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);

console.log(minHeap.peek()); // 1

// Extract elements in order
console.log(minHeap.extract()); // 1
console.log(minHeap.extract()); // 3
console.log(minHeap.extract()); // 5
console.log(minHeap.extract()); // 8
console.log(minHeap.extract()); // undefined

// Check if heap is empty
console.log(minHeap.isEmpty()); // true
```

## Time Complexity

- `peek()`: O(1)
- `size()`: O(1)
- `isEmpty()`: O(1)
- `insert(value)`: O(log n)
- `extract()`: O(log n)

## Space Complexity

- O(n) where n is the number of elements in the heap.
