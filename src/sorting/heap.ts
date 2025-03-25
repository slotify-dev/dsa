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
 * @param comparator - Function to compare elements (max heap by default)
 */
function heapify<T>(
  arr: T[], 
  n: number, 
  i: number, 
  comparator: (a: T, b: T) => number = (a, b) => a > b ? 1 : a < b ? -1 : 0
): void {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child is larger than root
  if (left < n && comparator(arr[left], arr[largest]) > 0) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && comparator(arr[right], arr[largest]) > 0) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    // Swap and continue heapifying
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, comparator);
  }
}

/**
 * Builds a heap from an array
 * 
 * @param arr - The array to convert into a heap
 * @param comparator - Function to compare elements (max heap by default)
 */
function buildHeap<T>(
  arr: T[], 
  comparator: (a: T, b: T) => number = (a, b) => a > b ? 1 : a < b ? -1 : 0
): void {
  const n = arr.length;
  
  // Build heap (rearrange array)
  // Start from the last non-leaf node and heapify all nodes in reverse order
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, comparator);
  }
}

/**
 * Heap implementation with core operations
 * 
 * @example
 * // Create a max heap from an array
 * const arr = [3, 1, 4, 1, 5, 9, 2, 6];
 * buildHeap(arr);
 * // arr is now a max heap
 * 
 * @example
 * // Heapify a subtree
 * heapify(arr, arr.length, 0);
 */
export default {
  heapify,
  buildHeap
};