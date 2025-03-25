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
const index = slotify.binarySearch.binarySearch([1, 2, 3, 4, 5], 3);

// Use bitwise operations
const result = slotify.bitwise.setBit(42, 3);

// Use sorting algorithms
const sortedArray = slotify.sorting.quick([5, 3, 8, 4, 2]);
```

### Import Specific Modules

```typescript
import * as bitwise from '@slotify/dsa/bitwise';
import * as binarySearch from '@slotify/dsa/binary-search';
import * as sorting from '@slotify/dsa/sorting';

// Use binary search directly
const index = binarySearch.binarySearch([1, 2, 3, 4, 5], 3);

// Use bitwise operations directly
const result = bitwise.setBit(42, 3);

// Use sorting algorithms directly
const sortedArray = sorting.quick([5, 3, 8, 4, 2]);
```

### Import Specific Functions

```typescript
import { setBit, isBitSet } from '@slotify/dsa/bitwise';
import { binarySearch, lowerBound } from '@slotify/dsa/binary-search';
import { quick, merge, bubble } from '@slotify/dsa/sorting';

// Use imported functions directly
const index = binarySearch([1, 2, 3, 4, 5], 3);
const result = setBit(42, 3);
const sortedArray = quick([5, 3, 8, 4, 2]);
```

## Documentation

For detailed documentation of each technique, please refer to the docs directory:

- [Trie Documentation](docs/trie.md)
- [Heap Documentation](docs/heap.md)
- [Graph Documentation](docs/graph.md)
- [Max Heap Documentation](docs/max-heap.md)
- [Min Heap Documentation](docs/min-heap.md)
- [AVL Tree Documentation](docs/avl-tree.md)
- [LRU Cache Documentation](docs/lru-cache.md)
- [Disjoint Set Documentation](docs/disjoint-set.md)
- [Sorting Algorithms Documentation](docs/sorting.md)
- [Bitwise Operations Documentation](docs/bitwise.md)
- [Binary Search Documentation](docs/binary-search.md)
- [Priority Queue Documentation](docs/priority-queue.md)
- [Binary Search Tree Documentation](docs/binary-search-tree.md)

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
