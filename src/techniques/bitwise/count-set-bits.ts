/**
 * Counts the number of bits that are set to 1 in a number.
 * 
 * This function implements Brian Kernighan's Algorithm to count set bits.
 * The algorithm repeatedly clears the least significant set bit and
 * increments a counter until the number becomes zero.
 * For negative numbers, it handles the two's complement representation.
 * 
 * Time complexity: O(number of set bits)
 * 
 * @param num - The number to count bits in
 * @returns The number of bits set to 1
 * 
 * @example
 * // Count set bits in 10 (binary: 1010)
 * countSetBits(10); // returns 2
 * 
 * @example
 * // Count set bits in 15 (binary: 1111)
 * countSetBits(15); // returns 4
 * 
 * @example
 * // Count set bits in -1 (binary: all 1s in two's complement)
 * countSetBits(-1); // returns 32 (for 32-bit integers)
 */
export default function countSetBits(num: number): number {
  let count = 0;
  
  // For negative numbers in JavaScript (which uses two's complement),
  // we need to handle them differently
  if (num < 0) {
    // Convert to unsigned 32-bit integer representation
    // In JavaScript, >>> 0 converts to unsigned 32-bit integer
    let n = num >>> 0;
    
    while (n !== 0) {
      n &= (n - 1); // Clear the least significant set bit
      count++;
    }
  } else {
    let n = num;
    
    // Brian Kernighan's Algorithm for positive numbers
    while (n > 0) {
      n &= (n - 1); // Clear the least significant set bit
      count++;
    }
  }
  
  return count;
}