import React, { Component } from 'react';
import GridBlock from './GridBlockComponent';
import Header from './HeaderComponent';
import Chooser from './Algo-chooserComponent';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/Dijkstra';
import {bfs} from '../Algorithms/bfs';
import {dfs} from '../Algorithms/dfs';


export default class GridLayout extends Component {

    constructor(props){
        super(props);
        this.state={
            boxes:[]
        }
    }

    gridRender(){
        const b=[];
        for(let row=0;row<15;row++){
            const currRow=[];
            for(let col=0;col<50;col++){

                const val = {
                    row,
                    col,
                    strt: row===10 && col===10,
                    end: row===13 && col===45,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null,
                };
                currRow.push(val);
            }
            b.push(currRow)
        }

      return b;
    }


    gridRerender(){
      const b=[];
      for(let row=0;row<15;row++){
          const currRow=[];
          for(let col=0;col<50;col++){

              const val = {
                  row,
                  col,
                  strt: row===10 && col===10,
                  end: row===13 && col===45,
                  distance: Infinity,
                  isVisited: false,
                  previousNode: null,
              };
              currRow.push(val);
              document.getElementById(`node-${row}-${col}`).className = '';
          }
          b.push(currRow)
      }

    return b;
  }

    componentDidMount(){
      let val= this.gridRender();
      this.setState({
        boxes:val
      })
    }

    clearGrid() {
      let val= this.gridRerender();
      this.setState({
        boxes:val
      });
    }

    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        },  10 * i);
      }
    }

    animateDijkstra(visitedNodes, shortestPath) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }

        setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }, 10 * i);
      }
    }



    animateBfs(visitedNodes, shortestPath) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, 10 * i);
          return;
        }

        setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }, 10 * i);
      }
    }

    animateDfs(visitedNodes) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            console.log(visitedNodes);
            this.animateShortestPath(visitedNodes);
          }, 10 * i);
          return;
        }

        setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
        }, 10 * i);
      }
    }

    visualizeDijkstra() {
      const {boxes} = this.state;
      // TO-D0 : start & finish are static for now
      const start = boxes[10][10];
      const finish = boxes[13][45];

      // apply dijkstra and get shortest part
      const visitedNodes = dijkstra(boxes, start, finish);

      console.log(visitedNodes);
      const shortestPath = getNodesInShortestPathOrder(finish);

      this.animateDijkstra(visitedNodes, shortestPath);
    }

    visuaizeBFS() {
      const {boxes} = this.state;

      const start = boxes[10][10];
      const finish = boxes[13][45];
      const visitedNodes = bfs(boxes,start,finish);
      console.log(visitedNodes);

      const shortestPath = getNodesInShortestPathOrder(finish);
      console.log(shortestPath);

      this.animateBfs(visitedNodes, shortestPath);

    }

    visuaizeDFS() {
      console.log('Started dfs');
      const {boxes} = this.state;

      const start = boxes[10][10];
      const finish = boxes[13][45];
      const visitedNodes = dfs(boxes,start,finish);
      this.animateDfs(visitedNodes);

    }


    render() {
        const {boxes} = this.state;

        return (
            <div>

                <Header></Header>
              <div className="row container">

                <button onClick={() => this.visualizeDijkstra()}>Dijkstra's Algorithm</button>

                <button onClick={() => this.visuaizeBFS()}> BFS Algorithm </button>

                <button onClick={() => this.visuaizeDFS()}> DFS Algorithm </button>

                <button onClick={() => this.clearGrid()} > Clear Grid </button>

              </div>

              <div className="grid-container">
                      {/* console.log(this.state.boxes); */
                        // console.log("render")
                      }
                    {

                    boxes.map((row,pos) => {
                        return(
                        <div className="grid-row" key={`r-${pos}`}>
                          {/* {console.log("row"+row.isVisited)} */}

                        {row.map((c,pos2) => {

                          // console.log("col"+c.isVisited)


                            return( <GridBlock row={pos} col={pos2} key={`${pos}-${pos2}`} start={c.strt} end={c.end}></GridBlock>)})

                    }
                        </div>
                        );
                    })
                    }

              </div>

          </div>
        )
    }
}
