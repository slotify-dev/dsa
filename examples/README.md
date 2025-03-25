# @slotify/dsa Examples

This directory contains examples demonstrating how to use the @slotify/dsa library.

## Available Examples

1. **basic-usage.ts** - Basic usage of the library, importing and using various functions
2. **binary-search-examples.ts** - Examples of all binary search algorithms
3. **bitwise-examples.ts** - Examples of all bitwise operations
4. **run-all-examples.ts** - Script to run all examples at once

## Import Styles Demonstrated

The examples showcase different ways to import and use the library:

### Import the entire library (basic-usage.ts)

```typescript
import * as slotify from '../dist/index.js';

// Use with namespace
const index = slotify.binarySearch.standardBinarySearch(array, target);
```

### Import specific modules (binary-search-examples.ts, bitwise-examples.ts)

```typescript
import * as bitwise from '../dist/bitwise/index.js';
import * as binarySearch from '../dist/binary-search/index.js';

// Use directly
const index = binarySearch.standardBinarySearch(array, target);
const result = bitwise.setBit(num, position);
```

### Import specific functions (not shown, but possible)

```typescript
import {
  lowerBound,
  standardBinarySearch,
} from '../dist/binary-search/index.js';
import { setBit, isBitSet } from '../dist/bitwise/index.js';

// Use imported functions directly
const index = standardBinarySearch(array, target);
const result = setBit(num, position);
```

## Running the Examples

Make sure you have built the library first:

```bash
# From the project root
bun run build
```

Then you can run individual examples:

```bash
# Run a specific example
bun run examples/basic-usage.ts

# Run all examples
bun run examples/run-all-examples.ts
```

## Expected Output

Each example will print its results to the console, allowing you to verify that the library functions are working correctly.

## Adding New Examples

Feel free to add more examples to demonstrate other aspects of the library. Follow the pattern of the existing examples:

1. Import the necessary functions from the library
2. Create sample data to work with
3. Call the functions and log the results
4. Add your new example to the `run-all-examples.ts` script
