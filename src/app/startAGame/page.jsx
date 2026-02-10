'use client';

import Image from "next/image";
import Script from "next/script";
import React from "react";
import NewGame from "../../components/game";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function StartAGame() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div className="min-h-screen flex flex-col">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <div className="flex-1">
        <NewGame />
      </div>
    </div>
  )
}

