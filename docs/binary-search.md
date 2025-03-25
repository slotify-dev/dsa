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
// Find the index of 7 in a sorted array
standardBinarySearch([1, 2, 3, 5, 7, 9], 7); // returns 4

// Search for a value that doesn't exist
standardBinarySearch([1, 2, 3, 5, 7, 9], 6); // returns -1
```

### Lower Bound

```typescript
function lowerBound(nums: number[], target: number): number;
```

Finds the index of the first element greater than or equal to the target value.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Upper Bound

```typescript
function upperBound(nums: number[], target: number): number;
```

Finds the index of the first element greater than the target value.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Search Range

```typescript
function searchRange(nums: number[], target: number): [number, number];
```

Finds the starting and ending positions of a target value in a sorted array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Search in Rotated Sorted Array

```typescript
function searchRotatedArray(nums: number[], target: number): number;
```

Searches for a target value in a rotated sorted array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Find Minimum in Rotated Sorted Array

```typescript
function minimumInRotatedArray(nums: number[]): number;
```

Finds the minimum element in a rotated sorted array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Find Peak Element

```typescript
function peakElement(nums: number[]): number;
```

Finds a peak element (an element greater than its neighbors) in an array.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Search Insert Position

```typescript
function searchInsertPosition(nums: number[], target: number): number;
```

Finds the index where a target should be inserted to maintain sorted order.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
