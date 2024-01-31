import React from 'react';
import "@picocss/pico";



function HideButton(props) {
    return (
        <button className= "hide-button" class = "outline" onClick={props.onClick}>
             <i className="fa-regular fa-circle-xmark"></i>
        </button>
    );

}

export default HideButton;