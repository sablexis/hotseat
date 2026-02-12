/**
 * Functionality for users to create their own decks
 */
"use client"

import React, { useState } from 'react';
import { cardList } from '@/components/cardData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { X } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

const DeckCreator = () => {
  const [deckType, setDeckType] = useState('');
  const [deckTitle, setDeckTitle] = useState('');
  const [newCard, setNewCard] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for deck type selection
  /*
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
  */

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
    <div className="p-6">
      <Card className="p-6">
        <h5 className="mb-4">Create New Deck</h5>
        
        {/* Success Message */}
        {successMessage && (
          <Alert>
            <AlertDescription className="flex justify-between items-center">
              {successMessage}
              <Button variant="outline" size="icon" onClick={() => setSuccessMessage('')}>
                  <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert 
            variant="destructive">
              <AlertDescription className="flex justify-between items-center">
                {error}
                <Button variant="ghost" size="icon" onClick={() => setError('')}>
                  <X className="h-4 w-4" />
                </Button>
              </AlertDescription> 
          </Alert>
        )}

        {/* Deck Type Selection */}
        <div>
          <Label>Choose Deck Type</Label>
          <RadioGroup value={deckType} onValueChange={(type) => {
            setDeckType(type);
            if (type === 'base') {
              setCards(cardList.map(card => card.text));              
            } else {
              setCards([]);
            }
          }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="base" id="base" />
              <Label htmlFor="base">Start with Base Deck</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scratch" id="scratch" />
              <Label htmlFor="scratch">Start from scratch</Label>
           </div>
          </RadioGroup>
        </div>

        {/* Show deck creation form only after type selection */}
        {deckType && (
          <>
            {/* Deck Title Input */}
            <div className="w-full">
                <Label htmlFor="deck-title">Deck Title</Label>
                  <Input
                    id="deck-title"
                    value={deckTitle}
                    onChange={(e) => setDeckTitle(e.target.value)}
                  />
            </div>

            {/* New Card Input */}
            <div className="flex gap-2 mb-4">
              <Label htmlFor="new-card">Add New Card</Label>
              <Input
                id="new-card"
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
                onClick={handleAddCard}
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                Add Card
              </Button>
            </div>

            {/* Cards Display */}
            <div className="mb-4">
              <h6 className="mb-2 text-lg font-semibold">
                Cards ({cards.length}):
              </h6>
              <div className="max-h-60 overflow-y-auto">
                {cards.map((card, index) => (
                  <div 
                    key={index} 
                    className="p-2 mb-2 bg-gray-100 rounded flex justify-between items-center"
                  >
                    <p className="pr-2">{card}</p>
                    <Button variant="outline" size="icon" onClick={() => handleRemoveCard(index)} disabled={isSubmitting}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <Button 
              onClick={handleSaveDeck}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <Spinner />
              ) : (
                'Save Deck'
              )}
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default DeckCreator;