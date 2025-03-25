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
// Count set bits in 10 (binary: 1010)
countSetBits(10); // returns 2

// Count set bits in 15 (binary: 1111)
countSetBits(15); // returns 4
```

### Is Bit Set

```typescript
function isBitSet(num: number, position: number): boolean
```

Checks if a bit at a specific position is set (1) or not (0).

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Set Bit

```typescript
function setBit(num: number, position: number): number
```

Sets the bit at a specific position to 1.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Clear Bit

```typescript
function clearBit(num: number, position: number): number
```

Clears (sets to 0) the bit at a specific position.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Toggle Bit

```typescript
function toggleBit(num: number, position: number): number
```

Toggles (flips) the bit at a specific position.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Update Bit

```typescript
function updateBit(num: number, position: number, value: 0 | 1): number
```

Updates the bit at a specific position to a given value (0 or 1).

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Is Power of Two

```typescript
function isPowerOfTwo(num: number): boolean
```

Checks if a number is a power of two.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Next Power of Two

```typescript
function nextPowerOfTwo(num: number): number
```

Finds the next power of two greater than or equal to the given number.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Get Least Significant Set Bit

```typescript
function getLeastSignificantSetBit(num: number): number
```

Gets the position of the least significant bit that is set to 1.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Get Most Significant Set Bit

```typescript
function getMostSignificantSetBit(num: number): number
```

Gets the position of the most significant bit that is set to 1.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Absolute Value

```typescript
function absoluteValue(num: number): number
```

Computes the absolute value of a number using bitwise operations.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Add Without Plus

```typescript
function addWithoutPlus(a: number, b: number): number
```

Adds two numbers without using the addition operator.

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)

### Multiply by Power of Two

```typescript
function multiplyByPowerOfTwo(num: number, power: number): number
```

Multiplies a number by a power of two using bit shifting.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Divide by Power of Two

```typescript
function divideByPowerOfTwo(num: number, power: number): number
```

Divides a number by a power of two using bit shifting.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Have Opposite Signs

```typescript
function haveOppositeSigns(a: number, b: number): boolean
```

Checks if two numbers have opposite signs.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Swap Without Temp

```typescript
function swapWithoutTemp(a: number, b: number): [number, number]
```

Swaps two numbers without using a temporary variable.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)

### Reverse Bits

```typescript
function reverseBits(num: number): number
```

Reverses the bits of a 32-bit unsigned integer.

- **Time Complexity**: O(1)
- **Space Complexity**: O(1)