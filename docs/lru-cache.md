# LRU Cache

An LRU (Least Recently Used) Cache is a data structure that maintains a fixed-size cache of key-value pairs, evicting the least recently used items when the cache reaches its capacity.

## Import Examples

There are several ways to import the LRU Cache functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use LRU Cache
const cache = new slotify.LRUCache<string, number>(3);
```

### Import from data-structure module

```typescript
import * as dataStructure from '@slotify/dsa/data-structure';

// Use LRU Cache directly
const cache = new dataStructure.LRUCache<string, number>(3);
```

### Import specific class

```typescript
import { LRUCache } from '@slotify/dsa/lru-cache';

// Use imported class directly
const cache = new LRUCache<string, number>(3);
```

## Usage

```typescript
import { LRUCache } from '@slotify/dsa/lru-cache';

// Create an LRU cache with capacity 3
const cache = new LRUCache<string, number>(3);

// Add items to the cache
cache.put('one', 1);
cache.put('two', 2);
cache.put('three', 3);

// Get items from the cache
const value = cache.get('one'); // 1
```

## API

### Constructor

```typescript
constructor(capacity: number)
```

Creates a new LRU cache with the specified capacity.

- `capacity`: The maximum number of items the cache can hold.

### Methods

#### `get(key: K): V | undefined`

Retrieves a value from the cache by its key. This operation also marks the item as recently used.

- `key`: The key of the item to retrieve.
- Returns: The value associated with the key, or `undefined` if the key doesn't exist in the cache.

#### `put(key: K, value: V): void`

Adds or updates a key-value pair in the cache. If the cache is at capacity and a new item is added, the least recently used item is evicted.

- `key`: The key of the item to add or update.
- `value`: The value to associate with the key.

#### `has(key: K): boolean`

Checks if a key exists in the cache. This operation does not affect the item's recency.

- `key`: The key to check.
- Returns: `true` if the key exists in the cache, `false` otherwise.

#### `remove(key: K): boolean`

Removes a key-value pair from the cache.

- `key`: The key of the item to remove.
- Returns: `true` if the key was found and removed, `false` otherwise.

#### `clear(): void`

Removes all items from the cache.

#### `size(): number`

Returns the current number of items in the cache.

#### `getCapacity(): number`

Returns the maximum capacity of the cache.

#### `getKeys(): K[]`

Returns an array of all keys in the cache, ordered from most recently used to least recently used.

#### `getValues(): V[]`

Returns an array of all values in the cache, ordered from most recently used to least recently used.

#### `getEntries(): [K, V][]`

Returns an array of all key-value pairs in the cache, ordered from most recently used to least recently used.

## Example

```typescript
import { LRUCache } from '@slotify/data-structure';

// Create a cache with capacity 3
const cache = new LRUCache<string, number>(3);

// Add items
cache.put('one', 1);
cache.put('two', 2);
cache.put('three', 3);

console.log(cache.getKeys()); // ["three", "two", "one"]

// Access an item (marks it as recently used)
console.log(cache.get('one')); // 1
console.log(cache.getKeys()); // ["one", "three", "two"]

// Add a new item when cache is full (evicts "two")
cache.put('four', 4);
console.log(cache.getKeys()); // ["four", "one", "three"]
console.log(cache.get('two')); // undefined

// Update an existing item
cache.put('three', 33);
console.log(cache.get('three')); // 33
console.log(cache.getKeys()); // ["three", "four", "one"]

// Check cache size and capacity
console.log(cache.size()); // 3
console.log(cache.getCapacity()); // 3

// Remove an item
cache.remove('four');
console.log(cache.size()); // 2
console.log(cache.getKeys()); // ["three", "one"]

// Clear the cache
cache.clear();
console.log(cache.size()); // 0
```

## Time Complexity

- `get(key)`: O(1)
- `put(key, value)`: O(1)
- `has(key)`: O(1)
- `remove(key)`: O(1)
- `clear()`: O(1)
- `size()`: O(1)
- `getCapacity()`: O(1)
- `getKeys()`: O(n)
- `getValues()`: O(n)
- `getEntries()`: O(n)

## Space Complexity

- O(capacity) for storing the cache items

## Implementation Details

This LRU Cache is implemented using a combination of:

- A Map for O(1) key-value lookups
- A doubly linked list to track the order of item usage

This combination allows for efficient get and put operations while maintaining the order of item usage for eviction purposes.
