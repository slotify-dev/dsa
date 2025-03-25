/**
 * Finds the next power of 2 greater than or equal to the given number.
 * 
 * This function computes the next power of 2 using bit manipulation.
 * It works by setting all bits to the right of the most significant bit to 1,
 * then adding 1 to get the next power of 2.
 * 
 * @param num - The number to find the next power of 2 for
 * @returns The next power of 2
 * 
 * @example
 * // Find the next power of 2 for 5
 * nextPowerOfTwo(5); // returns 8
 * 
 * @example
 * // Find the next power of 2 for 16
 * nextPowerOfTwo(16); // returns 16 (already a power of 2)
 */
export default function nextPowerOfTwo(num: number): number {
  if (num <= 0) return 1;
  
  num--;
  num |= num >> 1;
  num |= num >> 2;
  num |= num >> 4;
  num |= num >> 8;
  num |= num >> 16;
  
  return num + 1;
}