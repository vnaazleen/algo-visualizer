import React, { Component } from 'react';
import GridBlock from './GridBlockComponent';

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

                const val = {
                    strt: r===0 && c===0,
                    end: r===13 && c===5
                };
                row.push(val);
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
            <div className="grid-container">
{            console.log(this.state.boxes)
}
                {

                boxes.map((row,pos) => {
                    return(
                    <div className="grid-row" key={`r-${pos}`}>
                    {row.map((c,pos2) => {
                        console.log(c.strt)
                        return( <GridBlock key={`${pos}-${pos2}`} start={c.strt} end={c.end}></GridBlock>)})

                }
                    </div>
                    );
                })
                }

            </div>
        )
    }
}
