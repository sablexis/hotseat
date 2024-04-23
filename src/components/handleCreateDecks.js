import Decks from 'src/app/models/Decks.js';
import React from 'react';
import { useSession } from 'next-auth/react';


const {data: session, status} = useSession();


const createDeck = async ({title, questions}) => {
    try {
        const newDeck = new Decks ({
        title,
        questions,
        user: session?.user?.id
    });
    await newDeck.save();
    } catch (error){
        console.error("Error creating deck:", error);
    }
    
}