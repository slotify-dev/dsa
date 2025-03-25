/**
 * Checks if the bit at the given position is set (1) in the number.
 * 
 * This function uses bitwise operations to determine if a specific bit
 * in a number is set to 1. It shifts the number right by the position
 * amount and then performs a bitwise AND with 1 to isolate the bit.
 * 
 * @param num - The number to check
 * @param position - The position of the bit (0-based, from right to left)
 * @returns True if the bit is set, false otherwise
 * 
 * @example
 * // Check if the 3rd bit is set in 10 (binary: 1010)
 * isBitSet(10, 3); // returns true
 * 
 * @example
 * // Check if the 2nd bit is set in 10 (binary: 1010)
 * isBitSet(10, 2); // returns false
 */
export default function isBitSet(num: number, position: number): boolean {
  return ((num >> position) & 1) === 1;
}