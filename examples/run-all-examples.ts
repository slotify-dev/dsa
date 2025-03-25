/**
 * Run all examples for @slotify/dsa
 * 
 * This script runs all the example files to verify the library works correctly.
 */

import { spawnSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const examples = [
  'basic-usage.ts',
  'binary-search-examples.ts',
  'bitwise-examples.ts'
];

console.log('=== Running all @slotify/dsa examples ===\n');

for (const example of examples) {
  console.log(`\n\nRunning example: ${example}`);
  console.log('='.repeat(50));
  
  const result = spawnSync('bun', ['run', join(__dirname, example)], {
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  
  if (result.error) {
    console.error(`Error running ${example}:`, result.error);
  }
  
  console.log('='.repeat(50));
}

console.log('\n=== All examples completed ===');