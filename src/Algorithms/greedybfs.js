import { getAllNodes, getUnvisitedNeighbours, sortNodesByDistance} from './Dijkstra';

export function greedyBFS(grid, start, finish) {
    /** Greedy best first search algorithm*/
    const visitedNodes = []
    const unvisitedNodes = getAllNodes(grid);
    const pqueue = [];
    pqueue.push([start, -1]);

    while(pqueue.length > 0) {
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

function getManhattanDistance(currNode, finishNode) {
    /** Returns the Manhattan Distance between two points*/
    return Math.abs(currNode.row - finishNode.row) + Math.abs(currNode.col - finishNode.col)+ Math.abs(currNode.cost - finishNode.cost)
}