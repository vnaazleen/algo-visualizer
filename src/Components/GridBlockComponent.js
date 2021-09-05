import React, { Component } from 'react';
import '../css/gridblock.css';
import GridLayout from './GridLayoutComponent';

export default class GridBlockComponent extends Component {

    constructor(props) {
        super(props);
    }

    funcChild = (val) => {
        this.props.chng.func(val);
    }

    render() {
        const st = < i className = "fa fa-chevron-right" > < /i>
        const ed = < i className = "fa fa-circle" > < /i>

        const onMouseDown = this.props.onMouseDown;
        const onMouseUp = this.props.onMouseUp;
        const onMouseEnter = this.props.onMouseEnter;

        const clsName = this.props.iswall ? "node-wall" : '';

        const s = ((this.props.row == this.props.startnode[0]) && (this.props.col == this.props.startnode[1]));
        const e = ((this.props.row == this.props.endnode[0]) && (this.props.col == this.props.endnode[1]));

        return ( <
            div id = { `node-${this.props.row}-${this.props.col}` }
            className = { `grid-block ${this.props.start ? 'start' : this.props.end ? 'end' : 'unvisited'} ${clsName}` }
            onMouseDown = {
                () => this.props.onMouseDown(this.props.row, this.props.col) }
            onMouseEnter = {
                () => this.props.onMouseEnter(this.props.row, this.props.col) }
            onMouseUp = {
                () => this.props.onMouseUp() } > < /div>
        );
    }
}