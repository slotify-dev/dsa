# Priority Queue

A priority queue is an abstract data type similar to a regular queue, but where each element has a "priority" associated with it. In a priority queue, an element with high priority is served before an element with low priority.

## Usage

```typescript
import { PriorityQueue } from '@slotify/data-structure';

// Create a min priority queue (lower values have higher priority)
const minPQ = new PriorityQueue<string>();

// Create a max priority queue (higher values have higher priority)
const maxPQ = new PriorityQueue<string>(false);

// Create a priority queue with custom objects
interface Task {
  id: number;
  name: string;
}

const taskPQ = new PriorityQueue<Task>();
```

## API

### Constructor

```typescript
constructor(isMinPriority: boolean = true)
```

Creates a new priority queue.

- `isMinPriority`: If `true` (default), lower priority values have higher priority. If `false`, higher priority values have higher priority.

### Methods

#### `enqueue(value: T, priority: number): void`

Adds an element to the priority queue with the given priority.

- `value`: The element to add.
- `priority`: The priority of the element.

#### `dequeue(): T | undefined`

Removes and returns the element with the highest priority, or `undefined` if the queue is empty.

#### `peek(): T | undefined`

Returns the element with the highest priority without removing it, or `undefined` if the queue is empty.

#### `isEmpty(): boolean`

Returns `true` if the queue is empty, `false` otherwise.

#### `size(): number`

Returns the number of elements in the queue.

## Example

```typescript
import { PriorityQueue } from '@slotify/data-structure';

// Create a min priority queue
const pq = new PriorityQueue<string>();

// Add elements with priorities
pq.enqueue('Task A', 3);
pq.enqueue('Task B', 1);
pq.enqueue('Task C', 2);

console.log(pq.peek()); // "Task B" (lowest priority value)

// Remove elements in priority order
console.log(pq.dequeue()); // "Task B" (priority 1)
console.log(pq.dequeue()); // "Task C" (priority 2)
console.log(pq.dequeue()); // "Task A" (priority 3)
console.log(pq.dequeue()); // undefined

// Check if queue is empty
console.log(pq.isEmpty()); // true

// Example with max priority queue
const maxPQ = new PriorityQueue<string>(false);

maxPQ.enqueue('Task A', 3);
maxPQ.enqueue('Task B', 1);
maxPQ.enqueue('Task C', 2);

// Elements come out in reverse priority order
console.log(maxPQ.dequeue()); // "Task A" (priority 3)
console.log(maxPQ.dequeue()); // "Task C" (priority 2)
console.log(maxPQ.dequeue()); // "Task B" (priority 1)
```

## Time Complexity

- `enqueue(value, priority)`: O(log n)
- `dequeue()`: O(log n)
- `peek()`: O(1)
- `isEmpty()`: O(1)
- `size()`: O(1)

## Space Complexity

- O(n) where n is the number of elements in the queue.

## Notes

- This implementation uses a binary heap internally.
- Elements with the same priority are dequeued in the order they were enqueued (FIFO).
