# Trie

A trie, also called a prefix tree, is a tree-like data structure used to store a dynamic set of strings. Tries are particularly useful for implementing autocomplete and spell-checking features.

## Import Examples

There are several ways to import the Trie functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use Trie
const trie = new slotify.Trie();
```

### Import from data-structure module

```typescript
import * as dataStructure from '@slotify/dsa/data-structure';

// Use Trie directly
const trie = new dataStructure.Trie();
```

### Import specific class

```typescript
import { Trie } from '@slotify/dsa/trie';

// Use imported class directly
const trie = new Trie();
```

## Usage

```typescript
import { Trie } from '@slotify/dsa/trie';

// Create a new trie
const trie = new Trie();

// Insert words
trie.insert('hello');
trie.insert('world');
trie.insert('hi');
```

## API

### Constructor

```typescript
constructor();
```

Creates a new empty trie.

### Methods

#### `insert(word: string): void`

Inserts a word into the trie.

- `word`: The word to insert.

#### `search(word: string): boolean`

Searches for a word in the trie.

- `word`: The word to search for.
- Returns: `true` if the word is found, `false` otherwise.

#### `startsWith(prefix: string): boolean`

Checks if there is any word in the trie that starts with the given prefix.

- `prefix`: The prefix to check.
- Returns: `true` if there is any word with the given prefix, `false` otherwise.

#### `delete(word: string): boolean`

Deletes a word from the trie.

- `word`: The word to delete.
- Returns: `true` if the word was found and deleted, `false` otherwise.

#### `getAllWords(): string[]`

Returns an array of all words stored in the trie.

## Example

```typescript
import { Trie } from '@slotify/data-structure';

// Create a trie
const trie = new Trie();

// Insert words
trie.insert('hello');
trie.insert('world');
trie.insert('hi');
trie.insert('hey');
trie.insert('goodbye');

// Search for words
console.log(trie.search('hello')); // true
console.log(trie.search('hell')); // false
console.log(trie.search('helicopter')); // false

// Check prefixes
console.log(trie.startsWith('h')); // true
console.log(trie.startsWith('he')); // true
console.log(trie.startsWith('wor')); // true
console.log(trie.startsWith('z')); // false

// Delete a word
trie.delete('hello');
console.log(trie.search('hello')); // false
console.log(trie.startsWith('h')); // true (other words with 'h' still exist)

// Get all words
console.log(trie.getAllWords()); // ["world", "hi", "hey", "goodbye"]
```

## Time Complexity

- `insert(word)`: O(m) where m is the length of the word
- `search(word)`: O(m) where m is the length of the word
- `startsWith(prefix)`: O(m) where m is the length of the prefix
- `delete(word)`: O(m) where m is the length of the word
- `getAllWords()`: O(n) where n is the total number of characters across all words in the trie

## Space Complexity

- O(n) where n is the total number of characters across all words in the trie.

## Notes

- The trie is case-sensitive by default.
- Empty strings can be stored in the trie.
- The trie supports special characters and numbers.
