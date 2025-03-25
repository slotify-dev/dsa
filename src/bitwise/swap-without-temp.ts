/**
 * Swaps the values of two numbers without using a temporary variable.
 * 
 * This function uses XOR operations to swap two numbers without
 * requiring an additional temporary variable. The XOR operation has
 * the property that (a ^ b) ^ b = a, which is used to perform the swap.
 * 
 * @param a - First number
 * @param b - Second number
 * @returns An array containing the swapped values [a, b]
 * 
 * @example
 * // Swap 5 and 10
 * swapWithoutTemp(5, 10); // returns [10, 5]
 */
export default function swapWithoutTemp(a: number, b: number): [number, number] {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return [a, b];
}