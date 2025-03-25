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
  index: number,
  heapSize: number,
  comparator: Comparator<T>
): void {
  let largest = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  // For ascending sort, we need a max heap
  // If left child is larger than root
  if (left < heapSize && comparator(arr[left], arr[largest]) > 0) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < heapSize && comparator(arr[right], arr[largest]) > 0) {
    largest = right;
  }

  // If largest is not root
  if (largest !== index) {
    // Swap
    [arr[index], arr[largest]] = [arr[largest], arr[index]];

    // Recursively sift down the affected sub-tree
    heapify(arr, largest, heapSize, comparator);
  }
}