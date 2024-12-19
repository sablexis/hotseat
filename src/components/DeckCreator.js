import React, {useState} from "react";
import { cardList } from "./cardData";
import { Button, TextField, Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper } from "@mui/material";

const DeckCreator = () => {
    const [deckType, setDeckType] = useState('');
    const [deckTitle, setDeckTitle] = useState('');
    const [newCard, setNewCard] = useState('');
    const [cards, setCards] = useState([]);
    const [error, setError] = useState('');

    const handleDeckTypeChange = (event) => {
        const type = event.target.value;
        setDeckType(type);
        // if base deck selected, initalize with cardList
        if (type === 'base') {
            setCards(cardList.map(card => card.text));
        } else {
            setCards([]); 
        }
    };

    const handleAddCard = (e) => {
        e.preventDefault();
        if (newCard.trim()) {
            setCards([...cards, newCard]);
            setNewCard('');
        }
    };

    const handleSaveDeck = async () => {
        if (!deckTitle.trim()) {
            setError('Please provide a deck title');
            return;
        }

        if (cards.length === 0) {
            setError('Deck must contain at least one card');
            return;
        }

        try {
            const response = await fetch('/api/decks/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: deckTitle.trim(),
                    cards: cards
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save deck');
            }

            setDeckTitle('');
            setNewCard('');
            setCards([]);
            setDeckType('');

        } catch (err) {
            setError('Failed to save deck: ' + err.message);
        }
    };

    return (
        <Box className="p-6">
            <Paper className="p-6">
                <Typography variant="h5" className="mb-4"> Create New Deck</Typography>

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
                            label="Start from scratch"
                        />
                    </RadioGroup>
                </FormControl>
                {deckType && (
                    <>
                        <TextField
                          fullWidth
                          label="Deck Title"
                          value={deckTitle}
                          onChange={(e) => setDeckTitle(e.target.value)}
                          className="mb-4"
                        />

                        <Box className="flex gap-2 mb-4">
                        <TextField
                          fullWidth
                          label="Add New Card"
                          value={newCard}
                          onChange={(e) => setNewCard(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          onClick={handleAddCard}
                          className="whitespace-nowrap"
                        >
                            Add Card
                            </Button>
                        </Box>

                        <Box className="mb-4">
                            <Typography variant="h6" className="mb-2">
                                Cards ({cards.length}):
                            </Typography>
                            <Box className="max-h-60 overflow-y-auto">
                                {cards.map((card, index) => (
                            <Typography key={index} className="p-2 mb-2 bg-gray-100 rounded">
                                {card}
                            </Typography>
                                ))}
                        </Box>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveDeck}
                      fullWidth
                    >
                        Save Deck
                    </Button>
                    
                    {error && (
                        <Typography color="error" className="mt-2">
                            {error}
                        </Typography>
                    )}
                        
                    </>
                )}
            </Paper>
        </Box>
    );

};

export default DeckCreator;