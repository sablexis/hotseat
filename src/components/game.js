'use client';

//import 'src/app/page.js';
import React, {useState} from 'react';
import Cards from './cards';
import { getRandomItem } from "./CardData";
import { IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import "./game.css"
import useTheme from '@mui/material';


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
              <IconButton size='large'
              color='secondary'
              onClick={handleCyclerClick}>
                    <RestartAltIcon fontSize='inherit'/>
              </IconButton>
            {/* <CardCyclerButton onClick={handleCyclerClick} /> */}
        </div>
    );
}