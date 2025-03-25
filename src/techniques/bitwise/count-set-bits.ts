/**
 * Counts the number of bits that are set to 1 in a number.
 * 
 * This function implements Brian Kernighan's Algorithm to count set bits.
 * The algorithm repeatedly clears the least significant set bit and
 * increments a counter until the number becomes zero.
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
 */
export default function countSetBits(num: number): number {
  let count = 0;
  let n = num;
  
  // Brian Kernighan's Algorithm
  while (n > 0) {
    n &= (n - 1); // Clear the least significant set bit
    count++;
  }
  
  return count;
}