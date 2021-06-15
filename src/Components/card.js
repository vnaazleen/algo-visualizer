import React from 'react'

function card(props) {
    const dragStart =e =>{
        const target =e.target;
        e.dataTransfer.setData('card_id',target.id);
        console.log("drag start "+target.id);
        setTimeout(()=>{
            target.style.display='none';
        },0);
        // e.target.appendChild(card);
        // console.log('r'+props.row+'c'+props.col);
        // props.funcChd([props.row,props.col]);
    }

    const dragOver = e =>{
        e.stopPropagation();
    }
    return (
        <div
            id={props.id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    )
}

export default card