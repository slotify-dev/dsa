# Binary Search

Binary search is a fundamental search algorithm that operates on sorted arrays by repeatedly dividing the search interval in half.

## What is Binary Search?

Binary search is an efficient algorithm for finding a target value within a sorted array. It works by comparing the target value to the middle element of the array and eliminating half of the remaining elements in each step.

## Why Use Binary Search?

- **Efficiency**: Binary search has a time complexity of O(log n), making it much faster than linear search (O(n)) for large datasets.
- **Reliability**: It provides a deterministic approach to finding elements in sorted collections.
- **Versatility**: Beyond simple searches, binary search can be adapted to solve various problems like finding insertion points, ranges, and more.

## Use Cases

- Finding peak elements
- Searching in rotated sorted arrays
- Finding an element in a sorted array
- Finding the first or last occurrence of a value
- Determining insertion positions in sorted arrays
- Minimizing maximum values in optimization problems

## Import Examples

There are several ways to import the binary search functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use binary search functions
const index = slotify.binarySearch.standardBinarySearch([1, 2, 3, 4, 5], 3);
```

### Import only the binary search module

```typescript
import * as binarySearch from '@slotify/dsa/binary-search';

// Use binary search functions directly
const index = binarySearch.standardBinarySearch([1, 2, 3, 4, 5], 3);
```

### Import specific functions

```typescript
import { standardBinarySearch, lowerBound } from '@slotify/dsa/binary-search';

// Use imported functions directly
const index = standardBinarySearch([1, 2, 3, 4, 5], 3);
const lowerIndex = lowerBound([1, 2, 3, 5, 7], 4);
```

## API Reference

### Standard Binary Search

```typescript
function standardBinarySearch(nums: number[], target: number): number;
```

Finds the index of a target value in a sorted array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import * as binarySearch from '@slotify/dsa/binary-search';

// Find the index of 7 in a sorted array
const index = binarySearch.standardBinarySearch([1, 2, 3, 5, 7, 9], 7); // returns 4

// Search for a value that doesn't exist
const notFound = binarySearch.standardBinarySearch([1, 2, 3, 5, 7, 9], 6); // returns -1
```

### Lower Bound

```typescript
function lowerBound(nums: number[], target: number): number;
```

Finds the index of the first element greater than or equal to the target value.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import { lowerBound } from '@slotify/dsa/binary-search';

// Find the first element >= 6 in a sorted array
const lowerIndex = lowerBound([1, 2, 3, 5, 7, 9], 6); // returns 4 (index of 7)
```

### Upper Bound

```typescript
function upperBound(nums: number[], target: number): number;
```

Finds the index of the first element greater than the target value.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import * as slotify from '@slotify/dsa';

// Find the first element > 5 in a sorted array
const upperIndex = slotify.binarySearch.upperBound([1, 2, 3, 5, 7, 9], 5); // returns 4 (index of 7)
```

### Search Range

```typescript
function searchRange(nums: number[], target: number): [number, number];
```

Finds the starting and ending positions of a target value in a sorted array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import { searchRange } from '@slotify/dsa/binary-search';

// Find the range of occurrences of 3 in an array
const [start, end] = searchRange([1, 2, 3, 3, 3, 5, 7], 3); // returns [2, 4]
```

### Search in Rotated Sorted Array

```typescript
function searchRotatedArray(nums: number[], target: number): number;
```

Searches for a target value in a rotated sorted array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import * as binarySearch from '@slotify/dsa/binary-search';

// Find 3 in a rotated sorted array
const rotatedIndex = binarySearch.searchRotatedArray([7, 8, 9, 1, 2, 3, 4, 5, 6], 3); // returns 5
```

### Find Minimum in Rotated Sorted Array

```typescript
function minimumInRotatedArray(nums: number[]): number;
```

Finds the minimum element in a rotated sorted array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import * as slotify from '@slotify/dsa';

// Find the minimum element in a rotated sorted array
const minIndex = slotify.binarySearch.minimumInRotatedArray([7, 8, 9, 1, 2, 3, 4, 5, 6]); // returns 3 (index of 1)
```

### Find Peak Element

```typescript
function peakElement(nums: number[]): number;
```

Finds a peak element (an element greater than its neighbors) in an array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import { peakElement } from '@slotify/dsa/binary-search';

// Find a peak element in an array
const peak = peakElement([1, 3, 5, 7, 6, 4, 2]); // returns 3 (index of 7)
```

### Search Insert Position

```typescript
function searchInsertPosition(nums: number[], target: number): number;
```

Finds the index where a target should be inserted to maintain sorted order.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**

```typescript
import * as binarySearch from '@slotify/dsa/binary-search';

// Find where 4 should be inserted in a sorted array
const insertPos = binarySearch.searchInsertPosition([1, 2, 3, 5, 7, 9], 4); // returns 3
```
