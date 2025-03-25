/**
 * Updates the bit at the given position with a new value (0 or 1).
 * 
 * This function uses bitwise operations to update a specific bit in a number
 * to either 0 or 1. It first clears the bit at the specified position using
 * a mask, then sets it to the new value using bitwise OR.
 * 
 * @param num - The number to modify
 * @param position - The position of the bit to update (0-based, from right to left)
 * @param value - The new value (0 or 1)
 * @returns A new number with the bit updated
 * 
 * @example
 * // Update the 1st bit in 10 (binary: 1010) to 0
 * updateBit(10, 1, 0); // returns 8 (binary: 1000)
 * 
 * @example
 * // Update the 2nd bit in 10 (binary: 1010) to 1
 * updateBit(10, 2, 1); // returns 14 (binary: 1110)
 */
export default function updateBit(num: number, position: number, value: 0 | 1): number {
  // Clear the bit at position first, then set it to the new value
  return (num & ~(1 << position)) | (value << position);
}