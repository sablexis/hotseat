import React from 'react';
import { Button } from '@mui/material';
//import { cardCycler } from './GameCards';


function CardCyclerButton(props) {
    return(
        <button className = "newCard-button" class= "outline" onClick={props.onClick}>
            <i className="fa-solid fa-circle-plus"></i>
        </button>
    )
}

export default CardCyclerButton;