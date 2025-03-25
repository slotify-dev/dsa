/**
 * Calculates the absolute value of a number using bit manipulation.
 * 
 * This function computes the absolute value without using conditional statements.
 * It creates a mask based on the sign bit (all 1s for negative numbers, all 0s for positive),
 * then uses XOR and subtraction to compute the absolute value.
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
  const mask = num >> 31; // Creates a mask of all 1s if negative, all 0s if positive
  return (num ^ mask) - mask;
}