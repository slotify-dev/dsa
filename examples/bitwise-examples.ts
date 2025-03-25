/**
 * Bitwise operations examples for @slotify/dsa
 * 
 * This example demonstrates various bitwise operations provided by the library.
 */

// Import specific bitwise module
import * as bitwise from '../dist/bitwise/index.js';

console.log('=== Bitwise Operations Examples ===');

// Basic bit operations
const num = 42; // Binary: 101010
console.log(`Working with number: ${num} (binary: ${num.toString(2)})`);

// Check if bit is set
for (let i = 0; i < 6; i++) {
  console.log(`Is bit ${i} set in ${num}? ${bitwise.isBitSet(num, i)}`);
}

// Set, clear, and toggle bits
const setBitResult = bitwise.setBit(num, 2);
console.log(`Setting bit 2 in ${num}: ${setBitResult} (binary: ${setBitResult.toString(2)})`);

const clearBitResult = bitwise.clearBit(num, 3);
console.log(`Clearing bit 3 in ${num}: ${clearBitResult} (binary: ${clearBitResult.toString(2)})`);

const toggleBitResult = bitwise.toggleBit(num, 1);
console.log(`Toggling bit 1 in ${num}: ${toggleBitResult} (binary: ${toggleBitResult.toString(2)})`);

const updateBitResult = bitwise.updateBit(num, 0, 1);
console.log(`Updating bit 0 to 1 in ${num}: ${updateBitResult} (binary: ${updateBitResult.toString(2)})`);

// Count set bits
console.log(`Number of set bits in ${num}: ${bitwise.countSetBits(num)}`);

// Power of two operations
const isPowerOfTwo = bitwise.isPowerOfTwo(64);
console.log(`Is 64 a power of two? ${isPowerOfTwo}`);

const nextPowerOfTwo = bitwise.nextPowerOfTwo(42);
console.log(`Next power of two after ${num}: ${nextPowerOfTwo}`);

// Multiply and divide by power of two
const multiplyResult = bitwise.multiplyByPowerOfTwo(5, 3); // 5 * 2^3
console.log(`5 * 2^3 = ${multiplyResult}`);

const divideResult = bitwise.divideByPowerOfTwo(40, 3); // 40 / 2^3
console.log(`40 / 2^3 = ${divideResult}`);

// Get significant bits
const lsb = bitwise.getLeastSignificantSetBit(44); // Binary: 101100
console.log(`Least significant set bit in 44: ${lsb}`);

const msb = bitwise.getMostSignificantSetBit(44);
console.log(`Most significant set bit in 44: ${msb}`);

// Absolute value using bitwise operations
const negativeNum = -25;
console.log(`Absolute value of ${negativeNum} using bitwise: ${bitwise.absoluteValue(negativeNum)}`);

// Check if two numbers have opposite signs
console.log(`Do 25 and -25 have opposite signs? ${bitwise.haveOppositeSigns(25, -25)}`);

// Add without using + operator
console.log(`Adding 17 + 25 using bitwise: ${bitwise.addWithoutPlus(17, 25)}`);

// Swap without temp variable
let a = 10, b = 20;
[a, b] = bitwise.swapWithoutTemp(a, b);
console.log(`After swapping: a = ${a}, b = ${b}`);

// Reverse bits in a number
const reversedBits = bitwise.reverseBits(num, 8); // Reverse 8 bits
console.log(`Reversing 8 bits of ${num} (${num.toString(2).padStart(8, '0')}): ${reversedBits} (${reversedBits.toString(2).padStart(8, '0')})`);

console.log('=== End of Bitwise Operations Examples ===');