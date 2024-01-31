import React from 'react';
//import { cardCycler } from './GameCards';


function CardCyclerButton(props) {
    return(
        <button className = "newCard-button" onClick={props.onClick}>
            <i className="fa-solid fa-circle-plus"></i>
        </button>
    )
}

export default CardCyclerButton;