import { describe, it, expect } from 'bun:test';
import * as BinarySearch from '../../../src/binary-search';

describe('BinarySearch Module', () => {
  it('should export all binary search functions', () => {
    expect(typeof BinarySearch.standardBinarySearch).toBe('function');
    expect(typeof BinarySearch.lowerBound).toBe('function');
    expect(typeof BinarySearch.upperBound).toBe('function');
    expect(typeof BinarySearch.searchRange).toBe('function');
    expect(typeof BinarySearch.searchInsertPosition).toBe('function');
    expect(typeof BinarySearch.searchRotatedArray).toBe('function');
    expect(typeof BinarySearch.peakElement).toBe('function');
    expect(typeof BinarySearch.minimumInRotatedArray).toBe('function');
  });
});