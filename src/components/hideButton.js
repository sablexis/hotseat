import React from 'react';
import { Button } from '@mui/material';
import "./game.css"

function HideButton(props) {
    return (
        <button className= "hide-button" class = "outline" onClick={props.onClick}>
             <i className="fa-regular fa-circle-xmark"></i>
        </button>
    );

}

export default HideButton;