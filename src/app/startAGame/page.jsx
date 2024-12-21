'use client';

import Image from "next/image";
import Script from "next/script";
import { IconButton, PropTypes } from "@mui/material";
import React from "react";
import NewGame from "@/components/game";
import { Dialog, DialogTitle, List, ListItem } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from "@mui/base";
import { useState } from "react";
import { useSession } from "next-auth/react";




export default function StartAGame() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    {/* <Script src="https://kit.fontawesome.com/f7b7deab76.js" crossorigin="anonymous"></Script> */}
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
    <NewGame />
    </div>
    )
}

