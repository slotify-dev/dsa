# @slotify/dsa Examples

This directory contains examples demonstrating how to use the @slotify/dsa library.

## Available Examples

1. **basic-usage.ts** - Basic usage of the library, importing and using various functions
2. **binary-search-examples.ts** - Examples of all binary search algorithms
3. **bitwise-examples.ts** - Examples of all bitwise operations
4. **run-all-examples.ts** - Script to run all examples at once

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