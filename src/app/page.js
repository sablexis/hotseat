import Image from "next/image";
import Script from "next/script";
import styles from "./page.module.css";
import React from "react";
import NewGame from "@/components/game";
import "@picocss/pico";

export default function Home() {
  return(
    <div>
    <Script src="https://kit.fontawesome.com/f7b7deab76.js" crossorigin="anonymous"></Script>
    <NewGame />
    </div>
    )
}
