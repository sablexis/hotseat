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
import { IconButton, Dialog, DialogTitle, List, ListItem } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./game.css"
import { cardList } from './cardData';
import AdComponent from './AdComponent';



export default function NewGame({ customDeck, deck }){
    // there is so much dead code here we should come back and clean this up
  const [showCardCyclerButton, setshowCardCyclerButton] = useState(true)
  const [cardText, setCardText] = useState('')
  const [deckOCards, setDeckOCards] = useState([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [currIndex, setCurrIndex] = useState(0)
  const [open, setOpen] = useState(true);
  

  const handleClose = () => {
    setOpen(false);
  };

/* 
 * Initial deck setup, initial shuffle
 */

// When component mounts:
useEffect(() => {
  console.log('Deck props:', { customDeck, deck });
  
  // Prioritize deck prop, then customDeck, then fallback to default cardList
  const deckToUse = deck?.cards || customDeck || cardList;
  
  // Ensure we're working with an array of card texts
  const cardTexts = Array.isArray(deckToUse) 
    ? deckToUse.map(card => typeof card === 'object' ? card.text : card)
    : (deckToUse.map ? deckToUse.map(card => typeof card === 'object' ? card.text : card) : cardList.map(card => card.text));

  console.log('Card texts:', cardTexts);

  const shuffledDeckCopy = [...cardTexts].sort(() => 0.5 - Math.random());
  setDeckOCards(shuffledDeckCopy);
  setCardText(shuffledDeckCopy[0] || '');
  setIsShuffled(true);
}, [customDeck, deck]); 


/**
 * function handleCyclerClick
 * upon clicking cycle button populate cardText with random String from array of cards
 * 
 */
  function handleCyclerClick(){
    console.log('Current deck:', deckOCards);
    console.log('Current index:', currIndex);
      
    const nextIndex = (currIndex + 1) % deckOCards.length;
    setCurrIndex(nextIndex);
    setCardText(deckOCards[nextIndex] || '');
  }
     
    return(
      
        <div className="gameSpace">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
          <Dialog open = {open}>
                <DialogTitle align="center">Hot Seat:<br></br> The Drinking Game 🔥</DialogTitle>
                <List>
                      <ListItem alignItems="flex-start">Designate who's up first and the following order of players</ListItem>
                      <ListItem alignItems="flex-start">The player on the hot seat picks who they'd like a question from</ListItem>
                      <ListItem alignItems="flex-start">The person who's been picked to ask a question asks their question, If the question is one you wish not to ask, you must drink and tap 'new card' to pull a new card from the pile</ListItem>
                      <ListItem alignItems="flex-start">If the hot seat player wishes not to answer they must drink</ListItem>
                </List>
              <IconButton color="custom"
              onClick={handleClose}>
              <HighlightOffIcon/>
              </IconButton>
            </Dialog>
              <Cards cardText={cardText} />
              <IconButton size='large'
              color='secondary'
              onClick={handleCyclerClick}>
                    <RestartAltIcon fontSize='inherit'/>
              </IconButton>

            {/* <CardCyclerButton onClick={handleCyclerClick} /> */}
          <AdComponent/>
        </div>
    );
}