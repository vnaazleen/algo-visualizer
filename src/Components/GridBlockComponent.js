import React, { Component } from 'react';
import '../css/gridblock.css';

export default class GridBlockComponent extends Component {
    constructor(props){
        super(props);


    }
    render() {
        const st = <i className="fa fa-chevron-right"></i>
        const ed = <i className="fa fa-circle"></i>
        return (


            <>

               <div id={`node-${this.props.row}-${this.props.col}`} className={`grid-block
               ${
                   this.props.start ? 'start-node': this.props.end ? 'end-node' : ''
               }
               `}

               >
                   { this.props.start ? st:'' }
                   { this.props.end ? ed:'' }


                </div>
            </>
        )
    }
}
