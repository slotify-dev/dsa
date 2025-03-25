/**
 * Divides a number by 2^k (power of 2) using bit shifting.
 * 
 * This function uses right shift to efficiently divide a number by a power of 2.
 * Right shifting by k positions is equivalent to dividing by 2^k and rounding down
 * for negative numbers (sign bit is preserved).
 * 
 * @param num - The number to divide
 * @param k - The power of 2
 * @returns The result of num / 2^k
 * 
 * @example
 * // Divide 40 by 2^3 (8)
 * divideByPowerOfTwo(40, 3); // returns 5
 * 
 * @example
 * // Divide -20 by 2^2 (4)
 * divideByPowerOfTwo(-20, 2); // returns -5
 */
export default function divideByPowerOfTwo(num: number, k: number): number {
  return num >> k;
}