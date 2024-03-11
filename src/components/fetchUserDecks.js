import Decks from 'src/app/models/Decks.js';
import { useSession } from 'next-auth/react';
import React from 'react';

const {data: session, status} = useSession()


const fetchUserDecks = async (userId) => {
    const userDecks = await Decks.find({user: session.user.id});
}