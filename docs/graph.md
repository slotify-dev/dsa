# Graph

- A graph is a non-linear data structure consisting of vertices (or nodes) and edges that connect these vertices.
- Graphs are used to represent relationships between objects. A graph is defined as G = (V, E), where V is a set of vertices and E is a set of edges.

For example:

- Social networks: People are nodes, and friendships are edges.
- Web pages: Pages are nodes, and hyperlinks are edges.
- Maps: Cities are nodes, and roads are edges.

## Import Examples

There are several ways to import the Graph functionality:

### Import the entire library

```typescript
import * as slotify from '@slotify/dsa';

// Use Graph
const graph = new slotify.Graph<string>(true);
```

### Import from data-structure module

```typescript
import * as dataStructure from '@slotify/dsa/data-structure';

// Use Graph directly
const graph = new dataStructure.Graph<string>(true);
```

### Import specific class

```typescript
import { Graph } from '@slotify/dsa/graph';

// Use imported class directly
const graph = new Graph<string>(true);
```

## Usage

This implementation supports both directed and undirected graphs, as well as weighted edges.

```typescript
import { Graph } from '@slotify/dsa/graph';

// Create a directed graph
const directedGraph = new Graph<string>(true);

// Create an undirected graph
const undirectedGraph = new Graph<string>(false);

// Create a weighted graph
const weightedGraph = new Graph<string>(true, true);
```

## API

### Constructor

```typescript
constructor(isDirected: boolean = false, isWeighted: boolean = false)
```

Creates a new graph.

- `isDirected`: If `true`, the graph is directed. If `false` (default), the graph is undirected.
- `isWeighted`: If `true`, the graph supports edge weights. If `false` (default), all edges have a default weight of 1.

### Methods

#### `addVertex(vertex: T): boolean`

Adds a vertex to the graph.

- `vertex`: The vertex to add.
- Returns: `true` if the vertex was added, `false` if it already exists.

#### `hasVertex(vertex: T): boolean`

Checks if a vertex exists in the graph.

- `vertex`: The vertex to check.
- Returns: `true` if the vertex exists, `false` otherwise.

#### `removeVertex(vertex: T): boolean`

Removes a vertex and all its edges from the graph.

- `vertex`: The vertex to remove.
- Returns: `true` if the vertex was removed, `false` if it doesn't exist.

#### `addEdge(source: T, destination: T, weight: number = 1): boolean`

Adds an edge between two vertices.

- `source`: The source vertex.
- `destination`: The destination vertex.
- `weight`: The weight of the edge (default is 1).
- Returns: `true` if the edge was added, `false` if it already exists or if either vertex doesn't exist.

#### `hasEdge(source: T, destination: T): boolean`

Checks if an edge exists between two vertices.

- `source`: The source vertex.
- `destination`: The destination vertex.
- Returns: `true` if the edge exists, `false` otherwise.

#### `getEdgeWeight(source: T, destination: T): number | undefined`

Gets the weight of an edge between two vertices.

- `source`: The source vertex.
- `destination`: The destination vertex.
- Returns: The weight of the edge, or `undefined` if the edge doesn't exist.

#### `removeEdge(source: T, destination: T): boolean`

Removes an edge between two vertices.

- `source`: The source vertex.
- `destination`: The destination vertex.
- Returns: `true` if the edge was removed, `false` if it doesn't exist.

#### `getNeighbors(vertex: T): T[]`

Gets all neighbors of a vertex.

- `vertex`: The vertex to get neighbors for.
- Returns: An array of neighboring vertices.

#### `getVertices(): T[]`

Gets all vertices in the graph.

- Returns: An array of all vertices.

#### `getEdges(): [T, T, number][]`

Gets all edges in the graph.

- Returns: An array of edges, where each edge is represented as a tuple [source, destination, weight].

#### `bfs(startVertex: T): T[]`

Performs a breadth-first search starting from a vertex.

- `startVertex`: The vertex to start from.
- Returns: An array of vertices in BFS order.

#### `dfs(startVertex: T): T[]`

Performs a depth-first search starting from a vertex.

- `startVertex`: The vertex to start from.
- Returns: An array of vertices in DFS order.

#### `dijkstra(startVertex: T): Map<T, { distance: number; previous: T | null }>`

Performs Dijkstra's algorithm to find the shortest paths from a vertex to all other vertices.

- `startVertex`: The vertex to start from.
- Returns: A map where keys are vertices and values are objects containing the shortest distance and the previous vertex in the path.

#### `hasCycle(): boolean`

Checks if the graph has a cycle.

- Returns: `true` if the graph has a cycle, `false` otherwise.

#### `getConnectedComponents(): T[][]`

Gets all connected components in the graph.

- Returns: An array of connected components, where each component is an array of vertices.

## Example

```typescript
import { Graph } from '@slotify/data-structure';

// Create a directed, weighted graph
const graph = new Graph<string>(true, true);

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

// Add edges with weights
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);

// Check if vertices and edges exist
console.log(graph.hasVertex('A')); // true
console.log(graph.hasEdge('A', 'B')); // true
console.log(graph.hasEdge('C', 'A')); // false (directed graph)

// Get edge weight
console.log(graph.getEdgeWeight('A', 'B')); // 4

// Get neighbors
console.log(graph.getNeighbors('A')); // ["B", "C"]

// Perform BFS
console.log(graph.bfs('A')); // ["A", "B", "C", "D"]

// Perform DFS
console.log(graph.dfs('A')); // ["A", "B", "C", "D"]

// Find shortest paths using Dijkstra's algorithm
const shortestPaths = graph.dijkstra('A');
console.log(shortestPaths.get('D')?.distance); // 7 (A -> C -> B -> D)

// Check for cycles
console.log(graph.hasCycle()); // false

// Remove an edge
graph.removeEdge('B', 'D');
console.log(graph.hasEdge('B', 'D')); // false

// Remove a vertex
graph.removeVertex('C');
console.log(graph.hasVertex('C')); // false
console.log(graph.getVertices()); // ["A", "B", "D"]
```

## Time Complexity

- `addVertex(vertex)`: O(1)
- `hasVertex(vertex)`: O(1)
- `removeVertex(vertex)`: O(V + E) where V is the number of vertices and E is the number of edges
- `addEdge(source, destination, weight)`: O(1)
- `hasEdge(source, destination)`: O(1)
- `getEdgeWeight(source, destination)`: O(1)
- `removeEdge(source, destination)`: O(1)
- `getNeighbors(vertex)`: O(1)
- `getVertices()`: O(V)
- `getEdges()`: O(V + E)
- `bfs(startVertex)`: O(V + E)
- `dfs(startVertex)`: O(V + E)
- `dijkstra(startVertex)`: O((V + E) log V)
- `hasCycle()`: O(V + E)
- `getConnectedComponents()`: O(V + E)

## Space Complexity

- O(V + E) for storing the graph using an adjacency list

## Notes

- This implementation uses an adjacency list representation, which is more space-efficient for sparse graphs.
- For undirected graphs, adding an edge (A, B) also adds the edge (B, A).
- Dijkstra's algorithm assumes non-negative edge weights.
