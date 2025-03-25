# @slotify/dsa Documentation

Welcome to the documentation for @slotify/dsa, a TypeScript library providing efficient implementations of common data structures and algorithms.

## Table of Contents

- [Getting Started](./getting-started.md)
- [Binary Search](./binary-search.md)
- [Bitwise Operations](./bitwise.md)

## Overview

@slotify/dsa is designed to provide developers with optimized implementations of fundamental algorithms and data structures. The library is written in TypeScript, offering type safety and excellent IDE integration.

## Key Features

- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Performance**: Optimized implementations of algorithms and data structures
- **Modularity**: Import only what you need to keep your bundle size small
- **Documentation**: Comprehensive documentation with examples
- **Testing**: Thoroughly tested with high test coverage

## Installation

```bash
# Using npm
npm install @slotify/dsa

# Using yarn
yarn add @slotify/dsa

# Using bun
bun add @slotify/dsa
```

## Quick Start

```typescript
// Import the entire library
import * as slotify from '@slotify/dsa';

// Use binary search
const array = [1, 2, 3, 4, 5];
const index = slotify.binarySearch.standardBinarySearch(array, 3);
console.log(`Found at index: ${index}`);

// Use bitwise operations
const num = 42;
const result = slotify.bitwise.setBit(num, 3);
console.log(`Result: ${result}`);
```

For more detailed information on how to use the library, check out the [Getting Started](./getting-started.md) guide.

## Available Modules

### Binary Search

The binary search module provides various implementations of binary search algorithms for sorted arrays.

[Learn more about Binary Search](./binary-search.md)

### Bitwise Operations

The bitwise module offers efficient bit manipulation functions for various low-level operations.

[Learn more about Bitwise Operations](./bitwise.md)

## Examples

Check out the `examples` directory in the repository for practical examples of how to use the library:

- Basic usage examples
- Binary search examples
- Bitwise operations examples

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.