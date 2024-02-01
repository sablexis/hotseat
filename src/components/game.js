'use client';

//import 'src/app/page.js';
import React, {useState} from 'react';
import Cards from './cards';
import HideButton from "./hideButton";
import CardCyclerButton from "./CardCyclerButton";
import { getRandomItem } from "./CardData";
import "./game.css"

export default function NewGame(){
    
  const [showCardCyclerButton, setshowCardCyclerButton] = useState(true)
  const [cardText, setCardText] = useState('')




  function handleCyclerClick(){
      
    const card = getRandomItem();
    setCardText(card.text);
    
  }
    
    return(
        <div className="gameSpace">
          <Cards cardText={cardText} />
          {showCardCyclerButton && <CardCyclerButton onClick={handleCyclerClick} />}
        </div>
    )
}