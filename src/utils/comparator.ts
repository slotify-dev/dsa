/**
 * A comparator function type definition for comparing two elements of the same type T.
 * Returns:
 * - negative value if a < b
 * - zero if a === b
 * - positive value if a > b
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Default comparator function for sorting operations.
 * This function properly handles different types including:
 * - Strings: using standard string comparison (uppercase before lowercase)
 * - Numbers: using numeric comparison
 * - Other comparable types: using standard comparison operators
 * 
 * @param a - The first element to compare
 * @param b - The second element to compare
 * @returns -1 if a < b, 1 if a > b, 0 if equal
 */
export default function defaultComparator<T>(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}