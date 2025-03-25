/**
 * Sorting Algorithms Collection
 * 
 * This module exports various sorting algorithms with their time complexities:
 * 
 * 1. Quick Sort     - O(n log n) - General-purpose, fastest average
 * 2. Merge Sort     - O(n log n) - Stable, external sorting
 * 3. Heap Sort      - O(n log n) - Worst-case O(n log n), in-place
 * 4. Tim Sort       - O(n log n) - Real-world data (Python, Java default)
 * 5. Insertion Sort - O(n²)      - Small or nearly sorted data
 * 6. Counting Sort  - O(n)       - Limited range integers
 * 7. Radix Sort     - O(n)       - Limited range integers
 * 8. Bubble Sort    - O(n²)      - Educational purposes only
 */
import tim from './tim';
import heap from './heap';
import merge from './merge';
import quick from './quick';
import radix from './radix';
import bubble from './bubble';
import heapify from './heapify';
import counting from './counting';
import insertion from './insertion';
import partition from './partition';

export {
  tim,
  heap,
  merge,
  quick,
  radix,
  bubble,
  heapify,
  counting,
  insertion,
  partition,
};
