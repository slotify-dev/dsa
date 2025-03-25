/**
 * Checks if two numbers have opposite signs.
 * 
 * This function uses the XOR operation to determine if two numbers have opposite signs.
 * When XORing two numbers, the result will have its sign bit set (negative) if and only if
 * the two numbers have different sign bits.
 * 
 * @param a - First number
 * @param b - Second number
 * @returns True if the numbers have opposite signs, false otherwise
 * 
 * @example
 * // Check if 5 and -3 have opposite signs
 * haveOppositeSigns(5, -3); // returns true
 * 
 * @example
 * // Check if -7 and -2 have opposite signs
 * haveOppositeSigns(-7, -2); // returns false
 */
export default function haveOppositeSigns(a: number, b: number): boolean {
  return (a ^ b) < 0;
}