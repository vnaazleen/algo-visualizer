import {PriorityQueue} from '../DataStructures/PriorityQueue';
export function aSearch(grid,start,finish){

    let op = [];
    let cl = [];
    const allnodes = getAllNodes(grid);

    let open = new PriorityQueue();
    start.aEndDis = calDis(finish,start)

    open.enqueue(start,start.aEndDis+start.cost);
    op.push(start);

    let closed = new PriorityQueue();
    let visitedNodesInOrder = []



    while(open.size()>0){

        open.print()

        const curObject = open.dequeue();
        const current = curObject.element;
        op = removeElement(op,current);

        current.isVisited= true

        closed.enqueue(current,current.aEndDis+current.cost);
        cl.push(current)
        closed.print()
        const neigh = getUnvisitedNeighboursBfs(current,grid);

        let short=null
        let index=0

        for(let i=0;i<neigh.length;i++){
            let s=0,d=0

            s= calDis(start,neigh[i])
            d= calDis(finish,neigh[i])
            

            neigh[i].distance = s
            neigh[i].aDis = neigh[i].distance+d;
            neigh[i].aEndDis = d ;

            if(neigh[i] in cl){
                continue;
            }

            if(!(neigh[i] in op)){
                open.enqueue(neigh[i],neigh[i].aEndDis+neigh[i].cost);
                op.push(neigh[i])
                neigh[i].previousNode = current

            }


        }


    current.isVisited = true;

    visitedNodesInOrder.push(short);

    if (current === finish) {
        
      return cl;
    }

    }


}

function calDis(start,node){
    let dis= Math.abs(start.row - node.row) + Math.abs(start.col - node.col)
    return dis
}

function removeElement(ar,ele){
    return ar.filter(function(val){
        return val!=ele;
    })
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

  function getAllNodes(grid) {
    /** Returns all nodes in grid*/
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        node.distance=0;
        nodes.push(node);
      }
    }
    return nodes;
  }

