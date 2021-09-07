import { getAllNodes, getUnvisitedNeighbours} from './Dijkstra';

export function greedyBFS(grid, start, finish) {
    /** Greedy best first search algorithm*/
    const visitedNodes = []
    const unvisitedNodes = getAllNodes(grid);
    const pqueue = [];
    pqueue.push([start, -1]);

    while(pqueue.length >=0 ) {
      if(pqueue.length === 0) return visitedNodes;

      sortNodesByDistance(pqueue);
      const node_dist = pqueue.shift();
      const nearestNode = node_dist[0];
      console.log(nearestNode);

      visitedNodes.push(nearestNode);
      nearestNode.isVisited = true;

      if (nearestNode === finish) {
        return visitedNodes;
      }

      const neighbours = getUnvisitedNeighbours(nearestNode,grid);
      neighbours.forEach((node, i) => {
         if (node.isVisited === false) {
            pqueue.push([node, getManhattanDistance(node, finish)]);
         }
      });
    }
}

function sortNodesByDistance(pqueue) {
    /** Sort's the priority queue nodes by their relative distance from finish node*/
    pqueue.sort((a, b) => a[1] - b[1]);
}

function getManhattanDistance(currNode, finishNode) {
    /** Returns the Manhattan Distance between two points*/
    return Math.abs(currNode.row - finishNode.row) + Math.abs(currNode.col - finishNode.col)+ Math.abs(currNode.cost - finishNode.cost)
}