import React, { Component } from 'react';
import GridBlock from './GridBlock';

export default class GridLayout extends Component {

    constructor(props){
        super();
        this.state={
            boxes:[]
        }
    }

    componentDidMount(){
        const b=[];
        for(let r=0;r<15;r++){
            const row=[];
            for(let c=0;c<50;c++){
                row.push([]);
            }
            b.push(row)
        }
        this.setState({
            boxes:b
        })
    }
    render() {
        const {boxes} = this.state;
        console.log(boxes);

        return (
            <div>
{            console.log(this.state.boxes)
}                
                {
                
                boxes.map((row,pos) => {
                    return(
                    <div key={`c-${pos}`}>
                    {row.map((c,pos2) => <GridBlock key={`${pos}-${pos2}`}></GridBlock>)}
                    </div>
                    );
                })
                }  
                
            </div>
        )
    }
}
