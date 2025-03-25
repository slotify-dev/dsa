/**
 * Main entry point for the @slotify/dsa package
 * 
 * This file re-exports all modules from the package to allow for:
 * 1. Importing the entire library: import * as slotify from '@slotify/dsa'
 * 2. Importing specific modules: import * as bitwise from '@slotify/dsa/techniques/bitwise'
 * 3. Importing specific functions: import setBit from '@slotify/dsa/techniques/bitwise/set-bit'
 */

// Re-export all modules
export * as bitwise from './bitwise';
export * as binarySearch from './binary-search';

// Re-export all functions from all modules for top-level access
export * from './bitwise';
export * from './binary-search';