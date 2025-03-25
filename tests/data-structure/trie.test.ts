import { Trie } from "../src/data-structure";
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
});