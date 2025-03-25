/**
 * Basic usage example for @slotify/dsa
 * 
 * This example demonstrates how to import and use the library in different ways.
 */

// Import the entire library
import * as slotify from '../dist/index.js';

console.log('=== Basic Usage Example ===');

// Using binary search functions
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;

const index = slotify.binarySearch.standardBinarySearch(array, target);
console.log(`Found ${target} at index: ${index}`);

// Using bitwise operations
const num = 42;
const setBitResult = slotify.bitwise.setBit(num, 3);
console.log(`Setting bit 3 in ${num} results in: ${setBitResult}`);

const isBitSet = slotify.bitwise.isBitSet(num, 3);
console.log(`Is bit 3 set in ${num}? ${isBitSet}`);

const countSetBits = slotify.bitwise.countSetBits(num);
console.log(`Number of set bits in ${num}: ${countSetBits}`);

console.log('=== End of Basic Usage Example ===');