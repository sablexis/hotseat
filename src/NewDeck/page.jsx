"use client"

import React, {useState} from "react";
import NewCardInputForm from "@/components/newCardInputForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {Decks} from "../models/Decks";
import CreateDeck from "@/components/CreateDeck";


export default function NewDeck(){



    return(
        <div>
            <CreateDeck/>
            <Link href = "/Member">Back</Link>
        </div>
    )

}