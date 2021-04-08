import React, { Component } from 'react';
import '../css/gridblock.css';

export default class GridBlockComponent extends Component {
    constructor(props){
        super();


    }
    render() {
        console.log(this.props.start);

        return (
            <>
    
               <div className={`grid-block
               ${
                   this.props.start ? 'start-node': this.props.end ? 'end-node' : ''
               }
               `}
               
               >
                
                </div>
            </>
        )
    }
}
