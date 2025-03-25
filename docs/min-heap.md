# Min Heap

A min heap is a complete binary tree where the value of each node is less than or equal to the values of its children. The minimum element is always at the root.

## Import Examples

There are several ways to import the Min Heap functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use Min Heap
const minHeap = new slotify.MinHeap<number>();
```

### Import from data-structure module

```typescript
import * as dataStructure from '@slotify/dsa/data-structure';

// Use Min Heap directly
const minHeap = new dataStructure.MinHeap<number>();
```

### Import specific class

```typescript
import { MinHeap } from '@slotify/dsa/min-heap';

// Use imported class directly
const minHeap = new MinHeap<number>();
```

## Usage

```typescript
import { MinHeap } from '@slotify/dsa/min-heap';

// Create a min heap for numbers
const minHeap = new MinHeap<number>();

// Create a min heap with custom comparator
const stringMinHeap = new MinHeap<string>((a, b) => a.localeCompare(b));

// Create a min heap with custom objects
interface Task {
  id: number;
  priority: number;
}

const taskMinHeap = new MinHeap<Task>((a, b) => a.priority - b.priority);
```

## API

### Constructor

```typescript
constructor(comparator?: (a: T, b: T) => number)
```

Creates a new min heap with an optional comparator function.

- `comparator`: A function that takes two elements and returns a negative number if the first element is less than the second, a positive number if the first element is greater than the second, or zero if they are equal. If not provided, a default comparator is used that works for primitive types.

### Methods

#### `peek(): T | undefined`

Returns the minimum element in the heap without removing it, or `undefined` if the heap is empty.

#### `size(): number`

Returns the number of elements in the heap.

#### `isEmpty(): boolean`

Returns `true` if the heap is empty, `false` otherwise.

#### `insert(value: T): void`

Inserts a new element into the heap.

- `value`: The element to insert.

#### `extract(): T | undefined`

Removes and returns the minimum element from the heap, or `undefined` if the heap is empty.

#### `[Symbol.iterator](): Generator<T>`

Makes the heap iterable, allowing you to use it in a `for...of` loop.

## Example

```typescript
import { MinHeap } from '@slotify/data-structure';

// Create a min heap
const minHeap = new MinHeap<number>();

// Insert elements
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);
minHeap.insert(10);

console.log(minHeap.peek()); // 1

// Extract elements in ascending order
console.log(minHeap.extract()); // 1
console.log(minHeap.extract()); // 3
console.log(minHeap.extract()); // 5
console.log(minHeap.extract()); // 8
console.log(minHeap.extract()); // 10
console.log(minHeap.extract()); // undefined

// Check if heap is empty
console.log(minHeap.isEmpty()); // true

// Example with custom objects
interface Task {
  id: number;
  name: string;
  priority: number;
}

const taskHeap = new MinHeap<Task>((a, b) => a.priority - b.priority);

taskHeap.insert({ id: 1, name: 'Task 1', priority: 3 });
taskHeap.insert({ id: 2, name: 'Task 2', priority: 1 });
taskHeap.insert({ id: 3, name: 'Task 3', priority: 2 });

// Extract tasks in priority order (lowest first)
console.log(taskHeap.extract()?.name); // "Task 2" (priority 1)
console.log(taskHeap.extract()?.name); // "Task 3" (priority 2)
console.log(taskHeap.extract()?.name); // "Task 1" (priority 3)
```

## Time Complexity

- `peek()`: O(1)
- `size()`: O(1)
- `isEmpty()`: O(1)
- `insert(value)`: O(log n)
- `extract()`: O(log n)

## Space Complexity

- O(n) where n is the number of elements in the heap.

## Implementation Details

The MinHeap class extends the generic Heap class, providing a specialized implementation for a min heap. It uses the same underlying binary heap data structure but with a comparator that ensures the minimum element is always at the root.
