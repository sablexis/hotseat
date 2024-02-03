'use client'
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { IconButton, PropTypes } from "@mui/material";
import React from "react";
import NewGame from "@/components/game";
import StartPage from "@/pages/Home";
import { Dialog, DialogTitle, List, ListItem } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from "@mui/base";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import  styles from './page.module.css';




export default function Home() {
  
  function spinUpGame(){
    <Link href="/game"></Link>
  }

  return(
    <section className={styles.Home}>
      <div className="firstPage">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      {/* <Script src="https://kit.fontawesome.com/f7b7deab76.js" crossorigin="anonymous"></Script> */}
      <h2>hot seat: the game 🔥</h2>
      <div className="newGameBtnDiv">
      <Button variant="outlined" 
      startIcon={<PlayCircleOutlineIcon />}>
        New Game
      </Button>
      <Link href="/startAGame">New Game!</Link>
      </div>
    </div>
    </section>
    
    )
}

