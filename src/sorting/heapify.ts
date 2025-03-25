import { type Comparator } from '../utils/comparator';

/**
 * Heap data structure implementation
 * 
 * This file implements a binary heap data structure that can be used for heap sort
 * and priority queue operations.
 * 
 * Time Complexity:
 * - Build Heap: O(n)
 * - Insert: O(log n)
 * - Extract Max/Min: O(log n)
 * - Heapify: O(log n)
 * 
 * Space Complexity: O(1) for operations on an existing heap
 */

/**
 * Heapifies a subtree rooted at node i
 * 
 * @param arr - The array representing the heap
 * @param n - Size of the heap
 * @param i - Index of the root of the subtree
 * @param comparator - Function to compare elements
 */
export default function heapify<T>(
  arr: T[],
  n: number,
  i: number,
  comparator: Comparator<T>
): void {
  // Initialize largest as root
  let largest = i;

  // Calculate indices of left and right children
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare left child with root
  if (left < n && comparator(arr[left], arr[largest]) > 0) {
    largest = left;
  }

  // Compare right child with largest so far
  if (right < n && comparator(arr[right], arr[largest]) > 0) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    // Swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, comparator);
  }
}