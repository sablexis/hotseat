import React from 'react';
import { RotateCw } from 'lucide-react';
//import { cardCycler } from './GameCards';


function CardCyclerButton(props) {
    return(
        <button
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={props.onClick}>
            <RotateCw size={32} className="text-primary" />
        </button>
    )
}

export default CardCyclerButton;