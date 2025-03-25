/**
 * Adds two numbers without using the addition operator.
 * 
 * This function implements binary addition using bitwise operations.
 * It uses XOR to add bits without considering carry, and AND with left shift
 * to compute the carry. The process repeats until there's no more carry.
 * 
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 * 
 * @example
 * // Add 5 and 3 without using +
 * addWithoutPlus(5, 3); // returns 8
 * 
 * @example
 * // Add -2 and 7 without using +
 * addWithoutPlus(-2, 7); // returns 5
 */
export default function addWithoutPlus(a: number, b: number): number {
  while (b !== 0) {
    const carry = a & b;
    a = a ^ b;
    b = carry << 1;
  }
  return a;
}