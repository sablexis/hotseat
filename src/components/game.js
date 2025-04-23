/**
 * Main HotSeat functionality is taken care of here.
 * Takes in array of either pre-defined cards or user created deck of cards
 * 
 */

'use client';

//import 'src/app/page.js';
import React, {useEffect, useState} from 'react';
import Cards from './cards';
import { getRandomItem } from './cardData';
import { IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import "./game.css"
import useTheme from '@mui/material';
import { cardList } from './cardData';


export default function NewGame({ customDeck, deck }){
    // there is so much dead code here we should come back and clean this up
  const [showCardCyclerButton, setshowCardCyclerButton] = useState(true)
  const [cardText, setCardText] = useState('')
  const [deckOCards, setDeckOCards] = useState([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [currIndex, setCurrIndex] = useState(0)

/* 
 * Initial deck setup, initial shuffle
 */

// When component mounts:
useEffect(() => {
  // Prioritize deck prop, then customDeck, then fallback to default cardList
  const deckToUse = deck?.cards || customDeck || cardList;
  
  // Ensure we're working with an array of card texts
  const cardTexts = Array.isArray(deckToUse) 
    ? deckToUse 
    : (deckToUse.map ? deckToUse.map(card => card.text || card) : cardList);

  const shuffledDeckCopy = [...cardTexts].sort(() => 0.5 - Math.random());
  setDeckOCards(shuffledDeckCopy);
  setCardText(shuffledDeckCopy[0]);
  setIsShuffled(true);
}, [customDeck, deck]); 


/**
 * function handleCyclerClick
 * upon clicking cycle button populate cardText with random String from array of cards
 * 
 */
  function handleCyclerClick(){
      
    const nextIndex = (currIndex + 1) % deckOCards.length;
    setCurrIndex(nextIndex);
    setCardText(deckOCards[nextIndex]);
  }
     
    return(
      
        <div className="gameSpace">

              <Cards cardText={cardText} />
              <IconButton size='large'
              color='secondary'
              onClick={handleCyclerClick}>
                    <RestartAltIcon fontSize='inherit'/>
              </IconButton>
            {/* <CardCyclerButton onClick={handleCyclerClick} /> */}
        </div>
    );
}