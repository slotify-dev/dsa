/**
 * Clears the bit at the given position (sets to 0) in the number.
 * 
 * This function uses bitwise operations to set a specific bit in a number to 0.
 * It creates a mask with a 0 at the specified position and 1s elsewhere by
 * left shifting 1, then negating it, and finally performing a bitwise AND
 * with the original number to clear that bit.
 * 
 * @param num - The number to modify
 * @param position - The position of the bit to clear (0-based, from right to left)
 * @returns A new number with the bit cleared
 * 
 * @example
 * // Clear the 1st bit in 10 (binary: 1010)
 * clearBit(10, 1); // returns 8 (binary: 1000)
 * 
 * @example
 * // Clear the 2nd bit in 10 (binary: 1010)
 * clearBit(10, 2); // returns 10 (binary: 1010, no change as bit was already 0)
 */
export default function clearBit(num: number, position: number): number {
  return num & ~(1 << position);
}