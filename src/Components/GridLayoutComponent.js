import React, { Component } from 'react';
import GridBlock from './GridBlockComponent';
import Header from './HeaderComponent';
import Chooser from './Algo-chooserComponent';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/Dijkstra';
import {getNodesInShortestPathOrderBbfs} from '../Algorithms/biDirectionalBfs';
import {bfs} from '../Algorithms/bfs';
import {dfs} from '../Algorithms/dfs';
import {greedyBFS} from '../Algorithms/greedybfs';
import {biDirectionalBfs} from '../Algorithms/biDirectionalBfs';
import {aSearch} from '../Algorithms/Asearch'

export default class GridLayout extends Component {

    constructor(props){
        super(props);
        this.state={
            boxes:[],
            
        }
    }

    

    gridRender(){
        const b=[];
        for(let row=0;row<19;row++){
            const currRow=[];
            for(let col=0;col<60;col++){

                const val = {
                    row,
                    col,
                    strt: row===10 && col===10,
                    end: row===13 && col===45,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null,
                    isBbfs:false,
                    iswall:false,
                    aDis:0
                };
                currRow.push(val);
            }
            b.push(currRow)
        }

      return b;
    }


    gridRerender(){
      const b=[];
      for(let row=0;row<19;row++){
          const currRow=[];
          for(let col=0;col<60;col++){

              const val = {
                  row,
                  col,
                  strt: row===10 && col===10,
                  end: row===13 && col===45,
                  distance: Infinity,
                  isVisited: false,
                  previousNode: null,
                  iswall:false,
                  isBbfs:false,
                  aDis:0
              };
              currRow.push(val);
              document.getElementById(`node-${row}-${col}`).className = '';
          }
          b.push(currRow)
      }

    return b;
  }

  clearStyles(){
    const val= this.state.boxes;
    for(let row=0;row<val.length;row++){
      for(let col=0;col<val[0].length;col++){
        const node = val[row][col];
        if(!node.iswall){
                document.getElementById(`node-${row}-${col}`).className = '';
        }
      }
    }
  }

  generateNewGridWithPreviousWalls(){
    const b=[];
      for(let row=0;row<19;row++){
          const currRow=[];
          for(let col=0;col<60;col++){
              const boxes = this.state.boxes;
              const node = boxes[row][col];
              const val = {
                  row,
                  col,
                  strt: row===10 && col===10,
                  end: row===13 && col===45,
                  distance: Infinity,
                  aDis:0,
                  aEndDis:0,
                  isVisited: node.iswall? node.isVisited : false ,
                  previousNode: null,
                  iswall: node.iswall
              };
              currRow.push(val);
              console.log('prev wall');
          }
          b.push(currRow)
      }

    return b;
  }

  randomGridGeneration(){
    const b=[]
    if(!this.state.running){
      for(let row=0;row<19;row++){
        const c=[];
        for(let col=0;col<60;col++){
          const ran = Math.floor(Math.random()*5+1);
          const box= this.state.boxes;


          const node = box[row][col];

          const val = {
              row,
              col,
              strt: node.strt,
              end: node.end,
              distance: Infinity,
              aDis:0,
              aEndDis:0,
              isVisited: !this.prime(ran) && !node.strt && !node.end ? true : false ,
              previousNode: null,
              iswall: !this.prime(ran) && !node.strt && !node.end ? true : false
          };
          if(!this.prime(ran) && !node.strt && !node.end){
            document.getElementById(`node-${row}-${col}`).className = 'node-wall';
          }
            c.push(val);
        }
        b.push(c)
      }
    }
    return b;
  }

  prime(num){

    if(num===1){
      return false
    }
    else{
      for(let i=2;i<this.prime;i++){
          if(num%i===0){
            return false
          }
      }
    }
    return true
  }

  even(num){

    if(num%2 ===0 ){
      return true;
    }
    return false
  }

  randomGrid(){
    if(this.state.boxes !== []){
      this.clearStyles();
      this.clearGridForNewAlgo();
    }
    const val = this.randomGridGeneration();
    this.setState({
      boxes:val
    })
  }



  verticalSkew() {
    if(this.state.boxes !== []){
      this.clearStyles();
      this.clearGridForNewAlgo();
    }
    const val = this.verticalGridGeneration();
    this.setState({
      boxes:val
    })
  }

  horizontalSkew(){

  }

    componentDidMount(){
      let val= this.gridRender();
      this.setState({
        boxes:val
      })
    }

    clearGrid() {
      if(!this.state.running){
        console.log(this.state.running);
        let val= this.gridRerender();
        this.setState({
          boxes:val
        });
      }
      else{
       prompt("Algo is running"); 
      }
      
    }

    clearGridForNewAlgo(){
      let val = this.generateNewGridWithPreviousWalls();
      this.setState({
        boxes:val
      })
    }

    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          console.log("short")
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

