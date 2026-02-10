/**
 * Main HotSeat functionality is taken care of here.
 * Takes in array of either pre-defined cards or user created deck of cards
 * 
 */

'use client';

//import 'src/app/page.js';
import React, {useEffect, useState} from 'react';
import Cards from './cards';
import { IconRotate } from '@tabler/icons-react';
import { getRandomItem } from './cardData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import "./game.css"
import { cardList } from './cardData';
import { Button } from "@/components/ui/button"



export default function NewGame({ customDeck, deck }){
    // there is so much dead code here we should come back and clean this up
  const [showCardCyclerButton, setshowCardCyclerButton] = useState(true)
  const [cardText, setCardText] = useState('')
  const [deckOCards, setDeckOCards] = useState([])
  const [isShuffled, setIsShuffled] = useState(false)
  const [currIndex, setCurrIndex] = useState(0)
  // const [open, setOpen] = useState(false);
  

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
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl">
          {/* Rules button positioned above the card */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mb-4">Rules</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Hot Seat:<br></br> The Drinking Game 🔥</DialogTitle>
                <DialogDescription>
                   Designate who's up first and the following order of players. The player on the hot seat reads their random question/action aloud. If the question is one you wish not to ask, you must drink and tap 'new card' to pull a new card from the pile, if the question is directed at another player and they wish not to answer they must drink.
                </DialogDescription>
              </DialogHeader>

              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* Card content */}
          <Cards cardText={cardText} />

          {/* Cycle button below the card */}
          <div className="flex items-center gap-2 mt-4">
            <Button variant="secondary" size="icon" className="size-8" onClick={handleCyclerClick}>
              <IconRotate />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}