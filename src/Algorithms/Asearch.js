import { PriorityQueue } from '../DataStructures/PriorityQueue';
import { getAllNodes, getUnvisitedNeighbours } from './Dijkstra';

export function aSearch(grid, start, finish) {

    let open = [];
    let close = [];
    const allnodes = getAllNodes(grid);

    let pqueue = new PriorityQueue();
    start.aEndDis = calculateDistance(finish, start)

    pqueue.enqueue(start, start.aEndDis + start.cost);
    open.push(start);

    let closed = new PriorityQueue();
    let visitedNodesInOrder = []

    while (pqueue.size() > 0) {

        pqueue.print()

        const curObject = pqueue.dequeue();
        const current = curObject.element;
        open = removeElement(open, current);

        current.isVisited = true

        closed.enqueue(current, current.aEndDis + current.cost);
        close.push(current)
        closed.print()
        const neigh = getUnvisitedNeighbours(current, grid);

        let short = null
        let index = 0

        for (let i = 0; i < neigh.length; i++) {
            let s = 0,
                d = 0

            s = calculateDistance(start, neigh[i])
            d = calculateDistance(finish, neigh[i])


            neigh[i].distance = s
            neigh[i].aDis = neigh[i].distance + d;
            neigh[i].aEndDis = d;

            if (neigh[i] in close) {
                continue;
            }

            if (!(neigh[i] in open)) {
                pqueue.enqueue(neigh[i], neigh[i].aEndDis + neigh[i].cost);
                open.push(neigh[i])
                neigh[i].previousNode = current

            }
        }

        current.isVisited = true;

        visitedNodesInOrder.push(short);

        if (current === finish) {
            return close;
        }
    }

}

function calculateDistance(start, node) {
    let dis = Math.abs(start.row - node.row) + Math.abs(start.col - node.col)
    return dis
}

function removeElement(ar, ele) {
    return ar.filter(function(val) {
        return val != ele;
    })
}