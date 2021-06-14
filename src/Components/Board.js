import React from 'react';

function Board(props) {

    const drop = e => {
        e.preventDefault();

        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        console.log('drop '+ card.id);
        card.style.display ='block';    
        e.target.appendChild(card);
        console.log('r'+props.row+'c'+props.col);
        props.funcChd([props.row,props.col]);
        console.log('after drop funcchild' )
        // props.grdRender();

    }

    const dragOver = e=>{
        e.preventDefault();
    }

    return (
        <div
            id = {props.id}
            onDrop={drop}
            onDragOver={dragOver}
            className={props.className}
        >
            {props.children}
        </div>
    )
}

export default Board
