# Bitwise Operations

Bitwise operations manipulate individual bits in binary representations of numbers, providing efficient solutions for various computational problems.

## What are Bitwise Operations?

Bitwise operations work directly on the binary representation of numbers at the bit level. These operations include AND, OR, XOR, NOT, and bit shifts, which can be combined to perform complex bit manipulations.

## Why Use Bitwise Operations?

- **Performance**: Bitwise operations are executed directly by the CPU and are typically faster than arithmetic operations.
- **Memory Efficiency**: They can be used to pack multiple boolean values into a single number, saving memory.
- **Low-level Control**: They provide direct manipulation of data at the bit level, which is useful for certain algorithms and data structures.
- **Optimization**: Many mathematical operations can be optimized using bitwise tricks.

## Use Cases

- Flags and state management
- Permissions and access control
- Cryptography and hashing
- Graphics processing
- Network protocols
- Embedded systems programming
- Performance optimization

## Import Examples

There are several ways to import the bitwise operations functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use bitwise functions
const result = slotify.bitwise.setBit(42, 3);
```

### Import only the bitwise module

```typescript
import * as bitwise from '@slotify/dsa/bitwise';

// Use bitwise functions directly
const result = bitwise.setBit(42, 3);
```

### Import specific functions

```typescript
import { setBit, isBitSet, countSetBits } from '@slotify/dsa/bitwise';

// Use imported functions directly
const result = setBit(42, 3);
const isSet = isBitSet(42, 3);
const count = countSetBits(42);
```

### Import with alias

```typescript
import * as bitwiseOps from '@slotify/dsa/bitwise';

// Use with alias
const result = bitwiseOps.setBit(42, 3);
```

## API Reference

### Count Set Bits

```typescript
function countSetBits(num: number): number
```

Counts the number of bits that are set to 1 in a number using Brian Kernighan's Algorithm.

- **Time Complexity**: O(number of set bits)
- **Space Complexity**: O(1)

**Example:**
```typescript
import { countSetBits } from '@slotify/dsa/bitwise';

// Count set bits in 10 (binary: 1010)
const bits1 = countSetBits(10); // returns 2

// Count set bits in 15 (binary: 1111)
const bits2 = countSetBits(15); // returns 4
```

### Is Bit Set

```typescript
function isBitSet(num: number, position: number): boolean
```

Checks if a bit at a specific position is set (1) or not (0).

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as bitwise from '@slotify/dsa/bitwise';

// Check if bit 1 is set in 10 (binary: 1010)
const isSet = bitwise.isBitSet(10, 1); // returns true

// Check if bit 0 is set in 10 (binary: 1010)
const isNotSet = bitwise.isBitSet(10, 0); // returns false
```

### Set Bit

```typescript
function setBit(num: number, position: number): number
```

Sets the bit at a specific position to 1.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as slotify from '@slotify/dsa';

// Set bit 2 in 10 (binary: 1010)
const result = slotify.bitwise.setBit(10, 2); // returns 14 (binary: 1110)
```

### Clear Bit

```typescript
function clearBit(num: number, position: number): number
```

Clears (sets to 0) the bit at a specific position.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import { clearBit } from '@slotify/dsa/bitwise';

// Clear bit 3 in 10 (binary: 1010)
const result = clearBit(10, 3); // returns 2 (binary: 0010)
```

### Toggle Bit

```typescript
function toggleBit(num: number, position: number): number
```

Toggles (flips) the bit at a specific position.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as bitwise from '@slotify/dsa/bitwise';

// Toggle bit 1 in 10 (binary: 1010)
const result = bitwise.toggleBit(10, 1); // returns 8 (binary: 1000)
```

### Update Bit

```typescript
function updateBit(num: number, position: number, value: 0 | 1): number
```

Updates the bit at a specific position to a given value (0 or 1).

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as slotify from '@slotify/dsa';

// Update bit 0 to 1 in 10 (binary: 1010)
const result = slotify.bitwise.updateBit(10, 0, 1); // returns 11 (binary: 1011)
```

