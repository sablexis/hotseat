"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NewGame from "@/components/game";
import { Button } from "@/components/ui/button";


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
            <div>
                <div>
                    <NewGame deck={deck} />
                </div>
                <div className="mt-4">
                    <Link href="/Member">
                        <Button>Back</Button>
                    </Link>
                </div>
            </div>

        );

};

export default PlayWithDecks