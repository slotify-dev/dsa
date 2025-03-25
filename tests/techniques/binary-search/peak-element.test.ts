import { describe, it, expect } from 'bun:test';
import { peakElement } from '../../../src/techniques/binary-search';

describe('peakElement', () => {
  it('should find a peak element in the array', () => {
    const result = peakElement([1, 2, 3, 1]);
    expect(result).toBe(2);
    
    const result2 = peakElement([1, 2, 1, 3, 5, 6, 4]);
    // Could be either 1 or 5
    expect([1, 5]).toContain(result2);
  });

  it('should work with arrays of size 1', () => {
    expect(peakElement([1])).toBe(0);
  });

  it('should work with arrays of size 2', () => {
    expect(peakElement([1, 2])).toBe(1);
    expect(peakElement([2, 1])).toBe(0);
  });

  it('should work with monotonically increasing arrays', () => {
    expect(peakElement([1, 2, 3, 4, 5])).toBe(4);
  });

  it('should work with monotonically decreasing arrays', () => {
    expect(peakElement([5, 4, 3, 2, 1])).toBe(0);
  });

  it('should work with arrays having multiple peaks', () => {
    // Could return any peak
    const result = peakElement([1, 3, 2, 4, 1, 5, 2]);
    expect([1, 3, 5]).toContain(result);
  });

  it('should verify the returned index is actually a peak', () => {
    const arrays = [
      [1, 2, 3, 1],
      [1, 2, 1, 3, 5, 6, 4],
      [5, 4, 3, 2, 1],
      [1, 3, 2, 4, 1, 5, 2]
    ];

    for (const arr of arrays) {
      const peakIdx = peakElement(arr);
      
      // Check if it's a peak (greater than neighbors)
      if (peakIdx > 0) {
        expect(arr[peakIdx]).toBeGreaterThan(arr[peakIdx - 1]);
      }
      
      if (peakIdx < arr.length - 1) {
        expect(arr[peakIdx]).toBeGreaterThan(arr[peakIdx + 1]);
      }
    }
  });
});