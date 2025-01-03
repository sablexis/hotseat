"use client"

import {React, useState, useEffect} from "react";
import { useParams } from "next/navigation";
import NewGame from "@/components/game";
import { Box, Button } from "@mui/material";


const PlayWithDecks = () => {

    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const response = await fetch(`/api/decks/${deckId}`);
                if (!response.ok) throw new Error('Failed to fetch deck');
                const data = await response.json();
                setDeck(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (deckId) fetchDeck();
    }, [deckId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!deck) return <div>No deck found</div>;

        return(
            <Box>
            <Box>
                <NewGame deck={deck} />
                
            </Box>
            <Box>
                <Button variant="contained" href="/Member">
                    Back
                </Button>
            </Box>
            </Box>

        );

};

export default PlayWithDecks