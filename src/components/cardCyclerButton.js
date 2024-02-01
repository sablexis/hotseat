import React from 'react';
import { IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
//import { cardCycler } from './GameCards';


function CardCyclerButton(props) {
    return(
        <IconButton
        color= "primary" 
        size = "large"
        onClick={props.onClick}>
            <RestartAltIcon fontSize='inherit'/>
        </IconButton>
    )
}

export default CardCyclerButton;