    animateBbfs(visitedNodes, shortestPath1, shortestPath2) {

      // if we reach the finish node
      for (let i = 0; i < visitedNodes.length; i++) {
        if (i === visitedNodes.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(shortestPath1);
            this.animateShortestPath(shortestPath2);
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
          }, 10* i);
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
      if(this.state.boxes !== []){
        this.clearStyles();
        this.clearGridForNewAlgo();
      }
      

      const {boxes} = this.state;
      // TO-D0 : start & finish are static for now
      const start = boxes[10][10];
      const finish = boxes[13][45];

      // apply dijkstra and get shortest part
      const visitedNodes = dijkstra(boxes, start, finish);

      console.log(visitedNodes);
      const shortestPath = getNodesInShortestPathOrder(finish);

      this.animateDijkstra(visitedNodes, shortestPath);

      console.log("running true");
        
      console.log('running false')
    }

     visuaizeBFS() {
      if(this.state.boxes !== []){
        this.clearStyles();
        this.clearGridForNewAlgo();
      }
      const {boxes} = this.state;

      const start = boxes[10][10];
      const finish = boxes[13][45];
      const visitedNodes = bfs(boxes,start,finish);

      console.log(visitedNodes);

      const shortestPath = getNodesInShortestPathOrder(finish);
      console.log(shortestPath);

      this.animateBfs(visitedNodes, shortestPath);

    }

    visualizeBBFS() {
      if(this.state.boxes !== []){
        this.clearStyles();
        this.clearGridForNewAlgo();
      }
      const {boxes} = this.state;

      const start = boxes[10][10];
      const finish = boxes[13][45];
      const visitedNodes = biDirectionalBfs(boxes,start,finish);
      console.log('bbfs');
      console.log(visitedNodes);

      const shortestPath2 = getNodesInShortestPathOrderBbfs(visitedNodes[1]);
      const shortestPath1 = getNodesInShortestPathOrderBbfs(visitedNodes[2]);


      console.log(shortestPath1,shortestPath2);

      this.animateBbfs(visitedNodes[0], shortestPath1,shortestPath2);

    }

    visuaizeDFS() {
      if(this.state.boxes !== []){
        this.clearStyles();
        this.clearGridForNewAlgo();
      }
      const {boxes} = this.state;

      const start = boxes[10][10];
      const finish = boxes[13][45];
      const visitedNodes = dfs(boxes,start,finish);
      this.animateDfs(visitedNodes);
    }

    visuaizeGBFS() {
      if(this.state.boxes !== []){
        this.clearStyles();
        this.clearGridForNewAlgo();
      }
      console.log('Started gbfs');
      const {boxes} = this.state;

      const start = boxes[10][10];
      const finish = boxes[13][45];
      const visitedNodes = greedyBFS(boxes,start,finish);
      this.animateDfs(visitedNodes);

    }

    visualizeaSearch() {
      if(this.state.boxes !== []){
        this.clearStyles();
        this.clearGridForNewAlgo();
      }

      const {boxes} = this.state;
      // TO-D0 : start & finish are static for now
      const start = boxes[10][10];
      const finish = boxes[13][45];

      // apply dijkstra and get shortest part
      const visitedNodes = aSearch(boxes, start, finish);

      console.log(visitedNodes);

      const shortestPath = getNodesInShortestPathOrder(finish);

      this.animateDijkstra(visitedNodes, shortestPath);
    }

    handleMouseDown(row,col) {
      console.log("Down");
      const newgrid  = this.getNewGridWithWall(this.state.boxes,row,col);
      this.setState({
        boxes:newgrid,
        isMousePressed:true
      });
      document.getElementById(`node-${row}-${col}`).className = 'node-wall';

    }

    handleMouseEnter(row,col){
      console.log("Enter -"+row +'-'+col);

      if( ! this.state.isMousePressed ) return;
      const newGrid = this.getNewGridWithWall(this.state.boxes,row,col);
      this.setState({boxes:newGrid});
    }

    handleMouseUp(){
      console.log("Up");

      this.setState({isMousePressed:false});
    }


    getNewGridWithWall(grid,row,col){
      const newGrid = grid.slice();
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        iswall: !node.iswall,
        isVisited: !node.isVisited
      };
      console.log(newNode)
      newGrid[row][col] = newNode;
      return newGrid;
    }

    render() {
        const {boxes} = this.state;

        return (
            <div>

                <Header dijkstra={()=>this.visualizeDijkstra()}
                        bfs={() => this.visuaizeBFS()}
                        gbfs={() => this.visuaizeGBFS()}
                        dfs={() => this.visuaizeDFS()}
                        bbfs={() => this.visualizeBBFS()}
                        astar={() => this.visualizeaSearch()}
                        clearGrid={() => this.clearGrid()}
                        randomGrid={() => this.randomGrid()}
                ></Header>


              <div className="grid-container">
                     { console.log(this.state.boxes)}
                      {  // console.log("render")
                      }
                    {

                    boxes.map((row,pos) => {
                        return(
                        <div className="grid-row" key={`r-${pos}`}>
                          {/* {console.log("row"+row.isVisited)} */}

                        {row.map((c,pos2) => {

                          // console.log("col"+c.isVisited)


                            return( <GridBlock row={pos} col={pos2} key={`${pos}-${pos2}`} start={c.strt} end={c.end} mouseIsPressed={this.state.isMousePressed} iswall={c.iswall}

                            onMouseDown ={(row,col) => this.handleMouseDown(row,col)}
                            onMouseEnter = {(row,col) => this.handleMouseEnter(row,col)}
                            onMouseUp={() => this.handleMouseUp()}

                            ></GridBlock>)})

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