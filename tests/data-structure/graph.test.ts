import { Graph } from "../../src/data-structure";
import { describe, test, expect } from "bun:test";

describe("Graph", () => {
    test("Empty graph operations", () => {
        const graph = new Graph<string>();

        expect(graph.getAllVertices()).toEqual([]);
        expect(graph.getNeighbors("A")).toEqual([]);
    });

    test("Add vertex operations", () => {
        const graph = new Graph<string>();

        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");

        const vertices = graph.getAllVertices();
        expect(vertices.length).toBe(3);
        expect(vertices).toContain("A");
        expect(vertices).toContain("B");
        expect(vertices).toContain("C");
    });

    test("Add edge operations - undirected graph", () => {
        const graph = new Graph<string>(false); // Undirected graph

        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");

        // Check neighbors of A
        const neighborsA = graph.getNeighbors("A");
        expect(neighborsA.length).toBe(2);
        expect(neighborsA).toContain("B");
        expect(neighborsA).toContain("C");

        // Check neighbors of B (should include A since it's undirected)
        const neighborsB = graph.getNeighbors("B");
        expect(neighborsB.length).toBe(1);
        expect(neighborsB).toContain("A");

        // Check neighbors of C (should include A since it's undirected)
        const neighborsC = graph.getNeighbors("C");
        expect(neighborsC.length).toBe(1);
        expect(neighborsC).toContain("A");
    });

    test("Add edge operations - directed graph", () => {
        const graph = new Graph<string>(true); // Directed graph

        graph.addVertex("A");
        graph.addVertex("B");
        graph.addVertex("C");

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");

        // Check neighbors of A
        const neighborsA = graph.getNeighbors("A");
        expect(neighborsA.length).toBe(2);
        expect(neighborsA).toContain("B");
        expect(neighborsA).toContain("C");

        // Check neighbors of B (should NOT include A since it's directed)
        const neighborsB = graph.getNeighbors("B");
        expect(neighborsB.length).toBe(0);

        // Check neighbors of C (should NOT include A since it's directed)
        const neighborsC = graph.getNeighbors("C");
        expect(neighborsC.length).toBe(0);
    });

    test("Add edge with implicit vertex creation", () => {
        const graph = new Graph<string>();

        // Adding an edge between vertices that don't exist yet
        graph.addEdge("A", "B");

        const vertices = graph.getAllVertices();
        expect(vertices.length).toBe(2);
        expect(vertices).toContain("A");
        expect(vertices).toContain("B");

        const neighborsA = graph.getNeighbors("A");
        expect(neighborsA).toContain("B");
    });

    test("Remove edge operations - undirected graph", () => {
        const graph = new Graph<string>(false); // Undirected graph

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");

        // Remove edge A-B
        graph.removeEdge("A", "B");

        // Check neighbors of A
        const neighborsA = graph.getNeighbors("A");
        expect(neighborsA.length).toBe(1);
        expect(neighborsA).toContain("C");
        expect(neighborsA).not.toContain("B");

        // Check neighbors of B
        const neighborsB = graph.getNeighbors("B");
        expect(neighborsB.length).toBe(0);
        expect(neighborsB).not.toContain("A");
    });

    test("Remove edge operations - directed graph", () => {
        const graph = new Graph<string>(true); // Directed graph

        graph.addEdge("A", "B");
        graph.addEdge("B", "A");

        // Remove edge A->B
        graph.removeEdge("A", "B");

        // Check neighbors of A
        const neighborsA = graph.getNeighbors("A");
        expect(neighborsA.length).toBe(0);
        expect(neighborsA).not.toContain("B");

        // Check neighbors of B (B->A should still exist)
        const neighborsB = graph.getNeighbors("B");
        expect(neighborsB.length).toBe(1);
        expect(neighborsB).toContain("A");
    });

    test("Remove vertex operations", () => {
        const graph = new Graph<string>();

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");
        graph.addEdge("B", "C");

        // Remove vertex A
        graph.removeVertex("A");

        // Check vertices
        const vertices = graph.getAllVertices();
        expect(vertices.length).toBe(2);
        expect(vertices).toContain("B");
        expect(vertices).toContain("C");
        expect(vertices).not.toContain("A");

        // Check that edges to/from A are removed
        const neighborsB = graph.getNeighbors("B");
        expect(neighborsB).not.toContain("A");
        expect(neighborsB).toContain("C");

        const neighborsC = graph.getNeighbors("C");
        expect(neighborsC).not.toContain("A");
        expect(neighborsC).toContain("B");
    });

    test("Weighted graph operations", () => {
        const graph = new Graph<string>(false, true); // Undirected, weighted graph

        graph.addEdge("A", "B", 5);
        graph.addEdge("A", "C", 10);

        // Check edge weights
        expect(graph.getEdgeWeight("A", "B")).toBe(5);
        expect(graph.getEdgeWeight("B", "A")).toBe(5); // Undirected, so both directions have the same weight
        expect(graph.getEdgeWeight("A", "C")).toBe(10);
        expect(graph.getEdgeWeight("C", "A")).toBe(10);

        // Non-existent edge
        expect(graph.getEdgeWeight("B", "C")).toBeUndefined();
    });

    test("Breadth-First Search", () => {
        const graph = new Graph<string>();

        // Create a simple graph
        //    A
        //   / \
        //  B   C
        //     / \
        //    D   E

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");
        graph.addEdge("C", "D");
        graph.addEdge("C", "E");

        // BFS from A
        const bfsResult = graph.breadthFirstSearch("A");

        // First vertex should be A
        expect(bfsResult[0]).toBe("A");

        // B and C should be next (order might vary)
        expect(bfsResult.slice(1, 3)).toContain("B");
        expect(bfsResult.slice(1, 3)).toContain("C");

        // D and E should be last (order might vary)
        expect(bfsResult.slice(3)).toContain("D");
        expect(bfsResult.slice(3)).toContain("E");

        // BFS from non-existent vertex
        expect(graph.breadthFirstSearch("Z")).toEqual([]);
    });

    test("Depth-First Search", () => {
        const graph = new Graph<string>();

        // Create a simple graph
        //    A
        //   / \
        //  B   C
        //     / \
        //    D   E

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");
        graph.addEdge("C", "D");
        graph.addEdge("C", "E");

        // DFS from A
        const dfsResult = graph.depthFirstSearch("A");

        // First vertex should be A
        expect(dfsResult[0]).toBe("A");

        // Check that all vertices are visited
        expect(dfsResult.length).toBe(5);
        expect(dfsResult).toContain("A");
        expect(dfsResult).toContain("B");
        expect(dfsResult).toContain("C");
        expect(dfsResult).toContain("D");
        expect(dfsResult).toContain("E");

        // DFS from non-existent vertex
        expect(graph.depthFirstSearch("Z")).toEqual([]);
    });

    test("Dijkstra's algorithm - unweighted graph", () => {
        const graph = new Graph<string>();

        // Create a simple graph
        //    A
        //   / \
        //  B   C
        //     / \
        //    D   E

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");
        graph.addEdge("C", "D");
        graph.addEdge("C", "E");

        // Run Dijkstra's algorithm from A
        const result = graph.dijkstra("A");

        // Check distances
        expect(result.get("A")?.distance).toBe(0);
        expect(result.get("B")?.distance).toBe(1);
        expect(result.get("C")?.distance).toBe(1);
        expect(result.get("D")?.distance).toBe(2);
        expect(result.get("E")?.distance).toBe(2);

        // Check previous nodes
        expect(result.get("A")?.previous).toBeNull();
        expect(result.get("B")?.previous).toBe("A");
        expect(result.get("C")?.previous).toBe("A");
        expect(result.get("D")?.previous).toBe("C");
        expect(result.get("E")?.previous).toBe("C");
    });

    test("Dijkstra's algorithm - weighted graph", () => {
        const graph = new Graph<string>(false, true); // Undirected, weighted graph

        // Create a weighted graph
        //      A
        //    5/ \10
        //    B   C
        //  3/    \7
        //  D------E
        //      2

        graph.addEdge("A", "B", 5);
        graph.addEdge("A", "C", 10);
        graph.addEdge("B", "D", 3);
        graph.addEdge("C", "E", 7);
        graph.addEdge("D", "E", 2);

        // Run Dijkstra's algorithm from A
        const result = graph.dijkstra("A");

        // Check distances
        expect(result.get("A")?.distance).toBe(0);
        expect(result.get("B")?.distance).toBe(5);
        expect(result.get("C")?.distance).toBe(10);
        expect(result.get("D")?.distance).toBe(8);  // A->B->D = 5+3 = 8
        expect(result.get("E")?.distance).toBe(10); // A->B->D->E = 5+3+2 = 10 (shorter than A->C->E = 10+7 = 17)

        // Check previous nodes
        expect(result.get("A")?.previous).toBeNull();
        expect(result.get("B")?.previous).toBe("A");
        expect(result.get("C")?.previous).toBe("A");
        expect(result.get("D")?.previous).toBe("B");
        expect(result.get("E")?.previous).toBe("D");
    });

    test("Cycle detection - acyclic graph", () => {
        const graph = new Graph<string>(true); // Directed graph

        // Create a directed acyclic graph (DAG)
        //    A
        //   / \
        //  B   C
        //   \ /
        //    D

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");
        graph.addEdge("B", "D");
        graph.addEdge("C", "D");

        expect(graph.hasCycle()).toBe(false);
    });

    test("Cycle detection - cyclic graph", () => {
        const graph = new Graph<string>(true); // Directed graph

        // Create a directed cyclic graph
        //    A
        //   / \
        //  B   C
        //   \ /
        //    D
        //    |
        //    A  (cycle: D->A->B->D or D->A->C->D)

        graph.addEdge("A", "B");
        graph.addEdge("A", "C");
        graph.addEdge("B", "D");
        graph.addEdge("C", "D");
        graph.addEdge("D", "A"); // Creates a cycle

        expect(graph.hasCycle()).toBe(true);
    });

    test("Graph with number vertices", () => {
        const graph = new Graph<number>();

        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);

        const vertices = graph.getAllVertices();
        expect(vertices.length).toBe(4);
        expect(vertices).toContain(1);
        expect(vertices).toContain(2);
        expect(vertices).toContain(3);
        expect(vertices).toContain(4);

        const neighbors1 = graph.getNeighbors(1);
        expect(neighbors1).toContain(2);
        expect(neighbors1).toContain(3);
    });

    test("Graph with object vertices", () => {
        interface Person {
            id: number;
            name: string;
        }

        const alice: Person = { id: 1, name: "Alice" };
        const bob: Person = { id: 2, name: "Bob" };
        const charlie: Person = { id: 3, name: "Charlie" };

        const graph = new Graph<Person>();

        graph.addVertex(alice);
        graph.addVertex(bob);
        graph.addVertex(charlie);

        graph.addEdge(alice, bob);
        graph.addEdge(alice, charlie);

        const vertices = graph.getAllVertices();
        expect(vertices.length).toBe(3);
        expect(vertices).toContainEqual(alice);
        expect(vertices).toContainEqual(bob);
        expect(vertices).toContainEqual(charlie);

        const neighborsAlice = graph.getNeighbors(alice);
        expect(neighborsAlice).toContainEqual(bob);
        expect(neighborsAlice).toContainEqual(charlie);
    });

    test("Complex graph operations", () => {
        const graph = new Graph<string>(true, true); // Directed, weighted graph

        // Create a complex graph
        graph.addEdge("A", "B", 5);
        graph.addEdge("A", "C", 3);
        graph.addEdge("B", "D", 2);
        graph.addEdge("C", "D", 1);
        graph.addEdge("D", "E", 4);
        graph.addEdge("B", "E", 6);

        // Check vertices and edges
        expect(graph.getAllVertices().length).toBe(5);

        // Check weights
        expect(graph.getEdgeWeight("A", "B")).toBe(5);
        expect(graph.getEdgeWeight("C", "D")).toBe(1);

        // Remove an edge and check
        graph.removeEdge("A", "B");
        expect(graph.getNeighbors("A")).not.toContain("B");
        expect(graph.getEdgeWeight("A", "B")).toBeUndefined();

        // Remove a vertex and check
        graph.removeVertex("C");
        expect(graph.getAllVertices()).not.toContain("C");
        expect(graph.getNeighbors("A")).not.toContain("C");

        // Run Dijkstra's algorithm after modifications
        const result = graph.dijkstra("A");
        expect(result.get("D")?.distance).not.toBe(4); // A->C->D path is gone
        expect(result.get("E")?.distance).toBeDefined(); // Should still be reachable
    });
});