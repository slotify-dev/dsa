/**
 * Binary Search Module
 * 
 * This module exports a collection of utility functions for binary search operations.
 * Each function implements a variation of the binary search algorithm to solve different
 * problems efficiently, such as finding elements in sorted arrays, finding bounds,
 * searching in rotated arrays, and locating peaks or minimums.
 * 
 * All functions support generic types and custom comparators, allowing them to work with
 * any data type, not just numbers. By default, they use the comparator from utils/comparator.
 */

import lowerBound from './lower-bound';
import upperBound from './upper-bound';
import searchRange from './search-range';
import peakElement from './peak-element';
import defaultComparator from './default-comparator';
import searchRotatedArray from './search-rotated-array';
import standardBinarySearch from './standard-binary-search';
import searchInsertPosition from './search-insert-position';
import minimumInRotatedArray from './minimum-in-rotated-array';

export {
  lowerBound,
  upperBound,
  searchRange,
  peakElement,
  defaultComparator,
  searchRotatedArray,
  standardBinarySearch,
  searchInsertPosition,
  minimumInRotatedArray,
};