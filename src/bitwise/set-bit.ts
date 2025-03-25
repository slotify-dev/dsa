/**
 * Sets the bit at the given position to 1 in the number.
 * 
 * This function uses bitwise operations to set a specific bit in a number to 1.
 * It creates a mask with a 1 at the specified position using left shift,
 * then performs a bitwise OR with the original number to set that bit.
 * 
 * @param num - The number to modify
 * @param position - The position of the bit to set (0-based, from right to left)
 * @returns A new number with the bit set
 * 
 * @example
 * // Set the 1st bit in 10 (binary: 1010)
 * setBit(10, 1); // returns 10 (binary: 1010, no change as bit was already set)
 * 
 * @example
 * // Set the 2nd bit in 10 (binary: 1010)
 * setBit(10, 2); // returns 14 (binary: 1110)
 */
export default function setBit(num: number, position: number): number {
  return num | (1 << position);
}