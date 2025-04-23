'use client';

import Image from "next/image";
import Script from "next/script";
import { IconButton, PropTypes } from "@mui/material";
import React from "react";
import NewGame from "@/components/game";
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
    <NewGame />
    </div>
    )
}

