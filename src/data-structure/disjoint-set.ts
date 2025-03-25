export default class DisjointSet {
  private rank: Map<number, number> = new Map();
  private size: Map<number, number> = new Map();
  private parent: Map<number, number> = new Map();

  // Create a new set with the given element
  makeSet(x: number): void {
    if (!this.parent.has(x)) {
      this.parent.set(x, x);
      this.rank.set(x, 0);
      this.size.set(x, 1);
    }
  }

  // Find the representative of the set that contains x
  // Uses path compression for efficiency
  find(x: number): number {
    if (!this.parent.has(x)) {
      this.makeSet(x);
    }

    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)!));
    }

    return this.parent.get(x)!;
  }

  // Union the sets that contain x and y
  // Uses union by rank for efficiency
  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return;
    }

    // Union by rank
    if (this.rank.get(rootX)! < this.rank.get(rootY)!) {
      this.parent.set(rootX, rootY);
      this.size.set(rootY, this.size.get(rootX)! + this.size.get(rootY)!);
    } else if (this.rank.get(rootX)! > this.rank.get(rootY)!) {
      this.parent.set(rootY, rootX);
      this.size.set(rootX, this.size.get(rootX)! + this.size.get(rootY)!);
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, this.rank.get(rootX)! + 1);
      this.size.set(rootX, this.size.get(rootX)! + this.size.get(rootY)!);
    }
  }

  // Check if x and y are in the same set
  connected(x: number, y: number): boolean {
    return this.find(x) === this.find(y);
  }

  // Get the size of the set containing x
  getSize(x: number): number {
    return this.size.get(this.find(x))!;
  }

  // Get all distinct sets
  getSets(): Map<number, number[]> {
    const sets = new Map<number, number[]>();

    for (const element of this.parent.keys()) {
      const root = this.find(element);
      if (!sets.has(root)) {
        sets.set(root, []);
      }
      sets.get(root)!.push(element);
    }

    return sets;
  }
}