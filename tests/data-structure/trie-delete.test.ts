import { describe, test, expect } from "bun:test";
import Trie from "../../src/data-structure/trie";

describe("Trie DeleteHelper Method Testing", () => {
    test("Delete from empty trie", () => {
        const trie = new Trie();
        expect(trie.delete("test")).toBe(false);
    });
    
    test("Delete non-existent word", () => {
        const trie = new Trie();
        trie.insert("hello");
        expect(trie.delete("world")).toBe(false);
        expect(trie.search("hello")).toBe(true);
    });
    
    test("Delete word that is a prefix of another word", () => {
        const trie = new Trie();
        trie.insert("test");
        trie.insert("testing");
        
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        expect(trie.search("testing")).toBe(true);
    });
    
    test("Delete word that has a prefix which is also a word", () => {
        const trie = new Trie();
        trie.insert("test");
        trie.insert("testing");
        
        expect(trie.delete("testing")).toBe(true);
        expect(trie.search("testing")).toBe(false);
        expect(trie.search("test")).toBe(true);
    });
    
    test("Delete word with no shared prefixes", () => {
        const trie = new Trie();
        trie.insert("test");
        trie.insert("hello");
        
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        expect(trie.search("hello")).toBe(true);
    });
    
    test("Delete the only word in the trie", () => {
        const trie = new Trie();
        trie.insert("test");
        
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        expect(trie.getAllWords()).toEqual([]);
    });
    
    test("Delete empty string", () => {
        const trie = new Trie();
        trie.insert("");
        
        expect(trie.delete("")).toBe(true);
        expect(trie.search("")).toBe(false);
    });
    
    test("Delete with complex branching", () => {
        const trie = new Trie();
        
        // Create a complex structure
        trie.insert("a");
        trie.insert("ab");
        trie.insert("abc");
        trie.insert("abcd");
        trie.insert("abce");
        trie.insert("abd");
        
        // Delete a leaf node
        expect(trie.delete("abcd")).toBe(true);
        expect(trie.search("abcd")).toBe(false);
        expect(trie.search("abc")).toBe(true);
        expect(trie.search("abce")).toBe(true);
        
        // Delete a node with one child
        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.search("abce")).toBe(true);
        
        // Delete a node with multiple children
        expect(trie.delete("ab")).toBe(true);
        expect(trie.search("ab")).toBe(false);
        expect(trie.search("abce")).toBe(true);
        expect(trie.search("abd")).toBe(true);
        
        // Delete a node that is a prefix of other words
        expect(trie.delete("a")).toBe(true);
        expect(trie.search("a")).toBe(false);
        expect(trie.search("abce")).toBe(true);
        expect(trie.search("abd")).toBe(true);
        
        // Delete remaining words
        expect(trie.delete("abce")).toBe(true);
        expect(trie.delete("abd")).toBe(true);
        expect(trie.getAllWords()).toEqual([]);
    });
    
    test("Delete with all possible branch conditions", () => {
        const trie = new Trie();
        
        // 1. Insert words
        trie.insert("a");
        trie.insert("ab");
        trie.insert("abc");
        trie.insert("abcd");
        trie.insert("abcde");
        
        // 2. Delete a word that is a prefix of other words
        expect(trie.delete("a")).toBe(true);
        expect(trie.search("a")).toBe(false);
        expect(trie.search("ab")).toBe(true);
        
        // 3. Delete a word from the middle of the chain
        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.search("ab")).toBe(true);
        expect(trie.search("abcd")).toBe(true);
        
        // 4. Delete a leaf node
        expect(trie.delete("abcde")).toBe(true);
        expect(trie.search("abcde")).toBe(false);
        expect(trie.search("abcd")).toBe(true);
        
        // 5. Delete another word
        expect(trie.delete("abcd")).toBe(true);
        expect(trie.search("abcd")).toBe(false);
        expect(trie.search("ab")).toBe(true);
        
        // 6. Delete the last word
        expect(trie.delete("ab")).toBe(true);
        expect(trie.search("ab")).toBe(false);
        expect(trie.getAllWords()).toEqual([]);
    });
    
    test("Delete with shouldDeleteChild branch coverage", () => {
        const trie = new Trie();
        
        // Create a structure where shouldDeleteChild is true
        trie.insert("abc");
        
        // Delete the word - should delete all nodes
        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.getAllWords()).toEqual([]);
        
        // Create a structure where shouldDeleteChild is false for some nodes
        trie.insert("abc");
        trie.insert("abd");
        
        // Delete one word - should not delete shared prefix
        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.search("abd")).toBe(true);
        
        // Delete the other word - should delete all nodes
        expect(trie.delete("abd")).toBe(true);
        expect(trie.search("abd")).toBe(false);
        expect(trie.getAllWords()).toEqual([]);
    });
    
    test("Delete with isEndOfWord branch coverage", () => {
        const trie = new Trie();
        
        // Create a structure where a node is both an end of word and has children
        trie.insert("ab");
        trie.insert("abc");
        
        // Delete the shorter word - node should remain because it has children
        expect(trie.delete("ab")).toBe(true);
        expect(trie.search("ab")).toBe(false);
        expect(trie.search("abc")).toBe(true);
        
        // Delete the longer word - all nodes should be deleted
        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.getAllWords()).toEqual([]);
    });
});