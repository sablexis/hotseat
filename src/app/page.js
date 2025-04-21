import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import React from "react";
import styles from './page.module.css';
import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { Button, Box } from "@mui/material";
import ThemeToggle from "@/components/ThemeToggle";

const Home = async () => {
  const session = await getServerSession(options);

  return(
    <section className={styles.Home}>
      <div className="firstPage">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <ThemeToggle />
        </Box>
        <h2>hot seat: the game 🔥</h2>

        {session ? (
          <Button variant="contained" href="/api/auth/signout?callbackUrl=/">
            Logout
          </Button>
        ) : (
          <Button variant="contained" href="/api/auth/signin?callbackUrl=/">
            Login
          </Button>
        )}
      
        <div className="newGameBtnDiv">
          <Button variant="outlined" startIcon={<PlayCircleOutlineOutlinedIcon />} href="/startAGame">
            New Game!
          </Button>
        </div>
        <div className="MemArea">
          {session && (
            <Button variant="contained" href="/Member">
              My Decks 
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
