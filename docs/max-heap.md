# Max Heap

A max heap is a complete binary tree where the value of each node is greater than or equal to the values of its children. The maximum element is always at the root.

## Usage

```typescript
import { MaxHeap } from '@slotify/data-structure';

// Create a max heap for numbers
const maxHeap = MaxHeap<number>();

// Create a max heap for strings
const stringMaxHeap = MaxHeap<string>();
```

## API

### Factory Function

```typescript
MaxHeap<T extends number | string>(): Heap<T>
```

Creates a new max heap for numbers or strings.

- Returns a Heap instance configured as a max heap.

### Methods

#### `peek(): T | undefined`

Returns the maximum element in the heap without removing it, or `undefined` if the heap is empty.

#### `size(): number`

Returns the number of elements in the heap.

#### `isEmpty(): boolean`

Returns `true` if the heap is empty, `false` otherwise.

#### `insert(value: T): void`

Inserts a new element into the heap.

- `value`: The element to insert.

#### `extract(): T | undefined`

Removes and returns the maximum element from the heap, or `undefined` if the heap is empty.

#### `[Symbol.iterator](): Generator<T>`

Makes the heap iterable, allowing you to use it in a `for...of` loop.

## Example

```typescript
import { MaxHeap } from '@slotify/data-structure';

// Create a max heap
const maxHeap = MaxHeap<number>();

// Insert elements
maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(8);
maxHeap.insert(1);
maxHeap.insert(10);

console.log(maxHeap.peek()); // 10

// Extract elements in descending order
console.log(maxHeap.extract()); // 10
console.log(maxHeap.extract()); // 8
console.log(maxHeap.extract()); // 5
console.log(maxHeap.extract()); // 3
console.log(maxHeap.extract()); // 1
console.log(maxHeap.extract()); // undefined

// Check if heap is empty
console.log(maxHeap.isEmpty()); // true

// Example with strings
const stringHeap = MaxHeap<string>();

stringHeap.insert("apple");
stringHeap.insert("zebra");
stringHeap.insert("banana");

// Extract strings in reverse lexicographical order
console.log(stringHeap.extract()); // "zebra"
console.log(stringHeap.extract()); // "banana"
console.log(stringHeap.extract()); // "apple"
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

The MaxHeap is implemented as a factory function that returns a new instance of the generic Heap class with a comparator function that ensures the maximum element is always at the root. For numbers, it uses a reverse numeric comparison (b - a), and for strings, it uses a reverse lexicographical comparison.

Unlike MinHeap which is a class, MaxHeap is a factory function that creates a pre-configured Heap instance. This design choice allows for a simpler API while maintaining the same functionality.