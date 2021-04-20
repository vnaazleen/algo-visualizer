import {getAllNodes} from './Dijkstra';
import {getUnvisitedNeighbours} from './Dijkstra';

export function bfs (grid,start,finish) {

    let queue = [];
    const allnodes = getAllNodes(grid);
    const visitedNodes = [];

    queue.push(start);
    start.isVisited=true;
    let neighbors=[];
    let short=[]
    neighbors.push(start);
    short.push(start);

    while(!!allnodes.length){

        const current = queue.shift();
        const neigh = getUnvisitedNeighboursBfs(current,grid);
        short=[]

        updateUnvisitedNeighbors(current,grid);


        for(let i=0;i<neigh.length;i++){
                neigh[i].isVisited = true;
                queue.push(neigh[i]);
                short.push(neigh[i])
                if(neigh[i] === finish){
                    return neighbors;
                }
        }
        neighbors = [...neighbors,...short]
    }


}

function updateUnvisitedNeighbors(node, grid) {
    /** Updates the distances of unvisited nodes */
    const unvisitedNeighbors = getUnvisitedNeighboursBfs(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = node;
    }
}

function getUnvisitedNeighboursBfs(node, grid) {
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

  