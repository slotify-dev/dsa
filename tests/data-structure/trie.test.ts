import { Trie } from "../../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("Trie", () => {
    test("Empty trie operations", () => {
        const trie = new Trie();

        expect(trie.search("hello")).toBe(false);
        expect(trie.startsWith("h")).toBe(false);
        expect(trie.getAllWords()).toEqual([]);
    });

    test("Insert and search operations", () => {
        const trie = new Trie();

        trie.insert("hello");
        trie.insert("world");
        trie.insert("hi");

        expect(trie.search("hello")).toBe(true);
        expect(trie.search("world")).toBe(true);
        expect(trie.search("hi")).toBe(true);
        expect(trie.search("h")).toBe(false);
        expect(trie.search("hell")).toBe(false);
        expect(trie.search("helloo")).toBe(false);
        expect(trie.search("wo")).toBe(false);
    });

    test("StartsWith operations", () => {
        const trie = new Trie();

        trie.insert("hello");
        trie.insert("world");
        trie.insert("hi");

        expect(trie.startsWith("h")).toBe(true);
        expect(trie.startsWith("he")).toBe(true);
        expect(trie.startsWith("hel")).toBe(true);
        expect(trie.startsWith("hell")).toBe(true);
        expect(trie.startsWith("hello")).toBe(true);
        expect(trie.startsWith("w")).toBe(true);
        expect(trie.startsWith("wo")).toBe(true);
        expect(trie.startsWith("wor")).toBe(true);
        expect(trie.startsWith("worl")).toBe(true);
        expect(trie.startsWith("world")).toBe(true);
        expect(trie.startsWith("a")).toBe(false);
        expect(trie.startsWith("helloworld")).toBe(false);
    });

    test("Delete operations", () => {
        const trie = new Trie();

        trie.insert("hello");
        trie.insert("world");
        trie.insert("hi");

        expect(trie.search("hello")).toBe(true);

        // Delete a word
        expect(trie.delete("hello")).toBe(true);
        expect(trie.search("hello")).toBe(false);
        expect(trie.search("world")).toBe(true);
        expect(trie.search("hi")).toBe(true);

        // Prefix of deleted word should still work for other words
        expect(trie.startsWith("h")).toBe(true);

        // Delete another word
        expect(trie.delete("hi")).toBe(true);
        expect(trie.search("hi")).toBe(false);
        expect(trie.search("world")).toBe(true);

        // Delete the last word
        expect(trie.delete("world")).toBe(true);
        expect(trie.search("world")).toBe(false);

        // Trie should be empty
        expect(trie.getAllWords()).toEqual([]);
    });

    test("Delete non-existent word", () => {
        const trie = new Trie();

        trie.insert("hello");

        // Try to delete a word that doesn't exist
        expect(trie.delete("world")).toBe(false);
        expect(trie.search("hello")).toBe(true);

        // Try to delete a prefix of an existing word
        expect(trie.delete("hel")).toBe(false);
        expect(trie.search("hello")).toBe(true);
    });

    test("Delete with shared prefixes", () => {
        const trie = new Trie();

        trie.insert("hello");
        trie.insert("hell");
        trie.insert("helicopter");

        // Delete a word that shares prefix with others
        expect(trie.delete("hell")).toBe(true);
        expect(trie.search("hell")).toBe(false);
        expect(trie.search("hello")).toBe(true);
        expect(trie.search("helicopter")).toBe(true);

        // Delete another word with shared prefix
        expect(trie.delete("hello")).toBe(true);
        expect(trie.search("hello")).toBe(false);
        expect(trie.search("helicopter")).toBe(true);
    });

    test("GetAllWords operation", () => {
        const trie = new Trie();

        trie.insert("hello");
        trie.insert("world");
        trie.insert("hi");
        trie.insert("hey");
        trie.insert("goodbye");

        const words = trie.getAllWords();
        expect(words.length).toBe(5);
        expect(words).toContain("hello");
        expect(words).toContain("world");
        expect(words).toContain("hi");
        expect(words).toContain("hey");
        expect(words).toContain("goodbye");

        // Delete some words and check again
        trie.delete("hello");
        trie.delete("hi");

        const updatedWords = trie.getAllWords();
        expect(updatedWords.length).toBe(3);
        expect(updatedWords).toContain("world");
        expect(updatedWords).toContain("hey");
        expect(updatedWords).toContain("goodbye");
    });

    test("Insert empty string", () => {
        const trie = new Trie();

        trie.insert("");

        expect(trie.search("")).toBe(true);
        expect(trie.getAllWords()).toContain("");

        // Delete empty string
        expect(trie.delete("")).toBe(true);
        expect(trie.search("")).toBe(false);
    });

    test("Insert and search with case sensitivity", () => {
        const trie = new Trie();

        trie.insert("Hello");
        trie.insert("WORLD");

        expect(trie.search("Hello")).toBe(true);
        expect(trie.search("hello")).toBe(false);
        expect(trie.search("WORLD")).toBe(true);
        expect(trie.search("world")).toBe(false);
    });

    test("Complex trie operations", () => {
        const trie = new Trie();

        // Insert a large number of words
        const words = [
            "apple", "application", "apply", "apt",
            "banana", "band", "bandana", "bar", "bare", "bark",
            "car", "card", "care", "careful", "carrot"
        ];

        words.forEach(word => trie.insert(word));

        // Check all words are in the trie
        words.forEach(word => {
            expect(trie.search(word)).toBe(true);
        });

        // Check prefixes
        expect(trie.startsWith("app")).toBe(true);
        expect(trie.startsWith("ba")).toBe(true);
        expect(trie.startsWith("car")).toBe(true);

        // Delete some words
        expect(trie.delete("apple")).toBe(true);
        expect(trie.delete("band")).toBe(true);
        expect(trie.delete("carrot")).toBe(true);

        // Verify deleted words are gone
        expect(trie.search("apple")).toBe(false);
        expect(trie.search("band")).toBe(false);
        expect(trie.search("carrot")).toBe(false);

        // Verify other words still exist
        expect(trie.search("application")).toBe(true);
        expect(trie.search("bandana")).toBe(true);
        expect(trie.search("careful")).toBe(true);

        // Get all remaining words
        const remainingWords = trie.getAllWords();
        expect(remainingWords.length).toBe(words.length - 3);
        expect(remainingWords).not.toContain("apple");
        expect(remainingWords).not.toContain("band");
        expect(remainingWords).not.toContain("carrot");
    });

    test("Trie with special characters", () => {
        const trie = new Trie();

        trie.insert("hello!");
        trie.insert("hello?");
        trie.insert("hello-world");
        trie.insert("123");
        trie.insert("hello_world");

        expect(trie.search("hello!")).toBe(true);
        expect(trie.search("hello?")).toBe(true);
        expect(trie.search("hello-world")).toBe(true);
        expect(trie.search("123")).toBe(true);
        expect(trie.search("hello_world")).toBe(true);

        expect(trie.startsWith("hello")).toBe(true);
        expect(trie.startsWith("123")).toBe(true);

        // Delete and verify
        expect(trie.delete("hello!")).toBe(true);
        expect(trie.search("hello!")).toBe(false);
        expect(trie.search("hello?")).toBe(true);
    });

    // Additional tests to improve coverage
    test("Delete operation with complex branching", () => {
        const trie = new Trie();

        // Create a complex structure with multiple branches
        trie.insert("test");
        trie.insert("team");
        trie.insert("tea");
        trie.insert("teapot");
        trie.insert("tear");

        // Delete a leaf node
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        expect(trie.search("team")).toBe(true);
        expect(trie.search("tea")).toBe(true);
        expect(trie.search("teapot")).toBe(true);
        expect(trie.search("tear")).toBe(true);

        // Delete a node with children
        expect(trie.delete("tea")).toBe(true);
        expect(trie.search("tea")).toBe(false);
        expect(trie.search("team")).toBe(true);
        expect(trie.search("teapot")).toBe(true);
        expect(trie.search("tear")).toBe(true);

        // Delete a node that would make a branch empty
        expect(trie.delete("teapot")).toBe(true);
        expect(trie.search("teapot")).toBe(false);
        expect(trie.search("team")).toBe(true);
        expect(trie.search("tear")).toBe(true);
    });

    test("Delete operation with nested branches", () => {
        const trie = new Trie();

        // Create a structure where deleting a word should not affect others
        trie.insert("a");
        trie.insert("ab");
        trie.insert("abc");
        trie.insert("abcd");

        // Delete middle words
        expect(trie.delete("ab")).toBe(true);
        expect(trie.search("a")).toBe(true);
        expect(trie.search("ab")).toBe(false);
        expect(trie.search("abc")).toBe(true);
        expect(trie.search("abcd")).toBe(true);

        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("a")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.search("abcd")).toBe(true);
    });

    test("Delete operation that should clean up the trie", () => {
        const trie = new Trie();

        // Create a linear structure
        trie.insert("a");
        trie.insert("ab");
        trie.insert("abc");
        trie.insert("abcd");

        // Delete from the end
        expect(trie.delete("abcd")).toBe(true);
        expect(trie.search("abcd")).toBe(false);
        expect(trie.search("abc")).toBe(true);

        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.search("ab")).toBe(true);

        expect(trie.delete("ab")).toBe(true);
        expect(trie.search("ab")).toBe(false);
        expect(trie.search("a")).toBe(true);

        expect(trie.delete("a")).toBe(true);
        expect(trie.search("a")).toBe(false);
        expect(trie.getAllWords()).toEqual([]);
    });

    test("CollectWords with empty trie", () => {
        const trie = new Trie();
        expect(trie.getAllWords()).toEqual([]);
    });

    test("CollectWords with multiple end-of-word markers", () => {
        const trie = new Trie();
        
        // Insert words where one is a prefix of another
        trie.insert("a");
        trie.insert("an");
        trie.insert("ant");
        trie.insert("antenna");
        
        const words = trie.getAllWords();
        expect(words.length).toBe(4);
        expect(words).toContain("a");
        expect(words).toContain("an");
        expect(words).toContain("ant");
        expect(words).toContain("antenna");
    });

    test("Delete operation with complex node removal", () => {
        const trie = new Trie();
        
        // Create a structure with multiple branches
        trie.insert("car");
        trie.insert("cart");
        trie.insert("carpet");
        trie.insert("carpool");
        
        // Delete a word that should not affect the structure much
        expect(trie.delete("car")).toBe(true);
        expect(trie.search("car")).toBe(false);
        expect(trie.search("cart")).toBe(true);
        expect(trie.search("carpet")).toBe(true);
        expect(trie.search("carpool")).toBe(true);
        
        // Delete a word that should remove a branch
        expect(trie.delete("carpet")).toBe(true);
        expect(trie.search("carpet")).toBe(false);
        expect(trie.search("cart")).toBe(true);
        expect(trie.search("carpool")).toBe(true);
        
        // Delete all remaining words
        expect(trie.delete("cart")).toBe(true);
        expect(trie.delete("carpool")).toBe(true);
        
        // Trie should be empty
        expect(trie.getAllWords()).toEqual([]);
        expect(trie.search("c")).toBe(false);
        expect(trie.startsWith("c")).toBe(false);
    });

    test("Delete operation with deep nested structure", () => {
        const trie = new Trie();
        
        // Create a deep structure
        trie.insert("a");
        trie.insert("ab");
        trie.insert("abc");
        trie.insert("abcd");
        trie.insert("abcde");
        
        // Delete from the middle
        expect(trie.delete("abc")).toBe(true);
        
        // Check that other words are still intact
        expect(trie.search("a")).toBe(true);
        expect(trie.search("ab")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.search("abcd")).toBe(true);
        expect(trie.search("abcde")).toBe(true);
        
        // Delete the longest word
        expect(trie.delete("abcde")).toBe(true);
        
        // Check remaining words
        expect(trie.search("a")).toBe(true);
        expect(trie.search("ab")).toBe(true);
        expect(trie.search("abcd")).toBe(true);
        expect(trie.search("abcde")).toBe(false);
        
        // Get all words
        const words = trie.getAllWords();
        expect(words.length).toBe(3);
        expect(words).toContain("a");
        expect(words).toContain("ab");
        expect(words).toContain("abcd");
    });

    test("Delete operation with branch cleanup", () => {
        const trie = new Trie();
        
        // Create a structure with multiple branches
        trie.insert("test");
        trie.insert("testing");
        trie.insert("tester");
        
        // Delete the longest word
        expect(trie.delete("testing")).toBe(true);
        
        // Check remaining words
        expect(trie.search("test")).toBe(true);
        expect(trie.search("tester")).toBe(true);
        expect(trie.search("testing")).toBe(false);
        
        // Delete another word
        expect(trie.delete("tester")).toBe(true);
        
        // Check remaining word
        expect(trie.search("test")).toBe(true);
        expect(trie.search("tester")).toBe(false);
        
        // Delete the last word
        expect(trie.delete("test")).toBe(true);
        
        // Trie should be empty
        expect(trie.getAllWords()).toEqual([]);
    });

    test("Delete operation with non-existent branches", () => {
        const trie = new Trie();
        
        // Insert a word
        trie.insert("hello");
        
        // Try to delete a word that doesn't exist but shares a prefix
        expect(trie.delete("help")).toBe(false);
        
        // The original word should still be there
        expect(trie.search("hello")).toBe(true);
        
        // Try to delete a completely different word
        expect(trie.delete("world")).toBe(false);
        
        // The original word should still be there
        expect(trie.search("hello")).toBe(true);
    });
});