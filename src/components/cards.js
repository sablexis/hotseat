import React from 'react';
import "./game.css"
import { Card, Grid } from "@mui/material";
import { Container } from "@mui/system";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { sizing } from '@mui/system';



//import {cardCycler} from './GameCards';


export default function Cards({cardText}) {

  return (
    <div className="container">
      <div className="cardWContent">
      {cardText}
      </div>
    </div>
  

  );
  
          
 }

