/**
 * Multiplies a number by 2^k (power of 2) using bit shifting.
 * 
 * This function uses left shift to efficiently multiply a number by a power of 2.
 * Left shifting by k positions is equivalent to multiplying by 2^k.
 * 
 * @param num - The number to multiply
 * @param k - The power of 2
 * @returns The result of num * 2^k
 * 
 * @example
 * // Multiply 5 by 2^3 (8)
 * multiplyByPowerOfTwo(5, 3); // returns 40
 * 
 * @example
 * // Multiply 10 by 2^2 (4)
 * multiplyByPowerOfTwo(10, 2); // returns 40
 */
export default function multiplyByPowerOfTwo(num: number, k: number): number {
  return num << k;
}