/**
 * Reverses the bits in a 32-bit unsigned integer.
 * 
 * This function reverses the order of bits in a 32-bit number.
 * It iterates through each bit position, extracts the bit using
 * bitwise AND, and places it in the reversed position using left shift
 * and bitwise OR.
 * 
 * @param num - The number to reverse bits in
 * @returns A new number with reversed bits
 * 
 * @example
 * // Reverse bits in 43261596 (binary: 00000010100101000001111010011100)
 * reverseBits(43261596); // returns 964176192 (binary: 00111001011110000010100101000000)
 */
export default function reverseBits(num: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (num & 1);
    num >>>= 1; // Unsigned right shift
  }
  return result >>> 0; // Convert to unsigned 32-bit integer
}