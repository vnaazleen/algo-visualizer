import React from 'react'
import bfs from './bfs'
import { getAllNodes } from './Dijkstra';

export function biDirectionalBfs(grid,start,finish) {
    let queueSt = [];
    let queueBk = [];
    const allnodes = getAllNodes(grid);
    // const visitedNodes = [];

    queueSt.push(start);
    queueBk.push(finish);
    start.isVisited=true;
    finish.isVisited=true;
    let neighbors=[];
    let short=[]
    let shortBk=[]
    let st=[]
    let bk = []
    let s1;
    let s2;
    neighbors.push(start);
    neighbors.push(finish);
    let neighborsUnvis=[];

    // short.push(start);
    // shortBk.push(finish);

    while(queueSt !==[] && queueBk!==[]){

        const currentSt = queueSt.shift();
        const currentBk = queueBk.shift();
        const neighSt = getUnvisitedNeighboursBbfs(currentSt,grid);
        const neighBk = getUnvisitedNeighboursBbfs(currentBk,grid);

        short=[]
        shortBk=[]

        // if(neighSt!= null){
            updateUnvisitedNeighbors(currentSt,grid);
        // }
        // if( neighBk!=null){
            updateUnvisitedNeighbors(currentBk,grid);
        // }

        console.log(neighSt);
        console.log(neighBk);



        for(let i=0;i<neighSt.length || i<neighBk.length;i++){

            console.log(neighBk[i],neighSt[i]);

                if(i<neighSt.length ){
                    // for(let j=0;j<neighbors.length;j++){
                    //     if(neighSt[i].row === neighbors[j].row && neighSt[i].col === neighbors[j].col){
                    let sur = getSurroundings(neighSt[i],grid);
                    for (let j=0;j<sur.length;j++){
                        if(bk.includes(sur[j])){
                            let r2;
                            console.log("end ");
                            neighSt[i].isVisited=true
                            let val =  neighSt[i]
                            // while(!grid[val.row][val.col-1].isBbfs || !grid[val.row+1][val.col].isBbfs || !grid[val.row-1][val.col].isBbfs){
                            //     val= val.previousNode
                            // }
                            if(start.row===val.row){
                                while(!grid[val.row][val.col-1].isBbfs){
                                    val = val.previousNode
                                }
                                r2 = grid[val.row][val.col-1]
                            }
                            else if(start.col>val.col){
                                while(!grid[val.row+1][val.col].isBbfs){
                                    val = val.previousNode
                                }
                                r2 = grid[val.row+1][val.col]
                            }
                            else if(start.col<val.col){
                                while(!grid[val.row-1][val.col].isBbfs){
                                    val = val.previousNode
                                }
                                r2 = grid[val.row-1][val.col]
                            }
                            console.log(neighSt[i].row);

                            return [neighbors,neighSt[i],r2]; 
                        }
                    }
                    
                    
                        console.log(neighSt[i])
                        neighSt[i].isVisited = true;
                        neighSt[i].isBbfs = true;
                        queueSt.push(neighSt[i]);
                        st.push(neighSt[i]);
                        short.push(neighSt[i]);
                }

                if(i<neighBk.length){
                    // for(let j=0;j<neighbors.length;j++){
                    // if(neighSt[i].row === neighbors[j].row && neighSt[i].col === neighbors[j].col){
                let sur = getSurroundings(neighBk[i],grid);
                for (let j=0;j<sur.length;j++){
                if(st.includes(sur[j])){
                    let r2;
                    console.log("end ");
                    neighBk[i].isVisited=true
                    let val =  neighBk[i]
                    // while(!grid[val.row][val.col-1].isBbfs || !grid[val.row+1][val.col].isBbfs || !grid[val.row-1][val.col].isBbfs){
                    //     val= val.previousNode
                    // }
                    if(start.row===val.row){
                        while(!grid[val.row][val.col-1].isBbfs){
                            val = val.previousNode
                        }
                        r2 = grid[val.row][val.col-1]
                    }
                    else if(start.col>val.col){
                        while(!grid[val.row+1][val.col].isBbfs){
                            val = val.previousNode
                        }
                        r2 = grid[val.row+1][val.col]
                    }
                    else if(start.col<val.col){
                        while(!grid[val.row-1][val.col].isBbfs){
                            val = val.previousNode
                        }
                        r2 = grid[val.row-1][val.col]
                    }
                    console.log(neighBk[i]);
                    return [neighbors,neighBk[i],r2]; 
                }
            }
                
                    console.log(neighBk[i])
                    neighBk[i].isVisited = true;
                    neighBk[i].isBbfs = true;
                    queueBk.push(neighBk[i]);
                    bk.push(neighBk[i])
                    shortBk.push(neighBk[i]);
            
                    
                    
                }

                // console.log(neighSt[i]);
                // if(neighBk[i] in neighbors){
                //     return [neighbors,neighBk[i]]
                // }
        }
        neighbors = [...neighbors,...short,...shortBk]
    }
}

function updateUnvisitedNeighbors(node, grid) {
    /** Updates the distances of unvisited nodes */
    const unvisitedNeighbors = getUnvisitedNeighboursBbfs(node, grid);
    console.log("unvis")
    console.log(unvisitedNeighbors);
    // if(unvisitedNeighbors !== undefined){
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
    const nodesInShortestPathOrder = [];
    let currentNode = edNode;
    while (currentNode != null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
      console.log(currentNode)
    }
    return nodesInShortestPathOrder;
}

function getSurroundings(node,grid){
    const neighbors = [];
    const col = node.col;
    const row = node.row;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors;
}
