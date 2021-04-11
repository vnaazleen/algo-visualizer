import React, { Component } from 'react';
import '../css/gridblock.css';

export default class GridBlockComponent extends Component {
    constructor(props){
        super(props);


    }

    render() {
        const st = <i className="fa fa-chevron-right"></i>
        const ed = <i className="fa fa-circle"></i>

        const onMouseDown = this.props.onMouseDown;
        const onMouseUp = this.props.onMouseUp;
        const onMouseEnter = this.props.onMouseEnter;
        
        const clsName =this.props.iswall ? "node-wall" : '' ;
        console.log(this.props.iswall)
       
        return (


            <>

               <div id={`node-${this.props.row}-${this.props.col}`} className={`grid-block ${clsName}`}

               onMouseDown={() => this.props.onMouseDown(this.props.row,this.props.col)}
               onMouseEnter={() => this.props.onMouseEnter(this.props.row,this.props.col)}
               onMouseUp={() => this.props.onMouseUp()}

               >
                   { this.props.start ? st:'' }
                   { this.props.end ? ed:'' }


                </div>
            </>
        )
    }
}
