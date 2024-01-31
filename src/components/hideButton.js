import React from 'react';


function HideButton(props) {
    return (
        <button className= "hide-button" onClick={props.onClick}>
             <i className="fa-regular fa-circle-xmark"></i>
        </button>
    );

}

export default HideButton;