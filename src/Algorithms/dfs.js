import { getAllNodes, getUnvisitedNeighbours, updateUnvisitedNeighbors} from './Dijkstra';


export function dfs(grid, start, finish) {
    let stack = []
    const visitedNodes = [];

    stack.push(start);
    start.isVisited = true;

    while(stack.length >= 0) {
        if(stack.length === 0) return visitedNodes;

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
