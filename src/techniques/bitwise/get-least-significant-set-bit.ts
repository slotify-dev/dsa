/**
 * Gets the position of the least significant bit that is set to 1.
 * 
 * This function finds the position of the rightmost set bit in a number.
 * It uses the property that (num & -num) isolates the least significant set bit,
 * then calculates the position using logarithm base 2.
 * 
 * @param num - The number to check
 * @returns The position of the least significant set bit, or -1 if no bit is set
 * 
 * @example
 * // Find the least significant set bit in 10 (binary: 1010)
 * getLeastSignificantSetBit(10); // returns 1 (0-indexed, from right to left)
 * 
 * @example
 * // Find the least significant set bit in 12 (binary: 1100)
 * getLeastSignificantSetBit(12); // returns 2
 */
export default function getLeastSignificantSetBit(num: number): number {
  if (num === 0) return -1;
  return Math.log2(num & -num) | 0; // Using bitwise OR with 0 to convert to integer
}