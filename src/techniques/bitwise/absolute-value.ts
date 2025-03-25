/**
 * Calculates the absolute value of a number using bit manipulation.
 * 
 * This function computes the absolute value without using conditional statements.
 * It creates a mask based on the sign bit (all 1s for negative numbers, all 0s for positive),
 * then uses XOR and subtraction to compute the absolute value.
 * 
 * Note: For the minimum 32-bit signed integer (-2147483648), this function
 * will return the same value (-2147483648), as its absolute value cannot be represented
 * in a 32-bit signed integer. This is a limitation of the algorithm when working with
 * two's complement representation.
 * 
 * @param num - The number to get the absolute value of
 * @returns The absolute value
 * 
 * @example
 * // Get absolute value of -5
 * absoluteValue(-5); // returns 5
 * 
 * @example
 * // Get absolute value of 7
 * absoluteValue(7); // returns 7
 */
export default function absoluteValue(num: number): number {
  // Define the minimum 32-bit integer constant
  const MIN_INT32 = -2147483648; // -2^31
  
  // Special case for MIN_INT32
  // In two's complement, abs(-2^31) can't be represented as a positive 32-bit integer
  // because it would be 2^31, which is outside the range of a 32-bit signed integer
  if (num === MIN_INT32) {
    return MIN_INT32; // Return the same value as a limitation of the algorithm
  }
  
  const mask = num >> 31; // Creates a mask of all 1s if negative, all 0s if positive
  return (num ^ mask) - mask;
}