/**
 * Toggles the bit at the given position in the number.
 * 
 * This function uses bitwise operations to flip a specific bit in a number.
 * It creates a mask with a 1 at the specified position using left shift,
 * then performs a bitwise XOR with the original number to toggle that bit.
 * If the bit was 0, it becomes 1, and if it was 1, it becomes 0.
 * 
 * @param num - The number to modify
 * @param position - The position of the bit to toggle (0-based, from right to left)
 * @returns A new number with the bit toggled
 * 
 * @example
 * // Toggle the 1st bit in 10 (binary: 1010)
 * toggleBit(10, 1); // returns 8 (binary: 1000)
 * 
 * @example
 * // Toggle the 2nd bit in 10 (binary: 1010)
 * toggleBit(10, 2); // returns 14 (binary: 1110)
 */
export default function toggleBit(num: number, position: number): number {
  return num ^ (1 << position);
}