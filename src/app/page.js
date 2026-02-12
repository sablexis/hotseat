import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import React from "react";
import styles from './page.module.css';
import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button"
import { IconPlayerPlay } from "@tabler/icons-react";
import ThemeToggle from "@/components/ThemeToggle";

const Home = async () => {
  const session = await getServerSession(options);

  return(
    <section className={styles.Home}>
      <div className="fixed bottom-20 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="firstPage">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <div className="content-wrapper">
          <h2 className="title">
          hot seat: the game
          <span className="title-emoji bounce">🔥</span>
          </h2>
          <div id="btn-container" className="flex flex-col gap-2">
              {session ? (
                <Button variant="default" asChild>
                  <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
                </Button>
              ) : (
                <Button variant="default" asChild>
                  <Link href="/api/auth/signin?callbackUrl=/">Login</Link>
                </Button>
              )}
            <Button
              className="new-game-btn"
              variant="outline"
              asChild
            >
              <Link href="/startAGame"><IconPlayerPlay /> New Game!</Link>
            </Button>

            {session && (
              <Button
                className="member-area-btn"
                variant="default"
                asChild
              >
                <Link href="/Member">My Decks</Link>
              </Button>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
