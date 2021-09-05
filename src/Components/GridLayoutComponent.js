import React, { Component } from 'react';
import GridBlock from './GridBlockComponent';
import Header from './HeaderComponent';
import Chooser from './Algo-chooserComponent';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/Dijkstra';
import { getNodesInShortestPathOrderBbfs } from '../Algorithms/biDirectionalBfs';
import { bfs } from '../Algorithms/bfs';
import { dfs } from '../Algorithms/dfs';
import { greedyBFS } from '../Algorithms/greedybfs';
import { biDirectionalBfs } from '../Algorithms/biDirectionalBfs';
import { aSearch } from '../Algorithms/Asearch';


class GridLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boxes: [],
            start: [1, 10],
            changed: false,
            end: [13, 45],
            unchanged: true,
            speed: { slow: 1000, normal: 100, fast: 10 },
            curSpeed: 10
        }
    }

    componentDidUpdate() {
        if (this.state.changed) {
            console.log(document.getElementById(`node-${this.state.start[0]}-${this.state.start[1]}`));
            console.log('in getderivedstate');
            let val2 = this.gridRender();
            this.setState({
                boxes: val2
            })
            console.log(document.getElementById(`node-${this.state.start[0]}-${this.state.start[1]}`));
            console.log(this.state.boxes);
        }
    }

    componentDidMount() {
        let val = this.gridRender();
        this.setState({
                boxes: val
        })
    }

    change = (val) => {
        console.log("before state:", this.state);

        this.setState({
            changed: true,
            start: val,
            unchanged: false
        }, () => {

            console.log("after state ", this.state.start);
            this.setState({
                changed: false,
            })
        });
    }

    gridRender() {
        const b = [];
        for (let row = 0; row < 26; row++) {
            const currRow = [];
            for (let col = 0; col < 60; col++) {

                const val = {
                    row,
                    col,
                    strt: row === this.state.start[0] && col === this.state.start[1],
                    end: row === this.state.end[0] && col === this.state.end[1],
                    startnode: this.state.start,
                    endnode: this.state.end,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null,
                    isBbfs: false,
                    iswall: false,
                    isweight: false,
                    cost: 0,
                    aDis: 0
                };
                currRow.push(val);
            }
            b.push(currRow)
        }

        return b;
    }


    grdRender(r, c) {
        const b = [];
        for (let row = 0; row < 26; row++) {
            const currRow = [];
            for (let col = 0; col < 60; col++) {

                const val = {
                    row,
                    col,
                    strt: row === 1 && col === 5,
                    end: row === this.state.end[0] && col === this.state.end[1],
                    startnode: this.state.start,
                    endnode: this.state.end,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null,
                    isBbfs: false,
                    iswall: false,
                    isweight: false,
                    cost: 0,
                    aDis: 0
                };
                currRow.push(val);
                document.getElementById(`node-${row}-${col}`).className = 'unvisited';
            }
            b.push(currRow)
        }

        this.setState({
            boxes: b
        })
    }


    gridRerender() {
        const b = [];
        for (let row = 0; row < 26; row++) {
            const currRow = [];
            for (let col = 0; col < 60; col++) {

                const val = {
                    row,
                    col,
                    strt: row === this.state.start[0] && col === this.state.start[1],
                    end: row === this.state.end[0] && col === this.state.end[1],
                    startnode: this.state.start,
                    endnode: this.state.end,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null,
                    iswall: false,
                    isBbfs: false,
                    isweight: false,
                    cost: 0,
                    aDis: 0
                };
                currRow.push(val);
                if (!val.strt && !val.end)
                    document.getElementById(`node-${row}-${col}`).className = '';
                if (val.strt) {
                    document.getElementById(`node-${row}-${col}`).className = 'start';
                } else if (val.end) {
                    document.getElementById(`node-${row}-${col}`).className = 'end';
                }
            }
            b.push(currRow)
        }

        return b;
    }

    clearStyles(st) {
        const val = this.state.boxes;
        for (let row = 0; row < val.length; row++) {
            for (let col = 0; col < val[0].length; col++) {
                const node = val[row][col];
                if (node.strt) {
                    document.getElementById(`node-${row}-${col}`).className = 'start';
                } else if (node.end) {
                    document.getElementById(`node-${row}-${col}`).className = 'end';
                }
                if (st) {
                    if (!node.iswall && !node.isweight && !node.strt && !node.end) {
                        document.getElementById(`node-${row}-${col}`).className = '';
                    }
                } else {
                    if (!node.iswall && !node.strt && !node.end) {
                        document.getElementById(`node-${row}-${col}`).className = '';
                    }
                }
            }
        }
    }

    generateNewGridWithPreviousWalls() {
        const b = [];
        for (let row = 0; row < 26; row++) {
            const currRow = [];
            for (let col = 0; col < 60; col++) {
                const boxes = this.state.boxes;
                const node = boxes[row][col];
                const val = {
                    row,
                    col,
                    strt: row === this.state.start[0] && col === this.state.start[1],
                    end: row === this.state.end[0] && col === this.state.end[1],
                    startnode: this.state.start,
                    endnode: this.state.end,
                    distance: Infinity,
                    aDis: 0,
                    aEndDis: 0,
                    isVisited: node.iswall ? node.isVisited : false,
                    isweight: false,
                    cost: 0,
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

    randomGridGeneration() {
        const b = []
        if (!this.state.running) {
            for (let row = 0; row < 26; row++) {
                const c = [];
                for (let col = 0; col < 60; col++) {
                    const ran = Math.floor(Math.random() * 5 + 1);
                    const box = this.state.boxes;


                    const node = box[row][col];

                    const val = {
                        row,
                        col,
                        strt: node.strt,
                        end: node.end,
                        distance: Infinity,
                        startnode: this.state.start,
                        endnode: this.state.end,
                        aDis: 0,
                        aEndDis: 0,
                        isVisited: !this.prime(ran) && !node.strt && !node.end ? true : false,
                        previousNode: null,
                        isweight: false,
                        cost: 0,
                        iswall: !this.prime(ran) && !node.strt && !node.end ? true : false
                    };
                    if (!this.prime(ran) && !node.strt && !node.end) {
                        document.getElementById(`node-${row}-${col}`).className += ' node-wall';
                    }
                    c.push(val);
                }
                b.push(c)
            }
        }
        return b;
    }

    randomWeightGeneration() {
        const b = []
        if (!this.state.running) {
            for (let row = 0; row < 26; row++) {
                const c = [];
                for (let col = 0; col < 60; col++) {
                    const ran = Math.floor(Math.random() * 5 + 1);
                    const box = this.state.boxes;


                    const node = box[row][col];

                    const val = {
                        row,
                        col,
                        strt: node.strt,
                        end: node.end,
                        distance: Infinity,
                        startnode: this.state.start,
                        endnode: this.state.end,
                        aDis: 0,
                        aEndDis: 0,
                        isVisited: false,
                        previousNode: null,
                        isweight: !this.prime(ran) && !node.strt && !node.end ? true : false,
                        cost: !this.prime(ran) && !node.strt && !node.end ? 5 : 0,
                        iswall: false
                    };
                    if (!this.prime(ran) && !node.strt && !node.end) {
                        document.getElementById(`node-${row}-${col}`).className += ' node-weight';
                    }
                    c.push(val);
                }
                b.push(c)
            }
        }
        return b;
    }

    prime(num) {

        if (num === 1) {
            return false
        } else {
            for (let i = 2; i < this.prime; i++) {
                if (num % i === 0) {
                    return false
                }
            }
        }
        return true
    }

    even(num) {

        if (num % 2 === 0) {
            return true;
        }
        return false
    }

    randomGrid() {
        if (this.state.boxes !== []) {
            this.clearStyles();
            this.clearGridForNewAlgo();
        }
        const val = this.randomGridGeneration();
        this.setState({
            boxes: val
        })
    }

    randomWeight() {
        if (this.state.boxes !== []) {
            this.clearStyles();
            this.clearGridForNewAlgo();
        }
        const val = this.randomWeightGeneration();
        this.setState({
            boxes: val
        })
    }


    verticalSkew() {
        if (this.state.boxes !== []) {
            this.clearStyles();
            this.clearGridForNewAlgo();
        }
        const val = this.verticalGridGeneration();
        this.setState({
            boxes: val
        })
    }

    horizontalSkew() {

    }



    clearGrid() {
        if (!this.state.running) {
            console.log(this.state.running);
            let val = this.gridRerender();
            this.setState({
                boxes: val
            });
        } else {
            prompt("Algo is running");
        }

    }

    clearGridForNewAlgo() {
        let val = this.generateNewGridWithPreviousWalls();
        this.setState({
            boxes: val
        })
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                console.log("short")
                console.log(node);
                console.log(node.row + " " + node.col);

                document.getElementById(`node-${node.row}-${node.col}`).className +=
                    ' node node-shortest-path';
            }, this.state.curSpeed * i);
        }
    }

    animateDijkstra(visitedNodes, shortestPath) {

        // if we reach the finish node
        for (let i = 0; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length - 1) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, this.state.curSpeed * i);
                return;
            }

            console.log("this.state.curSpeed");
            setTimeout(() => {
                const node = visitedNodes[i];
                console.log(node)
                console.log(node.row + " " + node.col);
                console.log(document.getElementById(`node-${node.row}-${node.col}`).className)
                document.getElementById(`node-${node.row}-${node.col}`).className +=
                    ' node node-visited';
            }, this.state.curSpeed * i);
        }
    }



    animateBfs(visitedNodes, shortestPath) {

        // if we reach the finish node
        for (let i = 0; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length - 1) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, this.state.curSpeed * i);
                return;
            }

            setTimeout(() => {
                const node = visitedNodes[i];
                console.log(node);
                document.getElementById(`node-${node.row}-${node.col}`).className +=
                    ' node node-visited';
            }, this.state.curSpeed * i);
        }
    }

    animateBbfs(visitedNodes, shortestPath1, shortestPath2) {

        // if we reach the finish node
        for (let i = 0; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length - 1) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath1);
                    this.animateShortestPath(shortestPath2);
                }, this.state.curSpeed * i);
                return;
            }

            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className +=
                    ' node node-visited';
            }, this.state.curSpeed * i);
        }
    }

    animateDfs(visitedNodes) {

        // if we reach the finish node
        for (let i = 0; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length - 1) {
                setTimeout(() => {
                    console.log(visitedNodes);
                    this.animateShortestPath(visitedNodes);
                }, this.state.curSpeed * i);
                return;
            }

            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className +=
                    ' node node-visited';
            }, this.state.curSpeed * i);
        }
    }

    // speed

    fast() {
        console.log("lay fast", this.state.curSpeed)
        this.setState({
            curSpeed: this.state.speed.fast
        })
        console.log("lay fast after", this.state.curSpeed)

    }

    normal() {
        console.log("lay normal", this.state.curSpeed)
        this.setState({
            curSpeed: this.state.speed.normal
        })
        console.log("lay normal after", this.state.curSpeed)
    }

    slow() {
        console.log("lay slow", this.state.curSpeed)

        this.setState({
            curSpeed: this.state.speed.slow
        })
        console.log("lay slow after", this.state.curSpeed)
    }


    visualizeDijkstra() {
        if (this.state.boxes !== []) {
            this.clearStyles(true);
            this.clearGridForNewAlgo();
        }


        const { boxes } = this.state;
        // TO-D0 : start & finish are static for now
        const start = boxes[this.state.start[0]][this.state.start[1]];
        const finish = boxes[this.state.end[0]][this.state.end[1]];

        start.strt = true;
        finish.finish = false;

        // apply dijkstra and get shortest part
        const visitedNodes = dijkstra(boxes, start, finish);

        console.log(visitedNodes);
        const shortestPath = getNodesInShortestPathOrder(finish);

        this.animateDijkstra(visitedNodes, shortestPath);

        console.log("running true");

        console.log('running false')
    }

    visuaizeBFS() {
        if (this.state.boxes !== []) {
            this.clearStyles(false);
            this.clearGridForNewAlgo();
        }
        const { boxes } = this.state;

        const start = boxes[this.state.start[0]][this.state.start[1]];
        const finish = boxes[this.state.end[0]][this.state.end[1]];

        start.strt = true;
        finish.finish = false;

        const visitedNodes = bfs(boxes, start, finish);

        console.log(visitedNodes);

        const shortestPath = getNodesInShortestPathOrder(finish);
        console.log(shortestPath);

        this.animateBfs(visitedNodes, shortestPath);

    }

    visualizeBBFS() {
        if (this.state.boxes !== []) {
            this.clearStyles(false);
            this.clearGridForNewAlgo();
        }
        const { boxes } = this.state;

        const start = boxes[this.state.start[0]][this.state.start[1]];
        const finish = boxes[this.state.end[0]][this.state.end[1]];

        const visitedNodes = biDirectionalBfs(boxes, start, finish);
        console.log('bbfs');
        console.log(visitedNodes);

        const shortestPath2 = getNodesInShortestPathOrderBbfs(visitedNodes[1]);
        const shortestPath1 = getNodesInShortestPathOrderBbfs(visitedNodes[2]);


        console.log(shortestPath1, shortestPath2);

        this.animateBbfs(visitedNodes[0], shortestPath1, shortestPath2);

    }

    visuaizeDFS() {
        if (this.state.boxes !== []) {
            this.clearStyles(false);
            this.clearGridForNewAlgo();
        }
        const { boxes } = this.state;

        const start = boxes[this.state.start[0]][this.state.start[1]];
        const finish = boxes[this.state.end[0]][this.state.end[1]];

        const visitedNodes = dfs(boxes, start, finish);
        this.animateDfs(visitedNodes);
    }

    visuaizeGBFS() {
        if (this.state.boxes !== []) {
            this.clearStyles(true);
            this.clearGridForNewAlgo();
        }
        console.log('Started gbfs');
        const { boxes } = this.state;

        const start = boxes[this.state.start[0]][this.state.start[1]];
        const finish = boxes[this.state.end[0]][this.state.end[1]];

        const visitedNodes = greedyBFS(boxes, start, finish);
        this.animateDfs(visitedNodes);

    }

    visualizeaSearch() {
        if (this.state.boxes !== []) {
            this.clearStyles(true);
            this.clearGridForNewAlgo();
        }

        const { boxes } = this.state;
        // TO-D0 : start & finish are static for now
        const start = boxes[this.state.start[0]][this.state.start[1]];
        const finish = boxes[this.state.end[0]][this.state.end[1]];

        // apply dijkstra and get shortest part
        const visitedNodes = aSearch(boxes, start, finish);

        console.log(visitedNodes);

        const shortestPath = getNodesInShortestPathOrder(finish);

        this.animateDijkstra(visitedNodes, shortestPath);
    }

    clearSurround(row, col) {
        if (row != 0)
            document.getElementById(`node-${row - 1}-${col}`).className = 'gridblock unvisited';
        if (col != 0)
            document.getElementById(`node-${row}-${col - 1}`).className = 'gridblock unvisited';
        if (col != 53)
            document.getElementById(`node-${row}-${col + 1}`).className = 'gridblock unvisited';
        if (row != 20)
            document.getElementById(`node-${row + 1}-${col}`).className = 'gridblock unvisited';

    }

    handleMouseDown(row, col) {
        console.log("Down");
        const node = this.state.boxes[row][col]
        console.log(node)
        if (!node.strt && !node.end) {
            const newgrid = this.getNewGridWithWall(this.state.boxes, row, col);
            this.setState({
                boxes: newgrid,
                isMousePressed: true
            });
            console.log("wall -", row, col);
            document.getElementById(`node-${row}-${col}`).className = 'node-wall';
        } else if (node.strt) {
            this.setState({
                isStartPressed: true
            });
            console.log(" -", row, col);
            // document.getElementById(`node-${row}-${col}`).className = '';
        } else if (node.end) {
            this.setState({
                isEndPressed: true
            });
            console.log(" -", row, col);
            // document.getElementById(`node-${row}-${col}`).className = '';
        }


    }

    handleMouseEnter(row, col) {
        console.log("Enter -" + row + '-' + col);
        const node = this.state.boxes[row][col]

        if (!this.state.isMousePressed && !this.state.isStartPressed && !this.state.isEndPressed) return;
        if (this.state.isMousePressed) {
            if (!node.strt && !node.end) {
                const newGrid = this.getNewGridWithWall(this.state.boxes, row, col);
                this.setState({ boxes: newGrid });
            }
        } else if (this.state.isStartPressed) {
            document.getElementById(`node-${row}-${col}`).className = '';
            document.getElementById(`node-${row}-${col}`).className = 'start';
            this.setState({
                // boxes:newGrid,
                start: [row, col],
                changed: true
            }, () => {
                this.setState({
                    changed: false
                })
            })
            this.clearSurround(row, col);
        } else if (this.state.isEndPressed) {
            document.getElementById(`node-${row}-${col}`).className = '';
            document.getElementById(`node-${row}-${col}`).className = 'end';
            this.setState({
                end: [row, col],
                changed: true
            }, () => {
                this.setState({
                    changed: false
                })
            })
            this.clearSurround(row, col);
        }
    }

    handleMouseUp() {
        console.log("Up");
        if (this.state.isMousePressed) {
            this.setState({ isMousePressed: false });
        } else if (this.state.isStartPressed) {
            this.setState({ isStartPressed: false });
        } else if (this.state.isEndPressed) {
            this.setState({ isEndPressed: false });
        }
    }


    getNewGridWithWall(grid, row, col) {
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
        const { boxes } = this.state;


        console.log('start state ::', this.state.start);

        return ( <div >


            <Header dijkstra = {
                () => this.visualizeDijkstra()
            }
            bfs = {
                () => this.visuaizeBFS()
            }
            gbfs = {
                () => this.visuaizeGBFS()
            }
            dfs = {
                () => this.visuaizeDFS()
            }
            bbfs = {
                () => this.visualizeBBFS()
            }
            astar = {
                () => this.visualizeaSearch()
            }
            clearGrid = {
                () => this.clearGrid()
            }
            randomGrid = {
                () => this.randomGrid()
            }
            randomWeight = {
                () => this.randomWeight()
            }
            fast = {
                () => this.fast()
            }
            slow = {
                () => this.slow()
            }
            normal = {
                () => this.normal()
            } >
            </Header>

            <div id = "display" > < /div>


            <div className = "grid-container" > {
                boxes.map((row, pos) => {
                        return ( <
                            div className = "grid-row"
                            key = { `r-${pos}` } > {
                                row.map((c, pos2) => {

                                        return ( 
                                          <GridBlock chng = {{ start: this.state.start, func: this.change.bind(this)}}
                                                    row = { pos }
                                                    col = { pos2 }
                                                    key = { `${pos}-${pos2}` }
                                                    start = { c.strt }
                                                    end = { c.end }
                                                    startnode = { this.state.start }
                                                    endnode = { this.state.end }
                                                    grdRender = { this.grdRender.bind(this) }
                                                    unchanged = { this.state.unchanged }
                                                    mouseIsPressed = { this.state.isMousePressed }
                                                    iswall = { c.iswall }
                                                    weight = { c.isweight }

                                                    onMouseDown = {
                                                      (row, col) => this.handleMouseDown(row, col)
                                                    }
                                                    onMouseEnter = {
                                                        (row, col) => this.handleMouseEnter(row, col)
                                                    }
                                                    onMouseUp = {
                                                        () => this.handleMouseUp()
                                                    }

                                          ></GridBlock>)
                                        })

                                } 
                              </div>
                            );})
            } </div>
          </div>
      )}
}

export default GridLayout;