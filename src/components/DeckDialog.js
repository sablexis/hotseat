"use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//import Decks from '@/app/models/Decks';


function DeckDialog({onClose, open, deck}) {
  const router = useRouter();


  const handleListItemClick = (e, path) => {
    onClose();

    if (path === "/decks/{deckId}/edit") {
      router.push(`decks/${deck._id}/edit`)
        
    }

    if (path === "/decks/{deckId}/play") {
      router.push(`decks/${deck._id}/play`)
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <List sx={{ pt: 0 }}>
        
          <ListItem disablePadding>
            <ListItemButton onClick={(e) => handleListItemClick(e, "/decks/{deckId}/edit")}>
              <ListItemText primary="Edit The Deck"/>
            </ListItemButton>
          </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton onClick={(e) => handleListItemClick(e, "/decks/{deckId}/play")}>
            <ListItemText primary="Play with this deck" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

DeckDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  deck: PropTypes.object.isRequired,
};
 

  
  




  export default  DeckDialog;