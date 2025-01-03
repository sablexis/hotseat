"use client"
// depreciated 
import React, {useState} from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function NewCards(){

    const {data: session, status} = useSession()

   /*  if (status != "authenticated") {
        redirect("/api/auth/signin?callbackUrl=/NewCards");
    }


const CreateDeck = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
  
    const handleAddQuestion = (newQuestion) => {
      setQuestions([...questions, newQuestion]);
    };

    const handleCreateDeck = async () =>{
        if (title && questions.length > 0) {
            const newDeck = new Deck({ title, questions, user: session.user.id });
            await newDeck.save();
    }
    };
}; */

    return(
        <div>
            <Button variant="contained" href="/Member">
               Back
            </Button>
        </div>
    )

}