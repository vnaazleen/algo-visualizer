/*
Dijkstra's Algorithm:
* Greedy Algorithm
*  algorithm for finding the shortest paths between nodes in a graph
*/

// Main Dijkstra logic

export function dijkstra (grid, startNode, finishNode) {
  const visitedNodesInOrder = []
  const unvisitedNodes = getAllNodes(grid);

  startNode.distance = 0;
  while(!!unvisitedNodes.length) {
    // get the next most promising node
    sortNodesByDistance(unvisitedNodes);
    const nearestNode = unvisitedNodes.shift();

    // else we visit the node
    nearestNode.isVisited = true;
    visitedNodesInOrder.push(nearestNode);

    // check if it is our destination
    if (nearestNode === finishNode) {
      return visitedNodesInOrder;
    }

    updateUnvisitedNeighbors(nearestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  /** Sort's the unvisited nodes by their relative distance from current node*/
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}


function updateUnvisitedNeighbors(node, grid) {
  /** Updates the distances of unvisited nodes */
  const unvisitedNeighbors = getUnvisitedNeighbours(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbours(node, grid) {
  /** Returns all univisted neighbours of given node*/
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  /** Returns all nodes in grid*/
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  /** Backtracking alogirthm to get the path from Finish node to Start node (or vice versa) */
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    console.log(currentNode);
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
