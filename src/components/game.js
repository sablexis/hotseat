'use client';

//import 'src/app/page.js';
import React, {useState} from 'react';
import Cards from './cards';
import HideButton from "./hideButton";
import CardCyclerButton from "./CardCyclerButton";
import { getRandomItem } from "./CardData";
import RulesCard from "./RulesCard";
import "@picocss/pico";
import "./game.css"

export default function NewGame(){
    
  const [showRulesCard, setshowRulesCard] = useState(true)
  const [showCardCyclerButton, setshowCardCyclerButton] = useState(false)
  const [cardText, setCardText] = useState('')

  function handleHideClick(){
      
    setshowRulesCard(false);
    setshowCardCyclerButton(true);
    
  }


  function handleCyclerClick(){
      
    const card = getRandomItem();
    setCardText(card.text);
    
  }
    
    return(
        <article className="gameSpace">
          <Cards showRulesCard={showRulesCard} cardText={cardText} />
          {showCardCyclerButton && <CardCyclerButton onClick={handleCyclerClick} />}
          {!showCardCyclerButton && <HideButton onClick={handleHideClick} />}
        </article>
    )
}