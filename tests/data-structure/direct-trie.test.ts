import { describe, test, expect } from "bun:test";
import Trie from "../../src/data-structure/trie";

describe("Trie Direct Testing", () => {
    test("Direct test for insert method", () => {
        const trie = new Trie();
        
        // Insert empty string
        trie.insert("");
        expect(trie.search("")).toBe(true);
        
        // Insert a word
        trie.insert("test");
        expect(trie.search("test")).toBe(true);
        
        // Insert a word with shared prefix
        trie.insert("testing");
        expect(trie.search("testing")).toBe(true);
        expect(trie.search("test")).toBe(true);
    });
    
    test("Direct test for search method", () => {
        const trie = new Trie();
        
        // Search in empty trie
        expect(trie.search("test")).toBe(false);
        
        // Insert and search
        trie.insert("test");
        expect(trie.search("test")).toBe(true);
        expect(trie.search("tes")).toBe(false);
        expect(trie.search("testing")).toBe(false);
    });
    
    test("Direct test for startsWith method", () => {
        const trie = new Trie();
        
        // StartsWith in empty trie
        expect(trie.startsWith("t")).toBe(false);
        
        // Insert and check prefixes
        trie.insert("test");
        expect(trie.startsWith("")).toBe(true);
        expect(trie.startsWith("t")).toBe(true);
        expect(trie.startsWith("te")).toBe(true);
        expect(trie.startsWith("tes")).toBe(true);
        expect(trie.startsWith("test")).toBe(true);
        expect(trie.startsWith("testa")).toBe(false);
    });
    
    test("Direct test for searchNode method", () => {
        const trie = new Trie();
        
        // SearchNode in empty trie
        expect(trie.search("test")).toBe(false);
        expect(trie.startsWith("t")).toBe(false);
        
        // Insert and search nodes
        trie.insert("test");
        expect(trie.search("test")).toBe(true);
        expect(trie.startsWith("t")).toBe(true);
        expect(trie.startsWith("te")).toBe(true);
        
        // Search for non-existent nodes
        expect(trie.search("testing")).toBe(false);
        expect(trie.startsWith("a")).toBe(false);
    });
    
    test("Direct test for delete method", () => {
        const trie = new Trie();
        
        // Delete from empty trie
        expect(trie.delete("test")).toBe(false);
        
        // Insert and delete
        trie.insert("test");
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        
        // Delete non-existent word
        expect(trie.delete("testing")).toBe(false);
    });
    
    test("Direct test for deleteHelper method - all branches", () => {
        const trie = new Trie();
        
        // Branch 1: Delete a word that doesn't exist
        expect(trie.delete("test")).toBe(false);
        
        // Branch 2: Delete a leaf node
        trie.insert("test");
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        
        // Branch 3: Delete a node with children
        trie.insert("test");
        trie.insert("testing");
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        expect(trie.search("testing")).toBe(true);
        
        // Branch 4: Delete a node that would make a branch empty
        expect(trie.delete("testing")).toBe(true);
        expect(trie.search("testing")).toBe(false);
        
        // Branch 5: Complex deletion with shared prefixes
        trie.insert("a");
        trie.insert("ab");
        trie.insert("abc");
        trie.insert("abcd");
        
        // Delete middle node
        expect(trie.delete("abc")).toBe(true);
        expect(trie.search("abc")).toBe(false);
        expect(trie.search("ab")).toBe(true);
        expect(trie.search("abcd")).toBe(true);
        
        // Delete leaf node
        expect(trie.delete("abcd")).toBe(true);
        expect(trie.search("abcd")).toBe(false);
        
        // Delete remaining nodes
        expect(trie.delete("ab")).toBe(true);
        expect(trie.delete("a")).toBe(true);
        expect(trie.getAllWords()).toEqual([]);
    });
    
    test("Direct test for getAllWords method", () => {
        const trie = new Trie();
        
        // GetAllWords from empty trie
        expect(trie.getAllWords()).toEqual([]);
        
        // Insert and get all words
        trie.insert("test");
        trie.insert("testing");
        trie.insert("team");
        
        const words = trie.getAllWords();
        expect(words.length).toBe(3);
        expect(words).toContain("test");
        expect(words).toContain("testing");
        expect(words).toContain("team");
    });
    
    test("Direct test for collectWords method", () => {
        const trie = new Trie();
        
        // CollectWords from empty trie
        expect(trie.getAllWords()).toEqual([]);
        
        // Insert and collect words
        trie.insert("test");
        trie.insert("testing");
        trie.insert("team");
        
        const words = trie.getAllWords();
        expect(words.length).toBe(3);
        expect(words).toContain("test");
        expect(words).toContain("testing");
        expect(words).toContain("team");
        
        // Delete a word and collect again
        trie.delete("test");
        const updatedWords = trie.getAllWords();
        expect(updatedWords.length).toBe(2);
        expect(updatedWords).toContain("testing");
        expect(updatedWords).toContain("team");
    });
    
    test("Comprehensive test for all Trie methods", () => {
        const trie = new Trie();
        
        // 1. Insert words
        trie.insert("apple");
        trie.insert("application");
        trie.insert("apply");
        trie.insert("banana");
        trie.insert("band");
        
        // 2. Check search
        expect(trie.search("apple")).toBe(true);
        expect(trie.search("application")).toBe(true);
        expect(trie.search("apply")).toBe(true);
        expect(trie.search("banana")).toBe(true);
        expect(trie.search("band")).toBe(true);
        expect(trie.search("app")).toBe(false);
        expect(trie.search("ban")).toBe(false);
        
        // 3. Check startsWith
        expect(trie.startsWith("a")).toBe(true);
        expect(trie.startsWith("ap")).toBe(true);
        expect(trie.startsWith("app")).toBe(true);
        expect(trie.startsWith("appl")).toBe(true);
        expect(trie.startsWith("apple")).toBe(true);
        expect(trie.startsWith("appli")).toBe(true);
        expect(trie.startsWith("applic")).toBe(true);
        expect(trie.startsWith("applica")).toBe(true);
        expect(trie.startsWith("applicat")).toBe(true);
        expect(trie.startsWith("applicati")).toBe(true);
        expect(trie.startsWith("applicatio")).toBe(true);
        expect(trie.startsWith("application")).toBe(true);
        expect(trie.startsWith("apply")).toBe(true);
        expect(trie.startsWith("b")).toBe(true);
        expect(trie.startsWith("ba")).toBe(true);
        expect(trie.startsWith("ban")).toBe(true);
        expect(trie.startsWith("bana")).toBe(true);
        expect(trie.startsWith("banan")).toBe(true);
        expect(trie.startsWith("banana")).toBe(true);
        expect(trie.startsWith("band")).toBe(true);
        expect(trie.startsWith("c")).toBe(false);
        
        // 4. Get all words
        const words = trie.getAllWords();
        expect(words.length).toBe(5);
        expect(words).toContain("apple");
        expect(words).toContain("application");
        expect(words).toContain("apply");
        expect(words).toContain("banana");
        expect(words).toContain("band");
        
        // 5. Delete words
        expect(trie.delete("apple")).toBe(true);
        expect(trie.search("apple")).toBe(false);
        expect(trie.search("application")).toBe(true);
        expect(trie.search("apply")).toBe(true);
        
        expect(trie.delete("band")).toBe(true);
        expect(trie.search("band")).toBe(false);
        expect(trie.search("banana")).toBe(true);
        
        // 6. Check remaining words
        const remainingWords = trie.getAllWords();
        expect(remainingWords.length).toBe(3);
        expect(remainingWords).toContain("application");
        expect(remainingWords).toContain("apply");
        expect(remainingWords).toContain("banana");
        
        // 7. Delete all remaining words
        expect(trie.delete("application")).toBe(true);
        expect(trie.delete("apply")).toBe(true);
        expect(trie.delete("banana")).toBe(true);
        
        // 8. Check empty trie
        expect(trie.getAllWords()).toEqual([]);
    });
    
    test("Edge cases for deleteHelper", () => {
        const trie = new Trie();
        
        // Edge case 1: Delete empty string
        trie.insert("");
        expect(trie.delete("")).toBe(true);
        expect(trie.search("")).toBe(false);
        
        // Edge case 2: Delete with complex branching
        trie.insert("test");
        trie.insert("testing");
        trie.insert("testcase");
        trie.insert("testcases");
        
        // Delete a word that has a prefix which is also a word
        expect(trie.delete("test")).toBe(true);
        expect(trie.search("test")).toBe(false);
        expect(trie.search("testing")).toBe(true);
        expect(trie.search("testcase")).toBe(true);
        expect(trie.search("testcases")).toBe(true);
        
        // Delete a word that has a suffix which is also a word
        expect(trie.delete("testcase")).toBe(true);
        expect(trie.search("testcase")).toBe(false);
        expect(trie.search("testcases")).toBe(true);
        
        // Delete remaining words
        expect(trie.delete("testing")).toBe(true);
        expect(trie.delete("testcases")).toBe(true);
        expect(trie.getAllWords()).toEqual([]);
    });
});