import GameCards from "./GameCards";
import React from 'react';
import "./game.css"


//import {cardCycler} from './GameCards';


export default function Cards({cardText}) {

  return (
    <div className = "card-holder" >
      <GameCards cardText = {cardText} />
    </div>
  );
  
          
 }

