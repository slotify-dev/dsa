# @slotify/dsa

A comprehensive collection of data structures and algorithms implemented in TypeScript.

## Overview

This library provides efficient, well-tested implementations of common data structures and algorithms to help developers build performant applications. Each implementation is thoroughly documented with time and space complexity analysis.

## Features

- **Type Safety**: Fully written in TypeScript with complete type definitions
- **Performance**: Optimized implementations with documented time and space complexity
- **Comprehensive**: Covers a wide range of algorithms and data structures
- **Well-Documented**: Detailed documentation with examples and use cases
- **Modular**: Import only what you need to keep your bundle size small

## Installation

```bash
# Using npm
npm install @slotify/dsa

# Using yarn
yarn add @slotify/dsa

# Using pnpm
pnpm add @slotify/dsa

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
import * as bitwise from '@slotify/dsa/bitwise';
import * as binarySearch from '@slotify/dsa/binary-search';

// Use binary search directly
const index = binarySearch.standardBinarySearch([1, 2, 3, 4, 5], 3);

// Use bitwise operations directly
const result = bitwise.setBit(42, 3);
```

### Import Specific Functions

```typescript
import { setBit, isBitSet } from '@slotify/dsa/bitwise';
import { standardBinarySearch, lowerBound } from '@slotify/dsa/binary-search';

// Use imported functions directly
const index = standardBinarySearch([1, 2, 3, 4, 5], 3);
const result = setBit(42, 3);
```

## Available Techniques

The library currently includes the following techniques:

- [Binary Search](docs/binary-search.md): Efficient searching in sorted arrays
- [Bitwise Operations](docs/bitwise.md): Low-level bit manipulation functions

## Documentation

For detailed documentation of each technique, please refer to the docs directory:

- [Binary Search Documentation](docs/binary-search.md)
- [Bitwise Operations Documentation](docs/bitwise.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Sandip Patel - [sandip254@gmail.com](mailto:sandip254@gmail.com)
