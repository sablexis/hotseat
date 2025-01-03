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


export default function NewGame({deck}){
    
  const [showCardCyclerButton, setshowCardCyclerButton] = useState(true)
  const [cardText, setCardText] = useState('')
  const [deckOCards, setDeckOCards] = useState([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [currIndex, setCurrIndex] = useState(0)

  

/* 
 * Initial deck setup, inital shuffle
 */

// When component mounts OR new deck received:
useEffect(() => {
  if (deck?.cards) {
    const deckCopy = [...deck.cards];
  
    const shuffledDeckCopy = deckCopy.sort(() => 0.5 - Math.random());
    setDeckOCards(shuffledDeckCopy);
    setCurrIndex(0);
    setIsShuffled(true);
  
  }
}, [deck]); 


  function handleCyclerClick(){
      
    if (currIndex >= deck.cards.length) {
      // reshuffle
      const deckCopy = [...deckOCards];

      const shuffledDeckCopy = deckCopy.sort((a,b) => 0.5 - Math.random());
      setDeckOCards(shuffledDeckCopy);
      setCurrIndex(0);

    }

    else {
      setCurrIndex(prevIndex => prevIndex + 1); 
    }
    const card = getRandomItem(deckOCards);
    setCardText(card);
    
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