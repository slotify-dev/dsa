export default class Graph<T> {
  private isDirected: boolean;
  private isWeighted: boolean;

  private weights: Map<string, number> = new Map();
  private adjacencyList: Map<T, Set<T>> = new Map();

  constructor(isDirected: boolean = false, isWeighted: boolean = false) {
    this.isDirected = isDirected;
    this.isWeighted = isWeighted;
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set());
    }
  }

  addEdge(source: T, destination: T, weight: number = 1): void {
    this.addVertex(source);
    this.addVertex(destination);

    this.adjacencyList.get(source)!.add(destination);

    if (this.isWeighted) {
      this.weights.set(this.getEdgeKey(source, destination), weight);
    }

    if (!this.isDirected) {
      this.adjacencyList.get(destination)!.add(source);
      if (this.isWeighted) {
        this.weights.set(this.getEdgeKey(destination, source), weight);
      }
    }
  }

  removeEdge(source: T, destination: T): void {
    if (this.adjacencyList.has(source)) {
      this.adjacencyList.get(source)!.delete(destination);
    }

    if (this.isWeighted) {
      this.weights.delete(this.getEdgeKey(source, destination));
    }

    if (!this.isDirected && this.adjacencyList.has(destination)) {
      this.adjacencyList.get(destination)!.delete(source);
      if (this.isWeighted) {
        this.weights.delete(this.getEdgeKey(destination, source));
      }
    }
  }

  removeVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) return;

    // Remove all edges connected to this vertex
    for (const adjacentVertex of this.adjacencyList.get(vertex)!) {
      this.removeEdge(vertex, adjacentVertex);
    }

    // Remove all edges pointing to this vertex
    for (const [otherVertex, adjacentVertices] of this.adjacencyList.entries()) {
      if (adjacentVertices.has(vertex)) {
        this.removeEdge(otherVertex, vertex);
      }
    }

    // Remove the vertex itself
    this.adjacencyList.delete(vertex);
  }

  getEdgeWeight(source: T, destination: T): number | undefined {
    if (!this.isWeighted) return 1;
    return this.weights.get(this.getEdgeKey(source, destination));
  }

  private getEdgeKey(source: T, destination: T): string {
    return `${String(source)}-${String(destination)}`;
  }

  getNeighbors(vertex: T): T[] {
    if (!this.adjacencyList.has(vertex)) return [];
    return Array.from(this.adjacencyList.get(vertex)!);
  }

  getAllVertices(): T[] {
    return Array.from(this.adjacencyList.keys());
  }

  breadthFirstSearch(startVertex: T): T[] {
    if (!this.adjacencyList.has(startVertex)) return [];

    const result: T[] = [];
    const visited = new Set<T>();
    const queue: T[] = [startVertex];

    visited.add(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift()!;
      result.push(currentVertex);

      for (const neighbor of this.adjacencyList.get(currentVertex)!) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  depthFirstSearch(startVertex: T): T[] {
    if (!this.adjacencyList.has(startVertex)) return [];

    const result: T[] = [];
    const visited = new Set<T>();

    const dfs = (vertex: T) => {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)!) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    dfs(startVertex);
    return result;
  }

  // Dijkstra's algorithm for finding shortest paths
  dijkstra(startVertex: T): Map<T, { distance: number; previous: T | null }> {
    if (!this.adjacencyList.has(startVertex)) {
      return new Map();
    }

    const unvisited = new Set<T>();
    const distances = new Map<T, number>();
    const previous = new Map<T, T | null>();

    // Initialize
    for (const vertex of this.adjacencyList.keys()) {
      distances.set(vertex, vertex === startVertex ? 0 : Infinity);
      previous.set(vertex, null);
      unvisited.add(vertex);
    }

    while (unvisited.size > 0) {
      // Find vertex with minimum distance
      let currentVertex: T | null = null;
      let minDistance = Infinity;

      for (const vertex of unvisited) {
        const distance = distances.get(vertex)!;
        if (distance < minDistance) {
          minDistance = distance;
          currentVertex = vertex;
        }
      }

      // If we can't find a vertex with a finite distance, we're done
      if (currentVertex === null || minDistance === Infinity) {
        break;
      }

      unvisited.delete(currentVertex);

      // Update distances to neighbors
      for (const neighbor of this.adjacencyList.get(currentVertex)!) {
        if (!unvisited.has(neighbor)) continue;

        const weight = this.getEdgeWeight(currentVertex, neighbor) || 1;
        const distance = distances.get(currentVertex)! + weight;

        if (distance < distances.get(neighbor)!) {
          distances.set(neighbor, distance);
          previous.set(neighbor, currentVertex);
        }
      }
    }

    // Prepare result
    const result = new Map<T, { distance: number; previous: T | null }>();
    for (const vertex of this.adjacencyList.keys()) {
      result.set(vertex, {
        distance: distances.get(vertex)!,
        previous: previous.get(vertex)!
      });
    }

    return result;
  }

  // Check if the graph has a cycle
  hasCycle(): boolean {
    const visited = new Set<T>();
    const recStack = new Set<T>();

    for (const vertex of this.adjacencyList.keys()) {
      if (!visited.has(vertex)) {
        if (this.hasCycleUtil(vertex, visited, recStack)) {
          return true;
        }
      }
    }

    return false;
  }

  private hasCycleUtil(vertex: T, visited: Set<T>, recStack: Set<T>): boolean {
    visited.add(vertex);
    recStack.add(vertex);

    for (const neighbor of this.adjacencyList.get(vertex)!) {
      if (!visited.has(neighbor)) {
        if (this.hasCycleUtil(neighbor, visited, recStack)) {
          return true;
        }
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(vertex);
    return false;
  }
}