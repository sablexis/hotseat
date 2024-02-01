import GameCards from "./GameCards";
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
  <div>
    <Card variant="outlined"
    sx={{
      boxShadow: 1,
      borderRadius: 2,
      top: 1/2,
      p: 2,
      minWidth: 300,
      minHeight: 8/10,
      zIndex: 'modal'
    }}>
      <CardContent>
      {cardText}
      </CardContent>
    </Card>
  </div>

    
  
  );
  
          
 }

