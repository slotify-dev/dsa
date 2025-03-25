# Getting Started with @slotify/dsa

This guide will help you get started with the @slotify/dsa library, which provides efficient implementations of common data structures and algorithms in TypeScript.

## Installation

Install the package using npm or yarn:

```bash
# Using npm
npm install @slotify/dsa

# Using yarn
yarn add @slotify/dsa

# Using bun
bun add @slotify/dsa
```

## Import Options

The library supports multiple import styles to fit your preferences and needs:

### Import the Entire Library

```typescript
import * as slotify from '@slotify/dsa';

// Use binary search
const index = slotify.binarySearch.standardBinarySearch([1, 2, 3, 4, 5], 3);

// Use bitwise operations
const result = slotify.bitwise.setBit(42, 3);
```

### Import Specific Modules

```typescript
import * as binarySearch from '@slotify/dsa/binary-search';
import * as bitwise from '@slotify/dsa/bitwise';

// Use binary search directly
const index = binarySearch.standardBinarySearch([1, 2, 3, 4, 5], 3);

// Use bitwise operations directly
const result = bitwise.setBit(42, 3);
```

### Import with Alias

```typescript
import * as dsa from '@slotify/dsa';
import * as bitwiseOps from '@slotify/dsa/bitwise';

// Use with library alias
const index = dsa.binarySearch.standardBinarySearch([1, 2, 3, 4, 5], 3);

// Use with module alias
const result = bitwiseOps.setBit(42, 3);
```

### Import Specific Functions

```typescript
import { standardBinarySearch, lowerBound } from '@slotify/dsa/binary-search';
import { setBit, isBitSet } from '@slotify/dsa/bitwise';

// Use imported functions directly
const index = standardBinarySearch([1, 2, 3, 4, 5], 3);
const result = setBit(42, 3);
```

## Basic Example

Here's a simple example that demonstrates how to use the library:

```typescript
import * as slotify from '@slotify/dsa';

// Using binary search
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
```

## Available Modules

The library currently includes the following modules:

- **Binary Search**: Efficient search algorithms for sorted arrays
- **Bitwise Operations**: Low-level bit manipulation functions

For detailed documentation on each module, please refer to:

- [Binary Search Documentation](./binary-search.md)
- [Bitwise Operations Documentation](./bitwise.md)

## Running Examples

The library includes several examples that demonstrate how to use different features. You can find these in the `examples` directory:

- `basic-usage.ts`: Shows basic usage of the library
- `binary-search-examples.ts`: Demonstrates various binary search algorithms
- `bitwise-examples.ts`: Shows how to use bitwise operations

To run all examples:

```bash
# Using npm
npm run examples

# Using yarn
yarn examples

# Using bun
bun run examples
```