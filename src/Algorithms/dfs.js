import {getAllNodes} from './Dijkstra';


export function dfs(grid, start, finish) {
    let stack = []
    const visitedNodes = [];

    stack.push(start);
    start.isVisited = true;

    while(stack.length > 0) {
        const current = stack.pop();
        const neighbours = getUnvisitedNeighbours(current,grid);
        updateUnvisitedNeighbors(current,grid);


        visitedNodes.push(current);
        current.isVisited = true;

        if (current === finish) {
            return visitedNodes;
        }


        neighbours.forEach((node, i) => {
           if (node.isVisited === false) {
              stack.push(node);
           }
        });
    }
}

function updateUnvisitedNeighbors(node, grid) {
    /** Updates the distances of unvisited nodes */
    const unvisitedNeighbors = getUnvisitedNeighbours(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbours(node, grid) {
    /** Returns all univisted neighbours of given node*/
    const neighbors = [];
    const col = node.col;
    const row = node.row;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
