"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import DeckDialog from './DeckDialog';

const DecksList = () => {
  const { data: session } = useSession();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);



  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch('/api/decks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store' // Disable caching for real-time data
        });

        if (!response.ok) {
          throw new Error('Failed to fetch decks');
        }

        const data = await response.json();
        setDecks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchDecks();
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!session) {
    return (
      <Alert className="m-4">
        <AlertDescription>Please log in to view your decks</AlertDescription>
      </Alert>
    );
  }
  
  const handleClose = () => {
    setOpen(false);
    setSelectedValue(null);
  };


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Decks</h2>
        <Link href="/new-deck-creator">
          <Button>Create New Deck</Button>
        </Link>
      </div>

      

      {decks.length === 0 ? (
        <Alert>
          <AlertDescription>
            You haven't created any decks yet. Create your first deck to get started!
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <Card
              key={deck._id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedDeck(deck);
                setOpen(true);
              }}
            >
              <CardHeader>
                <CardTitle>{deck.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  {deck.cards?.length || 0} cards
                </p>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(deck.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {selectedDeck && (
        <DeckDialog
          open={open}
          onClose={() => setOpen(false)}
          deck={selectedDeck}
        />
      )}

    </div>
  );
};

export default DecksList;