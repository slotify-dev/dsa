import { heapify } from '../../src/sorting';
import { describe, expect, it } from 'bun:test';
import defaultComparator from '../../src/utils/comparator';

// Helper function to check if a subtree rooted at index i is a max heap
function isMaxHeap<T>(arr: T[], i: number, n: number, comparator = defaultComparator): boolean {
  // If a node is a leaf, it's a valid heap
  if (i >= n) {
    return true;
  }

  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // If left child exists and is greater than parent, not a max heap
  if (left < n && comparator(arr[i], arr[left]) < 0) {
    return false;
  }

  // If right child exists and is greater than parent, not a max heap
  if (right < n && comparator(arr[i], arr[right]) < 0) {
    return false;
  }

  // Check if both subtrees are max heaps
  return isMaxHeap(arr, left, n, comparator) && isMaxHeap(arr, right, n, comparator);
}

describe('Heapify Function', () => {
  it('should correctly heapify an array at a given index', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    const n = arr.length;

    // Heapify the entire array (starting from the last non-leaf node)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, defaultComparator);
    }

    // Check if the result is a valid max heap
    expect(isMaxHeap(arr, 0, n)).toBe(true);
  });

  it('should handle an empty array', () => {
    const arr: number[] = [];
    heapify(arr, 0, 0, defaultComparator);
    expect(arr).toEqual([]);
  });

  it('should handle an array with a single element', () => {
    const arr = [1];
    heapify(arr, 1, 0, defaultComparator);
    expect(arr).toEqual([1]);
  });

  it('should handle an array with two elements', () => {
    const arr = [1, 2];
    heapify(arr, 2, 0, defaultComparator);
    expect(arr).toEqual([2, 1]);
    expect(isMaxHeap(arr, 0, 2)).toBe(true);
  });

  it('should handle an array with duplicate elements', () => {
    const arr = [3, 3, 3, 3, 3];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, defaultComparator);
    }

    expect(isMaxHeap(arr, 0, n)).toBe(true);
  });

  it('should work with custom comparator', () => {
    const arr = [
      { value: 3 },
      { value: 1 },
      { value: 4 },
      { value: 2 }
    ];

    const comparator = (a: { value: number }, b: { value: number }) => a.value - b.value;
    const n = arr.length;

    // Heapify the entire array
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, comparator);
    }

    // Check if the result is a valid max heap according to the custom comparator
    const isValidHeap = (i: number): boolean => {
      if (i >= n) return true;

      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && comparator(arr[i], arr[left]) < 0) return false;
      if (right < n && comparator(arr[i], arr[right]) < 0) return false;

      return isValidHeap(left) && isValidHeap(right);
    };

    expect(isValidHeap(0)).toBe(true);
  });

  it('should correctly heapify a specific subtree', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];

    // Heapify only the subtree rooted at index 1
    heapify(arr, arr.length, 1, defaultComparator);

    // Check that the children of node at index 1 are smaller than it
    expect(arr[1] >= arr[3]).toBe(true);
    expect(arr[1] >= arr[4]).toBe(true);
  });

  it('should handle negative numbers', () => {
    const arr = [3, -1, 4, -5, 2, -8, 0];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, defaultComparator);
    }

    expect(isMaxHeap(arr, 0, n)).toBe(true);
  });
});