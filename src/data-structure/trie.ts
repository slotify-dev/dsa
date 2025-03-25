/**
 * Represents a node in a trie data structure.
 */
class TrieNode {
  isEndOfWord: boolean = false;
  children: Map<string, TrieNode> = new Map();
}

/**
 * Trie data structure implementation.
 * A tree-like data structure used to store a dynamic set of strings,
 * typically used for efficient prefix searches.
 */
export default class Trie {
  private root: TrieNode = new TrieNode();

  /**
   * Inserts a word into the trie.
   * @param word The word to insert
   */
  insert(word: string): void {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

  /**
   * Searches for a word in the trie.
   * @param word The word to search for
   * @returns True if the word exists in the trie, false otherwise
   */
  search(word: string): boolean {
    const node = this.searchNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Checks if there is any word in the trie that starts with the given prefix.
   * @param prefix The prefix to search for
   * @returns True if any word starts with the prefix, false otherwise
   */
  startsWith(prefix: string): boolean {
    return this.searchNode(prefix) !== null;
  }

  /**
   * Helper method to find a node that represents a string.
   * @param str The string to search for
   * @returns The node representing the string, or null if not found
   */
  private searchNode(str: string): TrieNode | null {
    let current = this.root;

    for (const char of str) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }

    return current;
  }

  /**
   * Deletes a word from the trie.
   * @param word The word to delete
   * @returns True if the word was deleted, false if it wasn't found
   */
  delete(word: string): boolean {
    if (!this.search(word)) {
      return false;
    }

    this.deleteHelper(this.root, word, 0);
    return true;
  }

  /**
   * Helper method for deleting a word from the trie.
   * @param current The current node in the recursion
   * @param word The word to delete
   * @param index The current character index in the word
   * @returns True if the current node can be deleted, false otherwise
   */
  private deleteHelper(current: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      current.isEndOfWord = false;
      return current.children.size === 0;
    }

    const char = word[index];
    if (!current.children.has(char)) {
      return false;
    }

    const childNode = current.children.get(char)!;
    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);

    if (shouldDeleteChild) {
      current.children.delete(char);
      return !current.isEndOfWord && current.children.size === 0;
    }

    return false;
  }

  /**
   * Gets all words stored in the trie.
   * @returns An array of all words in the trie
   */
  getAllWords(): string[] {
    const words: string[] = [];
    this.collectWords(this.root, '', words);
    return words;
  }

  /**
   * Recursively collects all words from the trie.
   * @param node The current node in the recursion
   * @param prefix The prefix accumulated so far
   * @param words The array to store collected words
   */
  private collectWords(node: TrieNode, prefix: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, prefix + char, words);
    }
  }
}