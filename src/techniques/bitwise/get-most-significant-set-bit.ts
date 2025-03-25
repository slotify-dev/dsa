/**
 * Gets the position of the most significant bit that is set to 1.
 * 
 * This function finds the position of the leftmost set bit in a number.
 * It uses the logarithm base 2 of the number to determine the position
 * of the most significant set bit.
 * 
 * @param num - The number to check
 * @returns The position of the most significant set bit, or -1 if no bit is set
 * 
 * @example
 * // Find the most significant set bit in 10 (binary: 1010)
 * getMostSignificantSetBit(10); // returns 3 (0-indexed, from right to left)
 * 
 * @example
 * // Find the most significant set bit in 12 (binary: 1100)
 * getMostSignificantSetBit(12); // returns 3
 */
export default function getMostSignificantSetBit(num: number): number {
  if (num === 0) return -1;
  return Math.floor(Math.log2(num));
}