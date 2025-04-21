/**
 * Functionality for users to create their own decks
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { cardList } from '@/components/cardData';
import { 
  Button, TextField, Box, Typography, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Paper,
  CircularProgress, Alert, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DeckCreator = () => {
  const [deckType, setDeckType] = useState('');
  const [deckTitle, setDeckTitle] = useState('');
  const [newCard, setNewCard] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for deck type selection
  const handleDeckTypeChange = (event) => {
    const type = event.target.value;
    setDeckType(type);
    // If base deck selected, initialize with cardList
    if (type === 'base') {
      setCards(cardList.map(card => card.text));
    } else {
      setCards([]); // Empty array for scratch deck
    }
  };

  // Handler for adding new card
  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.trim()) {
      setCards(prevCards => [...prevCards, newCard.trim()]);
      setNewCard(''); // Reset input field
    }
  };

  // Handler for removing a card
  const handleRemoveCard = (indexToRemove) => {
    setCards(prevCards => prevCards.filter((_, index) => index !== indexToRemove));
  };

  // Handler for saving deck
  const handleSaveDeck = async () => {
    // Reset messages
    setError('');
    setSuccessMessage('');

    // Validation
    if (!deckTitle.trim()) {
      setError('Please provide a deck title');
      return;
    }

    if (cards.length === 0) {
      setError('Deck must contain at least one card');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/decks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: deckTitle.trim(),
          cards: cards
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create deck');
      }

      // Success handling
      setSuccessMessage('Deck created successfully!');
      
      // Reset form
      setDeckTitle('');
      setNewCard('');
      setCards([]);
      setDeckType('');

      // Optional: Redirect to decks list after short delay
      setTimeout(() => {
        window.location.href = '/Member';
      }, 2000);

    } catch (err) {
      setError(err.message || 'Failed to create deck');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="p-6">
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Create New Deck</Typography>
        
        {/* Success Message */}
        {successMessage && (
          <Alert 
            severity="success" 
            className="mb-4"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setSuccessMessage('')}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {successMessage}
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert 
            severity="error" 
            className="mb-4"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setError('')}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}

        {/* Deck Type Selection */}
        <FormControl component="fieldset" className="mb-4">
          <FormLabel>Choose Deck Type</FormLabel>
          <RadioGroup value={deckType} onChange={handleDeckTypeChange}>
            <FormControlLabel 
              value="base" 
              control={<Radio />} 
              label="Start with Base Deck" 
            />
            <FormControlLabel 
              value="scratch" 
              control={<Radio />} 
              label="Start from Scratch" 
            />
          </RadioGroup>
        </FormControl>

        {/* Show deck creation form only after type selection */}
        {deckType && (
          <>
            {/* Deck Title Input */}
            <TextField
              fullWidth
              label="Deck Title"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
              className="mb-4"
              disabled={isSubmitting}
            />

            {/* New Card Input */}
            <Box className="flex gap-2 mb-4">
              <TextField
                fullWidth
                label="Add New Card"
                value={newCard}
                onChange={(e) => setNewCard(e.target.value)}
                disabled={isSubmitting}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCard(e);
                  }
                }}
              />
              <Button 
                variant="contained" 
                onClick={handleAddCard}
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                Add Card
              </Button>
            </Box>

            {/* Cards Display */}
            <Box className="mb-4">
              <Typography variant="h6" className="mb-2">
                Cards ({cards.length}):
              </Typography>
              <Box className="max-h-60 overflow-y-auto">
                {cards.map((card, index) => (
                  <Box 
                    key={index} 
                    className="p-2 mb-2 bg-gray-100 rounded flex justify-between items-center"
                  >
                    <Typography className="pr-2">{card}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveCard(index)}
                      disabled={isSubmitting}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Save Button */}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSaveDeck}
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Save Deck'
              )}
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default DeckCreator;