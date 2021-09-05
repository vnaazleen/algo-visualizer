import { getAllNodes, getUnvisitedNeighbours, updateUnvisitedNeighbors} from './Dijkstra';

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
        const neigh = getUnvisitedNeighbours(current,grid);
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