### Is Power of Two

```typescript
function isPowerOfTwo(num: number): boolean
```

Checks if a number is a power of two.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import { isPowerOfTwo } from '@slotify/dsa/bitwise';

// Check if 64 is a power of two
const isPower = isPowerOfTwo(64); // returns true

// Check if 63 is a power of two
const isNotPower = isPowerOfTwo(63); // returns false
```

### Next Power of Two

```typescript
function nextPowerOfTwo(num: number): number
```

Finds the next power of two greater than or equal to the given number.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as bitwise from '@slotify/dsa/bitwise';

// Find the next power of two after 10
const nextPower = bitwise.nextPowerOfTwo(10); // returns 16
```

### Get Least Significant Set Bit

```typescript
function getLeastSignificantSetBit(num: number): number
```

Gets the position of the least significant bit that is set to 1.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as slotify from '@slotify/dsa';

// Get the least significant set bit in 12 (binary: 1100)
const lsb = slotify.bitwise.getLeastSignificantSetBit(12); // returns 2
```

### Get Most Significant Set Bit

```typescript
function getMostSignificantSetBit(num: number): number
```

Gets the position of the most significant bit that is set to 1.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**
```typescript
import { getMostSignificantSetBit } from '@slotify/dsa/bitwise';

// Get the most significant set bit in 12 (binary: 1100)
const msb = getMostSignificantSetBit(12); // returns 3
```

### Absolute Value

```typescript
function absoluteValue(num: number): number
```

Computes the absolute value of a number using bitwise operations.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as bitwise from '@slotify/dsa/bitwise';

// Get absolute value of -25
const abs = bitwise.absoluteValue(-25); // returns 25
```

### Add Without Plus

```typescript
function addWithoutPlus(a: number, b: number): number
```

Adds two numbers without using the addition operator.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as slotify from '@slotify/dsa';

// Add 17 and 25 without using +
const sum = slotify.bitwise.addWithoutPlus(17, 25); // returns 42
```

### Multiply by Power of Two

```typescript
function multiplyByPowerOfTwo(num: number, power: number): number
```

Multiplies a number by a power of two using bit shifting.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import { multiplyByPowerOfTwo } from '@slotify/dsa/bitwise';

// Multiply 5 by 2^3 (8)
const product = multiplyByPowerOfTwo(5, 3); // returns 40
```

### Divide by Power of Two

```typescript
function divideByPowerOfTwo(num: number, power: number): number
```

Divides a number by a power of two using bit shifting.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as bitwise from '@slotify/dsa/bitwise';

// Divide 40 by 2^3 (8)
const quotient = bitwise.divideByPowerOfTwo(40, 3); // returns 5
```

### Have Opposite Signs

```typescript
function haveOppositeSigns(a: number, b: number): boolean
```

Checks if two numbers have opposite signs.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as slotify from '@slotify/dsa';

// Check if 25 and -25 have opposite signs
const areOpposite = slotify.bitwise.haveOppositeSigns(25, -25); // returns true
```

### Swap Without Temp

```typescript
function swapWithoutTemp(a: number, b: number): [number, number]
```

Swaps two numbers without using a temporary variable.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

**Example:**
```typescript
import { swapWithoutTemp } from '@slotify/dsa/bitwise';

// Swap 10 and 20 without using a temporary variable
const [newA, newB] = swapWithoutTemp(10, 20); // returns [20, 10]
```

### Reverse Bits

```typescript
function reverseBits(num: number, bits: number = 32): number
```

Reverses the bits of a number.

- **Time Complexity**: O(number of bits)
- **Space Complexity**: O(1)

**Example:**
```typescript
import * as bitwise from '@slotify/dsa/bitwise';

// Reverse 8 bits of 42 (binary: 00101010)
const reversed = bitwise.reverseBits(42, 8); // returns 84 (binary: 01010100)
```