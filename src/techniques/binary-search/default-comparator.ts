function comparator<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Default comparator function for binary search operations.
 * This is a wrapper around the utility comparator function.
 * 
 * @param element - The element from the array
 * @param target - The target value to compare against
 * @returns -1 if element < target, 1 if element > target, 0 if equal
 */
export default function defaultComparator<T>(element: T, target: T): number {
  return comparator(element as number as T, target as number as T);
}