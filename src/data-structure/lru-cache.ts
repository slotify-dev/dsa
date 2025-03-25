class DoublyLinkedListNode<K, V> {
  key: K;
  value: V;
  prev: DoublyLinkedListNode<K, V> | null = null;
  next: DoublyLinkedListNode<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export default class LRUCache<K, V> {
  private capacity: number;
  private head: DoublyLinkedListNode<K, V> | null = null;
  private tail: DoublyLinkedListNode<K, V> | null = null;
  private cache: Map<K, DoublyLinkedListNode<K, V>> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (!node) return undefined;

    this.moveToFront(node);
    return node.value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToFront(node);
      return;
    }

    // If at capacity, remove least recently used item (tail)
    if (this.cache.size >= this.capacity) {
      this.removeLRU();
    }

    // Add new node to front
    const newNode = new DoublyLinkedListNode(key, value);
    this.cache.set(key, newNode);
    this.addToFront(newNode);
  }

  private moveToFront(node: DoublyLinkedListNode<K, V>): void {
    if (node === this.head) return; // Already at front

    // Remove from current position
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (node === this.tail) this.tail = node.prev;

    // Add to front
    this.addToFront(node);
  }

  private addToFront(node: DoublyLinkedListNode<K, V>): void {
    node.next = this.head;
    node.prev = null;

    if (this.head) this.head.prev = node;
    this.head = node;

    if (!this.tail) this.tail = node;
  }

  private removeLRU(): void {
    if (!this.tail) return;

    // Remove from cache
    this.cache.delete(this.tail.key);

    // Update tail
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null; // If tail is null, list is empty
  }

  clear(): void {
    this.cache.clear();
    this.head = null;
    this.tail = null;
  }

  size(): number {
    return this.cache.size;
  }

  keys(): K[] {
    return Array.from(this.cache.keys());
  }

  values(): V[] {
    const values: V[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}