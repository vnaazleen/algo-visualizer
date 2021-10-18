import { getAllNodes } from './Dijkstra';

export function biDirectionalBfs(grid, start, finish) {
    let queueForward = []; /* queue that stores nodes to be visited next in forward dir */
    let queueBackward = []; /* queue that stores nodes to be visited next in backword dir */
    const allnodes = getAllNodes(grid); /* get all nodes coordinates from gird */


    /* push the start node in forward queue & finish node in backward queue */
    queueForward.push(start);
    queueBackward.push(finish);

    /* mark the start node & finish node as visited */
    start.isVisited = true;
    finish.isVisited = true;


    let neighbors = []; // to store neighbours of current node

    let curForwardLevelNodes = [];
    let curBackwardLevelNodes = [];

    let visitedForward = [];
    let visitedBackward = [];

    let s1;
    let s2;

    neighbors.push(start);
    neighbors.push(finish);

    let neighborsUnvis = [];

    while (queueForward.length>=0 && queueBackward.length>=0) {

        if(queueForward.length === 0 || queueBackward.length === 0) return false;

        const currentForwardNode = queueForward.shift(); /* shift() -> pops & returns front node in queue*/
        const currentBackwardNode = queueBackward.shift();


        

        const neighsForward = getUnvisitedNeighboursBbfs(currentForwardNode, grid);
        const neighsBackward = getUnvisitedNeighboursBbfs(currentBackwardNode, grid);

        // if(neighsForward.length === 0 || neighsBackward === 0 ) return false;

        curForwardLevelNodes = [];
        curBackwardLevelNodes = [];

        let val = updateUnvisitedNeighbors(currentForwardNode, grid);
        updateUnvisitedNeighbors(currentBackwardNode, grid);

        // if(val === 2) return [neighbors, neighsForward[i], ];

        for (let i = 0; i < neighsForward.length || i < neighsBackward.length; i++) {

            // visits all the currentForwardNodes neighbours, if any
            if (i < neighsForward.length) {

                let sur = getSurroundings(neighsForward[i], grid);
                // if (neighsForward[i].isVisited === true) return [neighbors, neighsForward[i], sur[0]];
                // if(sur.length === 0) 

                for (let j = 0; j < sur.length; j++) {

                    // if forward nodes meet backward nodes, the we found a path & return it
                    if (visitedBackward.includes(sur[j])) {
                        neighsForward[i].isVisited = true;
                        return [neighbors, neighsForward[i], sur[j]];
                    }
                }

                neighsForward[i].isVisited = true;
                neighsForward[i].isBbfs = true;

                queueForward.push(neighsForward[i]);

                visitedForward.push(neighsForward[i]);
                curForwardLevelNodes.push(neighsForward[i]);
            }

            // visits all the currentBackwardNodes neighbours, if any
            if (i < neighsBackward.length) {
                let sur = getSurroundings(neighsBackward[i], grid);
                // if(sur.length === 0) return [neighbors, neighsBackward[i], sur[0]];

                for (let j = 0; j < sur.length; j++) {

                    // if forward nodes meet backward nodes, the we found a path & return it
                    if (visitedForward.includes(sur[j])) {
                        neighsBackward[i].isVisited = true
                        return [neighbors, neighsBackward[i], sur[j]];
                    }
                }

                neighsBackward[i].isVisited = true;
                neighsBackward[i].isBbfs = true;

                queueBackward.push(neighsBackward[i]);

                visitedBackward.push(neighsBackward[i])
                curBackwardLevelNodes.push(neighsBackward[i]);

            }
        }
        neighbors = [...neighbors, ...curForwardLevelNodes, ...curBackwardLevelNodes]
    }

    // if ( queueForward === [] ) return [neighbors,neighbors];
    // && queueBackward !== [];
}

function updateUnvisitedNeighbors(node, grid) {
    /** Updates the distances of unvisited nodes */
    const unvisitedNeighbors = getUnvisitedNeighboursBbfs(node, grid);
    // if(unvisitedNeighbors.length ===0 ) return 2;  
    for (const neighbor of unvisitedNeighbors) {
        neighbor.previousNode = node;
    }

}

function getUnvisitedNeighboursBbfs(node, grid) {
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



export function getNodesInShortestPathOrderBbfs(edNode) {
    /** Backtracking alogirthm to get the path from Finish node to Start node (or vice versa) */
    const nodesInShortestPathOrderBbfs = [];
    let currentNode = edNode;
    while (currentNode != null) {
        nodesInShortestPathOrderBbfs.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrderBbfs;
}

function getSurroundings(node, grid) {
    const neighbors = [];
    const col = node.col;
    const row = node.row;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors;
}