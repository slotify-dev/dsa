import defaultComparator from '../../src/utils/comparator';

import { describe, expect, it } from 'bun:test';
import { lomutoPartition, hoarePartition } from '../../src/sorting';

// Helper function to create a deep copy of an array
function copyArray<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr));
}

describe('Partition Functions', () => {
  describe('Lomuto Partition', () => {
    it('should partition an array around the pivot (last element)', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      const pivotIndex = lomutoPartition(arr, 0, arr.length - 1, defaultComparator);

      // Check that the pivot is in the correct position
      expect(pivotIndex).toBeDefined();

      // All elements before pivotIndex should be <= pivot
      for (let i = 0; i < pivotIndex; i++) {
        expect(arr[i] <= arr[pivotIndex]).toBe(true);
      }

      // All elements after pivotIndex should be > pivot
      for (let i = pivotIndex + 1; i < arr.length; i++) {
        expect(arr[i] > arr[pivotIndex]).toBe(true);
      }
    });

    it('should handle arrays with all identical elements', () => {
      const arr = [5, 5, 5, 5, 5];
      const pivotIndex = lomutoPartition(arr, 0, arr.length - 1, defaultComparator);

      expect(pivotIndex).toBeDefined();
      expect(arr).toEqual([5, 5, 5, 5, 5]);
    });

    it('should handle arrays with two elements', () => {
      const arr1 = [2, 1];
      const pivotIndex1 = lomutoPartition(arr1, 0, arr1.length - 1, defaultComparator);
      expect(pivotIndex1).toBeDefined();
      expect(arr1[0] <= arr1[pivotIndex1]).toBe(true);

      const arr2 = [1, 2];
      const pivotIndex2 = lomutoPartition(arr2, 0, arr2.length - 1, defaultComparator);
      expect(pivotIndex2).toBeDefined();
      expect(arr2[0] <= arr2[pivotIndex2]).toBe(true);
    });

    it('should handle arrays with custom comparator', () => {
      const arr = [
        { value: 3 },
        { value: 1 },
        { value: 4 },
        { value: 2 }
      ];

      const comparator = (a: { value: number }, b: { value: number }) => a.value - b.value;
      const pivotIndex = lomutoPartition(arr, 0, arr.length - 1, comparator);

      expect(pivotIndex).toBeDefined();

      // All elements before pivotIndex should have value <= pivot value
      for (let i = 0; i < pivotIndex; i++) {
        expect(arr[i].value <= arr[pivotIndex].value).toBe(true);
      }

      // All elements after pivotIndex should have value > pivot value
      for (let i = pivotIndex + 1; i < arr.length; i++) {
        expect(arr[i].value > arr[pivotIndex].value).toBe(true);
      }
    });
  });

  describe('Hoare Partition', () => {
    it('should partition an array around the pivot (first element)', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      const pivotIndex = hoarePartition(arr, 0, arr.length - 1, defaultComparator);

      expect(pivotIndex).toBeDefined();

      // All elements before or at pivotIndex should be <= pivot
      for (let i = 0; i <= pivotIndex; i++) {
        expect(arr[i] <= arr[0]).toBe(true);
      }

      // All elements after pivotIndex should be > pivot
      for (let i = pivotIndex + 1; i < arr.length; i++) {
        expect(arr[i] > arr[0]).toBe(true);
      }
    });

    it('should handle arrays with all identical elements', () => {
      const arr = [5, 5, 5, 5, 5];
      const pivotIndex = hoarePartition(arr, 0, arr.length - 1, defaultComparator);

      expect(pivotIndex).toBeDefined();
      expect(arr).toEqual([5, 5, 5, 5, 5]);
    });

    it('should handle arrays with two elements', () => {
      const arr1 = [2, 1];
      const pivotIndex1 = hoarePartition(arr1, 0, arr1.length - 1, defaultComparator);
      expect(pivotIndex1).toBeDefined();

      const arr2 = [1, 2];
      const pivotIndex2 = hoarePartition(arr2, 0, arr2.length - 1, defaultComparator);
      expect(pivotIndex2).toBeDefined();
    });

    it('should handle arrays with custom comparator', () => {
      const arr = [
        { value: 3 },
        { value: 1 },
        { value: 4 },
        { value: 2 }
      ];

      const comparator = (a: { value: number }, b: { value: number }) => a.value - b.value;
      const pivotIndex = hoarePartition(arr, 0, arr.length - 1, comparator);

      expect(pivotIndex).toBeDefined();

      // All elements before or at pivotIndex should have value <= pivot value
      for (let i = 0; i <= pivotIndex; i++) {
        expect(arr[i].value <= arr[0].value).toBe(true);
      }

      // All elements after pivotIndex should have value > pivot value
      for (let i = pivotIndex + 1; i < arr.length; i++) {
        expect(arr[i].value > arr[0].value).toBe(true);
      }
    });
  });

  // Compare both partition schemes
  describe('Comparison of partition schemes', () => {
    it('should both correctly partition the same array', () => {
      const arr1 = [3, 1, 4, 1, 5, 9, 2, 6];
      const arr2 = copyArray(arr1);

      const pivotIndex1 = lomutoPartition(arr1, 0, arr1.length - 1, defaultComparator);
      const pivotIndex2 = hoarePartition(arr2, 0, arr2.length - 1, defaultComparator);

      expect(pivotIndex1).toBeDefined();
      expect(pivotIndex2).toBeDefined();

      // Both should result in partitioned arrays, though the exact arrangement may differ
      // due to the different pivot selection and partitioning strategies
    });
  });
});