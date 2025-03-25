# Sorting Algorithms

This document provides a comprehensive overview of the sorting algorithms implemented in this library.

## Table of Contents

- [Overview](#overview)
- [Common Features](#common-features)
- [Algorithms](#algorithms)
  - [Bubble Sort](#bubble-sort)
  - [Quick Sort](#quick-sort)
  - [Merge Sort](#merge-sort)
  - [Heap Sort](#heap-sort)
  - [Insertion Sort](#insertion-sort)
  - [Tim Sort](#tim-sort)
  - [Counting Sort](#counting-sort)
  - [Radix Sort](#radix-sort)
- [Performance Comparison](#performance-comparison)
- [Usage Examples](#usage-examples)

## Overview

Sorting is a fundamental operation in computer science that arranges elements in a specific order. This library provides various sorting algorithms with different time and space complexities, suitable for different use cases.

## Common Features

All sorting algorithms in this library:

- Accept an array of any type as input
- Support custom comparator functions
- Return the sorted array (most are in-place sorting)
- Are fully typed with TypeScript

## Algorithms

### Bubble Sort

Bubble sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(n) - when the array is already sorted (with optimization)
  - Average Case: O(n²)
  - Worst Case: O(n²) - when the array is sorted in reverse order
- **Space Complexity:** O(1) - in-place sorting
- **Stable:** Yes
- **Adaptive:** Yes (with optimization)
- **Best Use Case:** Educational purposes or very small arrays

**API:**
```typescript
function bubble<T>(arr: T[], comparator?: (a: T, b: T) => number): T[]
```

**Example:**
```typescript
import { bubble } from 'your-library-name';

// Sort numbers
const numbers = [5, 3, 8, 4, 2];
bubble(numbers); // [2, 3, 4, 5, 8]

// Sort objects
const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 20 }
];
bubble(people, (a, b) => a.age - b.age); // [{name: 'Jane', age: 20}, {name: 'John', age: 25}]
```

### Quick Sort

Quick sort is a divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around the pivot.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n²) - occurs with already sorted arrays or arrays with many duplicates
- **Space Complexity:** O(log n) - due to recursion stack
- **Stable:** No
- **Adaptive:** No
- **Best Use Case:** General-purpose sorting, typically the fastest for random data

**API:**
```typescript
function quick<T>(arr: T[], comparator?: (a: T, b: T) => number): T[]
```

**Example:**
```typescript
import { quick } from 'your-library-name';

// Sort numbers
const numbers = [5, 3, 8, 4, 2];
quick(numbers); // [2, 3, 4, 5, 8]

// Sort strings
const fruits = ['banana', 'apple', 'pear', 'orange'];
quick(fruits); // ['apple', 'banana', 'orange', 'pear']
```

### Merge Sort

Merge sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n log n)
- **Space Complexity:** O(n) - requires additional space for merging
- **Stable:** Yes
- **Adaptive:** No (can be made adaptive with modifications)
- **Best Use Case:** When stability is required or for external sorting

**API:**
```typescript
function merge<T>(arr: T[], comparator?: (a: T, b: T) => number): T[]
```

**Example:**
```typescript
import { merge } from 'your-library-name';

// Sort numbers
const numbers = [5, 3, 8, 4, 2];
merge(numbers); // [2, 3, 4, 5, 8]

// Sort with custom comparator
const data = ['10', '2', '1'];
merge(data, (a, b) => parseInt(a) - parseInt(b)); // ['1', '2', '10']
```

### Heap Sort

Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n log n)
- **Space Complexity:** O(1) - in-place sorting
- **Stable:** No
- **Adaptive:** No
- **Best Use Case:** When guaranteed O(n log n) performance is needed and stability is not required

**API:**
```typescript
function heap<T>(arr: T[], comparator?: (a: T, b: T) => number): T[]
```

**Example:**
```typescript
import { heap } from 'your-library-name';

// Sort numbers
const numbers = [5, 3, 8, 4, 2];
heap(numbers); // [2, 3, 4, 5, 8]
```

### Insertion Sort

Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is efficient for small data sets and mostly sorted arrays.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(n) - when the array is already sorted
  - Average Case: O(n²)
  - Worst Case: O(n²) - when the array is sorted in reverse order
- **Space Complexity:** O(1) - in-place sorting
- **Stable:** Yes
- **Adaptive:** Yes
- **Best Use Case:** Small arrays or nearly sorted data

**API:**
```typescript
function insertion<T>(arr: T[], comparator?: (a: T, b: T) => number): T[]
```

**Example:**
```typescript
import { insertion } from 'your-library-name';

// Sort numbers
const numbers = [5, 3, 8, 4, 2];
insertion(numbers); // [2, 3, 4, 5, 8]
```

### Tim Sort

Tim sort is a hybrid sorting algorithm derived from merge sort and insertion sort. It was designed to perform well on many kinds of real-world data.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(n) - when the array is already sorted
  - Average Case: O(n log n)
  - Worst Case: O(n log n)
- **Space Complexity:** O(n)
- **Stable:** Yes
- **Adaptive:** Yes
- **Best Use Case:** Real-world data with some pre-existing order

**API:**
```typescript
function tim<T>(arr: T[], comparator?: (a: T, b: T) => number): T[]
```

**Example:**
```typescript
import { tim } from 'your-library-name';

// Sort numbers
const numbers = [5, 3, 8, 4, 2];
tim(numbers); // [2, 3, 4, 5, 8]
```

### Counting Sort

Counting sort is a non-comparison-based sorting algorithm that works well for a limited range of integers.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(n + k) where k is the range of input
  - Average Case: O(n + k)
  - Worst Case: O(n + k)
- **Space Complexity:** O(n + k)
- **Stable:** Yes (in this implementation)
- **Adaptive:** No
- **Best Use Case:** Arrays of integers with a small range

**API:**
```typescript
function counting(arr: number[]): number[]
```

**Example:**
```typescript
import { counting } from 'your-library-name';

// Sort integers
const numbers = [5, 3, 8, 4, 2];
counting(numbers); // [2, 3, 4, 5, 8]
```

### Radix Sort

Radix sort is a non-comparison-based sorting algorithm that sorts integers by processing individual digits.

**Characteristics:**
- **Time Complexity:** 
  - Best Case: O(nk) where k is the number of digits
  - Average Case: O(nk)
  - Worst Case: O(nk)
- **Space Complexity:** O(n + k)
- **Stable:** Yes
- **Adaptive:** No
- **Best Use Case:** Arrays of integers, especially when the integers have the same number of digits

**API:**
```typescript
function radix(arr: number[]): number[]
```

**Example:**
```typescript
import { radix } from 'your-library-name';

// Sort integers
const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
radix(numbers); // [2, 24, 45, 66, 75, 90, 170, 802]
```

## Performance Comparison

| Algorithm      | Best Time    | Average Time | Worst Time   | Space       | Stable | Adaptive |
|----------------|--------------|--------------|--------------|-------------|--------|----------|
| Bubble Sort    | O(n)         | O(n²)        | O(n²)        | O(1)        | Yes    | Yes      |
| Quick Sort     | O(n log n)   | O(n log n)   | O(n²)        | O(log n)    | No     | No       |
| Merge Sort     | O(n log n)   | O(n log n)   | O(n log n)   | O(n)        | Yes    | No       |
| Heap Sort      | O(n log n)   | O(n log n)   | O(n log n)   | O(1)        | No     | No       |
| Insertion Sort | O(n)         | O(n²)        | O(n²)        | O(1)        | Yes    | Yes      |
| Tim Sort       | O(n)         | O(n log n)   | O(n log n)   | O(n)        | Yes    | Yes      |
| Counting Sort  | O(n + k)     | O(n + k)     | O(n + k)     | O(n + k)    | Yes    | No       |
| Radix Sort     | O(nk)        | O(nk)        | O(nk)        | O(n + k)    | Yes    | No       |

## Usage Examples

### Basic Usage

```typescript
import { bubble, quick, merge, heap, insertion, tim, counting, radix } from 'your-library-name';

const numbers = [5, 3, 8, 4, 2];

// Choose any sorting algorithm
const sorted = quick(numbers);
console.log(sorted); // [2, 3, 4, 5, 8]
```

### Custom Comparator

```typescript
import { quick } from 'your-library-name';

const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 20 },
  { name: 'Bob', age: 30 }
];

// Sort by age
const sortedByAge = quick([...people], (a, b) => a.age - b.age);
console.log(sortedByAge); // [{name: 'Jane', age: 20}, {name: 'John', age: 25}, {name: 'Bob', age: 30}]

// Sort by name
const sortedByName = quick([...people], (a, b) => a.name.localeCompare(b.name));
console.log(sortedByName); // [{name: 'Bob', age: 30}, {name: 'Jane', age: 20}, {name: 'John', age: 25}]
```

### Choosing the Right Algorithm

- For small arrays or nearly sorted data: `insertion` or `bubble`
- For general-purpose sorting: `quick` or `tim`
- When stability is required: `merge`, `tim`, or `bubble`
- For integer arrays with limited range: `counting` or `radix`
- When guaranteed worst-case performance is needed: `merge` or `heap`