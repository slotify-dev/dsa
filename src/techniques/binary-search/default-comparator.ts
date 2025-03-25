/**
 * Utility comparator function that handles different types correctly.
 * 
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns -1 if a < b, 1 if a > b, 0 if equal
 */
function comparator<T>(a: T, b: T): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * Default comparator function for binary search operations.
 * This function properly handles different types including:
 * - Strings: using localeCompare for proper lexicographical comparison
 * - Numbers: using numeric comparison
 * - Other comparable types: using standard comparison operators
 * 
 * @param element - The element from the array
 * @param target - The target value to compare against
 * @returns -1 if element < target, 1 if element > target, 0 if equal
 */
export default function defaultComparator<T>(element: T, target: T): number {
  return comparator(element, target);
}