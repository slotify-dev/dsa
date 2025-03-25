import Heap from './heap';

export default class PriorityQueue<T> {
  private insertionCount: number = 0;
  private heap: Heap<{ value: T; priority: number; insertionOrder: number }>;

  constructor(isMinPriority: boolean = true) {
    this.heap = new Heap<{ value: T; priority: number; insertionOrder: number }>((a, b) => {
      const priorityComparison = isMinPriority ? a.priority - b.priority : b.priority - a.priority;
      return priorityComparison !== 0 ? priorityComparison : a.insertionOrder - b.insertionOrder;
    });
  }

  enqueue(value: T, priority: number): void {
    this.heap.insert({ value, priority, insertionOrder: this.insertionCount++ });
  }

  dequeue(): T | undefined {
    const item = this.heap.extract();
    return item?.value;
  }

  peek(): T | undefined {
    const item = this.heap.peek();
    return item?.value;
  }

  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  size(): number {
    return this.heap.size();
  }
}