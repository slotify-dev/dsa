/**
 * Data Structures Collection
 * 
 * This module exports various data structures for different use cases:
 * 
 * 1. AVL Tree         - Self-balancing binary search tree with O(log n) operations
 * 2. Binary Search Tree - Basic tree with O(log n) average case operations
 * 3. Disjoint Set     - Union-find data structure for connected components
 * 4. Graph            - Structure for representing and traversing graph data
 * 5. Heap             - Abstract heap implementation
 * 6. Max Heap         - Priority queue with O(1) max element access
 * 7. Min Heap         - Priority queue with O(1) min element access
 * 8. Priority Queue   - Queue where elements have priority values
 * 9. LRU Cache        - Least Recently Used cache implementation
 * 10. Trie            - Efficient string storage and retrieval structure
 */

import Trie from './trie';
import Graph from './graph';
import Heap from './heap';
import MaxHeap from './max-heap';
import MinHeap from './min-heap';
import LRUCache from './lru-cache';
import AVLTree from './avl-tree';
import DisjointSet from './disjoint-set';
import PriorityQueue from './priority-queue';
import BinarySearchTree from './binary-search-tree';

export {
  Trie,
  Graph,
  Heap,
  MaxHeap,
  MinHeap,
  LRUCache,
  AVLTree,
  DisjointSet,
  PriorityQueue,
  BinarySearchTree,
};