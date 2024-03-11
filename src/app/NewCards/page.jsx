"use client"

import React, {useState} from "react";
import NewCardInputForm from "@/components/newCardInputForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import {Decks} from "../models/Decks";


export default function NewCards(){

    const {data: session, status} = useSession()

    if (status != "authenticated") {
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
};

    return(
        <div>
            <NewCardInputForm/>
            <Link href = "/Member">Back</Link>
        </div>
    )

}