/**
 * Binary Search examples for @slotify/dsa
 * 
 * This example demonstrates various binary search algorithms provided by the library.
 */

// Import specific binary search module
import * as binarySearch from '../dist/binary-search/index.js';

console.log('=== Binary Search Examples ===');

// Sample sorted array
const sortedArray = [1, 2, 3, 5, 7, 9, 11, 13, 17, 19, 23];

// Standard binary search
const target = 11;
const index = binarySearch.standardBinarySearch(sortedArray, target);
console.log(`Standard binary search: Found ${target} at index ${index}`);

// Lower bound (first element >= target)
const lowerTarget = 10;
const lowerIndex = binarySearch.lowerBound(sortedArray, lowerTarget);
console.log(`Lower bound: First element >= ${lowerTarget} is at index ${lowerIndex} (value: ${sortedArray[lowerIndex]})`);

// Upper bound (first element > target)
const upperTarget = 11;
const upperIndex = binarySearch.upperBound(sortedArray, upperTarget);
console.log(`Upper bound: First element > ${upperTarget} is at index ${upperIndex} (value: ${sortedArray[upperIndex]})`);

// Search insert position
const insertTarget = 10;
const insertIndex = binarySearch.searchInsertPosition(sortedArray, insertTarget);
console.log(`Insert position for ${insertTarget} would be at index ${insertIndex}`);

// Search range (first and last occurrence)
const rangeArray = [1, 2, 3, 3, 3, 5, 7, 7, 8];
const rangeTarget = 3;
const [firstOccurrence, lastOccurrence] = binarySearch.searchRange(rangeArray, rangeTarget);
console.log(`Range of ${rangeTarget} in array: [${firstOccurrence}, ${lastOccurrence}]`);

// Rotated array examples
const rotatedArray = [7, 8, 9, 1, 2, 3, 4, 5, 6];
const rotatedTarget = 3;
const rotatedIndex = binarySearch.searchRotatedArray(rotatedArray, rotatedTarget);
console.log(`Search in rotated array: Found ${rotatedTarget} at index ${rotatedIndex}`);

const minimum = binarySearch.minimumInRotatedArray(rotatedArray);
console.log(`Minimum element in rotated array is at index ${minimum} (value: ${rotatedArray[minimum]})`);

// Find peak element
const peakArray = [1, 3, 5, 7, 6, 4, 2];
const peakIndex = binarySearch.peakElement(peakArray);
console.log(`Peak element is at index ${peakIndex} (value: ${peakArray[peakIndex]})`);

console.log('=== End of Binary Search Examples ===');