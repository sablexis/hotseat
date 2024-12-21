"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';

const DecksList = () => {
  const { data: session } = useSession();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Box className="flex justify-center items-center p-8">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="m-4">
        {error}
      </Alert>
    );
  }

  if (!session) {
    return (
      <Alert severity="info" className="m-4">
        Please log in to view your decks
      </Alert>
    );
  }

  return (
    <div className="p-4">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" component="h2">
          My Decks
        </Typography>
        <Link href="/newDeckCreator" passHref>
          <Button variant="contained" color="primary">
            Create New Deck
          </Button>
        </Link>
      </Box>

      {decks.length === 0 ? (
        <Alert severity="info">
          You haven't created any decks yet. Create your first deck to get started!
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <Card key={deck._id} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <Typography variant="h6" component="h3" className="mb-2">
                  {deck.name}
                </Typography>
                <Typography color="textSecondary" className="mb-4">
                  {deck.cards?.length || 0} cards
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created: {new Date(deck.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecksList;