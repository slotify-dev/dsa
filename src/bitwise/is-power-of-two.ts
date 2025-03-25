/**
 * Checks if a number is a power of 2.
 * 
 * This function uses a bitwise trick to determine if a number is a power of 2.
 * A power of 2 has exactly one bit set to 1. When we subtract 1 from a power of 2,
 * all bits to the right of that bit become 1. When we perform a bitwise AND between
 * the original number and (number-1), the result should be 0 for powers of 2.
 * 
 * @param num - The number to check
 * @returns True if the number is a power of 2, false otherwise
 * 
 * @example
 * // Check if 8 is a power of 2
 * isPowerOfTwo(8); // returns true (8 = 2^3)
 * 
 * @example
 * // Check if 10 is a power of 2
 * isPowerOfTwo(10); // returns false
 */
export default function isPowerOfTwo(num: number): boolean {
  return num > 0 && (num & (num - 1)) === 0;
}